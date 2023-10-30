import { ImageBackground, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { wW } from 'utils/helpers';
import { useQuery } from 'react-query';
import { useState } from 'react';

import { useTimer } from '../hooks/useTimer';
import { MomentsStackParamList } from '../MomentsStackNavigator';
import Api from 'services/Api';
import { numberToAlphabet } from '../helpers/sharedHelpers';
import AppModal from 'components/AppModal';
import ErrorModal from 'components/ErrorModal';
import { MatchedUserType } from 'types/MomentsTypes';
import { Option, SelectedQA } from 'types/QuizTypes';

const MomentsQuizScreen = ({ route }: { route?: { params: MatchedUserType } }) => {
  const [currentQuestionIndex, setCQuestionIndex] = useState(0);
  const [quizPermissionPopup, setQuizPermissionPopup] = useState(true);
  const [selectedQA, setSelectionQA] = useState<SelectedQA[]>([]);

  const { data } = useQuery('sampleQuizs', Api.getQuizs);
  const quizQuestions = data?.data.quiz.questions ?? [];
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const quizDuration = data?.data.quiz.timeLimitInSeconds;

  const matchedUser = route?.params;

  const { navigate, goBack } = useNavigation<NavigationProp<MomentsStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const { counter, isFinished } = useTimer({
    initialSeconds: quizDuration,
  });

  const isOptionSelected = (qId: string, aId: string) =>
    selectedQA.find(el => el.question === qId && el.selectedOption === aId);

  const optionW = (wW - 56) / 2;

  const onPressAnswer = (option: Option) => {
    const questionAnswer = {
      question: currentQuestion._id,
      selectedOption: option._id,
    };
    const selectectedQuestionI = selectedQA.findIndex(el => el.question === currentQuestion._id);
    if (selectectedQuestionI >= 0) {
      selectedQA[selectectedQuestionI] = questionAnswer;
      setSelectionQA([...selectedQA]);
      return;
    }
    setSelectionQA(prevQuestionA => [...prevQuestionA, questionAnswer]);
  };

  const handleQuizComplete = () =>
    navigate('MomentsMood', matchedUser && { matchedUser, selectedQA });

  const onPressNext = () => {
    const isOptionSelected = selectedQA.length <= currentQuestionIndex;
    if (isOptionSelected) return;

    const isLastQuestion = currentQuestionIndex + 1 > quizQuestions.length - 1;
    if (isLastQuestion) return handleQuizComplete();
    setCQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <ImageBackground
          source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
          className="h-full w-full">
          <View className="px-6">
            <Header
              showBackIcon
              backIconColor="white"
              rightComponent={
                <View className="bg-white px-2.5">
                  <Text className={text({ type: 'b30', class: 'text-[#636363]' })}>{counter}</Text>
                </View>
              }
            />
          </View>
        </ImageBackground>
      </View>
      <View className="flex-1 pt-4 px-6 justify-between" style={{ marginBottom: bottom || 16 }}>
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
      </View>

      <AppModal
        visible={quizPermissionPopup}
        setVisible={setQuizPermissionPopup}
        onPressBtn1={goBack}
        onPressBtn2={() => setQuizPermissionPopup(false)}
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
