import {
  ActivityIndicator,
  BackHandler,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { wW } from 'utils/helpers';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Video } from 'react-native-compressor';

import { useTimer } from '../hooks/useTimer';
import { MomentsStackParamList } from '../MomentsStackNavigator';
import Api from 'services/Api';
import { numberToAlphabet } from '../helpers/sharedHelpers';
import AppModal from 'components/AppModal';
import ErrorModal from 'components/ErrorModal';
import { MatchedUserType } from 'types/MomentsTypes';
import { Option, SelectedQA } from 'types/QuizTypes';
import { Camera, CameraType } from 'expo-camera';
import { useSelfieActions } from '../hooks/useSelfieActions';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from 'store/moments/momentsSlice';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { text as themeText } from 'theme/text';
import { allMomentsSelector } from 'store/moments/momentsSelectors';
import mime from 'mime';
import { userSelector } from 'store/auth/userSelectors';

const MomentsQuizScreen = ({ route }: { route?: { params: MatchedUserType } }) => {
  const [currentQuestionIndex, setCQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<number | null>(null);
  const [quizPermissionPopup, setQuizPermissionPopup] = useState(true);
  const [cancleQuizModal, setCancleQuizModal] = useState(false);
  const [selectedQA, setSelectionQA] = useState<SelectedQA[]>([]);
  const [quizCompleted, setQuiizCompleted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useQuery('sampleQuizs', Api.getQuizs);
  const moments = useSelector(allMomentsSelector);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { goBack, reset }: any = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const ratio = Platform.select({
    ios: '4:3',
    android: '1:1',
  });
  const { cameraRef, setMediaType, onPressRecordButton, isRecording } = useSelfieActions(
    ratio,
    999999,
  );

  const quizQuestions = data?.data.quiz.questions ?? [];
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const quizDuration = data?.data.quiz.timeLimitInSeconds;

  const { counter, isFinished, restartTimer, stopTimer } = useTimer({
    initialSeconds: quizDuration,
  });

  const matchedUser = route?.params;

  const isOptionSelected = (qId: string, aId: string) =>
    selectedQA.find(el => el.question === qId && el.selectedOption === aId);

  const optionW = (wW - 56) / 2;

  const onPressAnswer = (option: Option) => {
    const questionAnswer = {
      question: currentQuestion._id,
      selectedOption: option._id,
      isCorrect: option.isCorrect,
    };
    const selectectedQuestionI = selectedQA.findIndex(el => el.question === currentQuestion._id);
    if (selectectedQuestionI >= 0) {
      selectedQA[selectectedQuestionI] = questionAnswer;
      setSelectionQA([...selectedQA]);
      return;
    }
    setSelectionQA(prevQuestionA => [...prevQuestionA, questionAnswer]);
  };

  const startStopRecording = () => {
    onPressRecordButton();
    // navigate('MomentsMood', matchedUser && { matchedUser, selectedQA });
  };

  async function postData(url = '', data: FormData) {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    setIsLoading(false);
    // console.log('~ postData ~ response.text():', await response.text());
    return response;
  }

  const postQuiz = async () => {
    if (isLoading) return;

    let formdata = new FormData();
    const quizMedia = moments[moments.length - 1];

    let videoObject: any;
    const element = quizMedia.localUri;
    const quizId = data?.data.quiz._id;
    setIsLoading(true);

    if (quizMedia) {
      const result = await Video.compress(element, { compressionMethod: 'auto' }, progress => {
        console.log('Compression Progress: ', progress);
      });
      console.log('🚀 ~ postQuiz ~ result:', result);

      const newVideoUri = 'file:///' + result.split('file:/').join('');

      videoObject = {
        name: result.split('/').pop(),
        height: 800,
        width: 600,
        type: mime.getType(newVideoUri),
        uri: result,
      };
      formdata.append('recording', videoObject);
    }

    formdata.append('finishedIn', '10');
    if (quizId) formdata.append('quiz', quizId);
    if (user.user?._id) formdata.append('users[0]', user.user?._id);
    if (matchedUser?.user._id) formdata.append('users[1]', matchedUser?.user._id);

    selectedQA.forEach((e, i) => {
      formdata.append(`selectedQuestions[${i}][question]`, e.question);
      formdata.append(`selectedQuestions[${i}][selectedOption]`, e.selectedOption);
    });

    const resData = await postData(Api.baseUrl + 'quiz/attempt', formdata);
    const response = await resData.json();

    if (resData.status !== 200) {
      alert('Something went wrong');
      goBack();
      return;
    }

    const postFormData = new FormData();

    if (user.user?._id) postFormData.append('users[0][user]', user.user?._id);
    if (matchedUser?.user._id) postFormData.append('users[1][user]', matchedUser?.user._id);

    postFormData.append('post[userQuiz]', response.data.attemptedQuiz._id);

    postFormData.append('metBefore', `${matchedUser?.metBefore}`);

    const postResData = await postData(Api.baseUrl + 'met', postFormData);

    console.log(
      '🚀 ~ file: MomentsQuizScreen.tsx:179 ~ postQuiz ~ postResData:',
      await postResData.json(),
    );
    if (postResData.status !== 200) {
      alert('Something went wrong');
      goBack();
      return;
    }

    reset({
      index: 0,
      routes: [{ name: 'BottomTabs' }],
    });
    dispatch(resetState());

    return;
  };

  const onPressNext = () => {
    const isOptionNotSelected = selectedQA.length <= currentQuestionIndex;
    if (isOptionNotSelected) return;

    const ansPoint = selectedQA[selectedQA.length - 1].isCorrect ? 1 : 0;

    setCorrectAnswers(prevCorrecctAns =>
      prevCorrecctAns === null ? 0 + ansPoint : prevCorrecctAns + ansPoint,
    );
    const isLastQuestion = currentQuestionIndex + 1 > quizQuestions.length - 1;
    if (isLastQuestion) {
      setQuiizCompleted(true);
      stopTimer();
      return;
    }
    setCQuestionIndex(prevIndex => prevIndex + 1);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    setMediaType('VIDEO');

    return () => {
      // setCancleQuizModal(true);
      backHandler.remove();
      dispatch(resetState());
    };
  }, []);

  const cancleQuiz = () => (
    <Modal visible={cancleQuizModal} transparent>
      <View className="flex-1 justify-center items-center bg-black-o-50">
        <Animated.View
          style={{ maxWidth: 250 }}
          className="bg-white rounded-sm py-2 px-3 pt-5"
          entering={SlideInDown}>
          <View>
            <Text className={themeText({ type: 'm20' })} style={{ color: '#000' }}>
              Do you want to cancel quiz?
            </Text>
            <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  // stop video
                  if (isRecording) startStopRecording();
                  setTimeout(() => {
                    goBack();
                  }, 100);
                }}
                style={{ width: '50%' }}>
                <Text
                  className={themeText({ type: 'm20', class: 'mt-8' })}
                  style={{ color: '#000' }}>
                  Yes .
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCancleQuizModal(false)} style={{ width: '50%' }}>
                <Text
                  className={themeText({ type: 'm20', class: 'mt-8 text-center' })}
                  style={{ color: '#000' }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  const quizQuestionSection = () => (
    <>
      <View>
        <Text className={text({ type: 'b30', class: 'text-center' })}>
          Question {currentQuestionIndex + 1}/{quizQuestions?.length}
        </Text>
        <Text className={text({ type: 'm15', class: 'mt-4 mb-8' })}>
          {currentQuestion?.questionText}
        </Text>
        <View className="flex-wrap flex-row justify-between ">
          {currentQuestion?.options.map((option, index) => (
            <TouchableWithoutFeedback onPress={() => onPressAnswer(option)} key={option._id}>
              <View>
                <Text className={text({ class: 'text-center mb-1', type: 'r18' })}>
                  {numberToAlphabet(index + 1)?.toUpperCase()}
                </Text>
                <View
                  className={`${
                    isOptionSelected(currentQuestion._id, option._id)
                      ? 'bg-fuchsia-700'
                      : 'bg-gray-600'
                  } py-3 rounded-full items-center`}
                  style={{ width: optionW }}>
                  <Text className={text({ type: 'r18', class: 'text-white' })}>
                    {option.optionText}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
      <Pressable className="items-center w-full mt-4 justify-center" onPress={onPressNext}>
        <Text className={text({ type: 'm16' })}>Next</Text>
      </Pressable>
    </>
  );

  const quizPostSection = () => (
    <>
      <View>
        <Text className={text({ type: 'b30', class: 'text-center mt-12' })}>Done!!</Text>
        <Text
          className={text({ type: 'm15', class: 'mt-4 mb-8 text-center' })}
          style={{ color: 'grey' }}>
          Click on post to see results
        </Text>
      </View>
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowScore(true);
            setQuiizCompleted(false);
          }}>
          <View
            className={`bg-black py-3 rounded-full items-center self-center mb-4`}
            style={{ width: optionW }}>
            <Text className={text({ type: 'r18', class: 'text-white' })}>Post</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text className={text({ type: 'r14', class: 'text-center' })} style={{ color: 'grey' }}>
          Note: This will post your quiz and you won't be able to delete your answers within 2H
        </Text>
      </View>
    </>
  );

  const quizResultSection = () => (
    <>
      <View>
        <Text
          className={text({ type: 'r20', class: 'text-center mt-2' })}
          style={{ color: 'grey' }}>
          Your score
        </Text>
      </View>

      <Text style={{ color: '#ff9133', fontSize: 65, fontWeight: 'bold', textAlign: 'center' }}>
        {correctAnswers}/{quizQuestions?.length}
      </Text>

      <View>
        <TouchableWithoutFeedback onPress={startStopRecording}>
          <View
            className={`bg-black py-3 rounded-full items-center self-center mb-4`}
            style={{ width: optionW }}>
            {!isLoading ? (
              <Text className={text({ type: 'r18', class: 'text-white' })}>Done</Text>
            ) : (
              <ActivityIndicator color={'#FFF'} />
            )}
          </View>
        </TouchableWithoutFeedback>
        <Text className={text({ type: 'r14', class: 'text-center' })} style={{ color: 'grey' }}>
          you answered {correctAnswers} question{correctAnswers && correctAnswers > 1 ? 's' : ''}{' '}
          rightly
        </Text>
      </View>
    </>
  );

  useEffect(() => {
    if (moments.length > 0 && showScore) postQuiz();
  }, [moments]);

  return (
    <View className="flex-1">
      <View className="flex-1">
        <Camera
          ratio={ratio}
          ref={cameraRef}
          autoFocus={false}
          type={CameraType.front}
          className="w-full h-full absolute"
        />

        <View className="px-6">
          <Header
            onPressBackIcon={() => setCancleQuizModal(true)}
            showBackIcon
            backIconColor="white"
            rightComponent={
              <View className="bg-white px-2.5">
                <Text className={text({ type: 'b30', class: 'text-[#636363]' })}>
                  {quizPermissionPopup ? '00:00' : counter}
                </Text>
              </View>
            }
          />
        </View>
      </View>
      <View className="flex-1 pt-4 px-6 justify-between" style={{ marginBottom: bottom || 16 }}>
        {quizCompleted
          ? quizPostSection()
          : showScore
            ? quizResultSection()
            : quizQuestionSection()}
      </View>

      {cancleQuiz()}

      <AppModal
        visible={quizPermissionPopup}
        setVisible={setQuizPermissionPopup}
        onPressBtn1={goBack}
        onPressBtn2={() => {
          restartTimer();
          setQuizPermissionPopup(false);
          startStopRecording();
        }}
        text={
          'Quiz is a fun way to meet people and try out basic quizzes together. Because we want the quizzes and rewards to be fair, users can’t delete quizzes within 24hours of posting!'
        }
      />
      {isFinished && (
        <ErrorModal
          onBackBtnPress={goBack}
          onBtnPress={goBack}
          btnTxt="Back"
          showCutButton={false}
          errorText={'Times Up'}
        />
      )}
    </View>
  );
};

export default MomentsQuizScreen;
