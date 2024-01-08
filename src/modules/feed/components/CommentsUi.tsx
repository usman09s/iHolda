import { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ViewStyle,
  StyleProp,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Button from 'components/Button';
import Icons from 'components/Icons';
import { text as themeText } from 'theme/text';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Antdesign from '@expo/vector-icons/AntDesign';
import IonIcons from '@expo/vector-icons/Ionicons';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/userSelectors';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  btn1Txt?: string;
  btn2Txt?: string;
  text: string;
  onPressBtn1?: () => void;
  onPressBtn2?: () => void;
  useTabHeight?: boolean;
  likes: number;
};

type Comment = {
  _id: string;
  post: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  likes: any[]; // Define the type for likes if known
  user: {
    _id: string;
    userName: string;
    photo: string | null; // Assuming photo could be a string or null
  };
  parent?: any;
  nestedComments: Comment[];
};

type Pagination = {
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

type CommentsData = {
  result: Comment[];
  pagination: Pagination;
};

type ResponseData = {
  message: string;
  data: {
    commentsData: CommentsData;
    message: string;
    statusCode: number;
  };
};

const commentsResponse: ResponseData = {
  message: 'Comments fetched successfully',
  data: {
    commentsData: {
      result: [
        {
          _id: '6554e8b7f3a6c0f2ebf71d2e',
          post: '6554d0c2118a874f0584ffc7',
          text: 'Wow amazing',
          createdAt: '2023-11-15T15:50:15.453Z',
          updatedAt: '2023-11-15T16:26:42.797Z',
          likes: [],
          user: {
            _id: '6553794b6e628d60409ade5b',
            userName: 'bobsy',
            photo: '5f2feb9a-d9c1-4ea1-e30f-270d5e19fb00',
          },
          nestedComments: [],
        },
        {
          _id: '6554d0e4118a874f0584ffcc',
          post: '6554d0c2118a874f0584ffc7',
          text: 'My trip to Paris',
          likes: [],
          createdAt: '2023-11-15T14:08:36.411Z',
          updatedAt: '2023-11-15T14:08:36.411Z',
          user: {
            _id: '6553794b6e628d60409ade5b',
            userName: 'bobsy',
            photo: '5f2feb9a-d9c1-4ea1-e30f-270d5e19fb00',
          },
          nestedComments: [
            {
              _id: '6554d12c118a874f0584ffd2',
              user: {
                _id: '6553794b6e628d60409ade5b',
                userName: 'bobsy',
                photo: '5f2feb9a-d9c1-4ea1-e30f-270d5e19fb00',
              },
              post: '6554d0c2118a874f0584ffc7',
              text: 'I visited Eiffil tower',
              createdAt: '2023-11-12T14:09:48.061Z',
              updatedAt: '2023-11-15T14:09:48.061Z',
              likes: [],
              parent: '6554d0e4118a874f0584ffcc',
              nestedComments: [
                {
                  likes: [],
                  _id: '6554d14b118a874f0584ffd8',
                  user: {
                    _id: '6553794b6e628d60409ade5b',
                    userName: 'bobsy',
                    photo: '5f2feb9a-d9c1-4ea1-e30f-270d5e19fb00',
                  },
                  post: '6554d0c2118a874f0584ffc7',
                  text: 'good experience',
                  createdAt: '2023-11-15T14:10:19.341Z',
                  updatedAt: '2023-11-15T14:10:19.341Z',
                  parent: '6554d12c118a874f0584ffd2',
                  nestedComments: [],
                },
              ],
            },
          ],
        },
      ],
      pagination: {
        totalItems: 2,
        perPage: 10,
        currentPage: 1,
        totalPages: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      },
    },
    message: 'Comments fetched successfully',
    statusCode: 200,
  },
};

const dottedLine = (extraStyles: StyleProp<ViewStyle> = {}) => (
  <View
    style={[
      {
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderStyle: 'dashed',
        flex: 1,
        marginTop: 5,
      },
      extraStyles,
    ]}
  />
);

const Commentsui = ({
  visible,
  setVisible,
  btn1Txt = 'back',
  btn2Txt = 'Accept',
  text,
  onPressBtn1,
  onPressBtn2,
  useTabHeight = true,
  likes,
}: Props) => {
  const onClose = () => setVisible(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const tabBarHeight = useTabHeight ? useBottomTabBarHeight() : 0;
  const [data, setData] = useState(commentsResponse.data.commentsData.result);
  const [inp, setInp] = useState('');

  const user = useSelector(userSelector);
  const inpRef = useRef<TextInput>(null);

  function getTimeDifference(dateString: string) {
    const currentDate = new Date();
    const providedDate = new Date(dateString);

    const timeDifferenceInSeconds = Math.floor(
      (currentDate.valueOf() - providedDate.valueOf()) / 1000,
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}s`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} days ago`;
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months} month ago`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return `${years} year ago`;
    }
  }

  const comment = (item: Comment, showHorizontalDottedLine = false) => {
    const isReply = item?.nestedComments?.length;
    return (
      <View key={item._id} className="flex-row mb-4 mr-4">
        <View style={{ marginRight: 10, alignItems: 'center' }}>
          {showHorizontalDottedLine
            ? dottedLine({
                position: 'absolute',
                top: 10,
                left: -25,
                width: '70%',
              })
            : null}
          <Image
            source={{
              uri: getImageLink(item.user.photo ?? ''),
            }}
            resizeMode="cover"
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />

          {isReply ? dottedLine() : null}
        </View>
        <View className="items-start">
          <View className="flex-row items-center">
            <Text className={themeText({ type: 'm16' })}>{item.user.userName}</Text>
            <Text className={themeText({ type: 'r12' })}> {getTimeDifference(item.createdAt)}</Text>
          </View>
          <Text className={themeText({ type: 'r16' })}>{item.text}</Text>
          <View className="flex-row mt-2 items-center" style={{ marginBottom: isReply ? 15 : 0 }}>
            <IonIcons
              name={!item.likes.includes(user.user?._id) ? 'heart-outline' : 'heart'}
              color={'#dd191d'}
              size={16}
            />
            <Text className={themeText({ type: 'r14', class: 'font-Bold' })}>
              {' '}
              {item.likes.length}
            </Text>
            <TouchableOpacity
              onPress={() => {
                inpRef?.current?.focus();
                setSelectedComment(item);
              }}>
              <Text className={themeText({ type: 'r14' })}>{'  '} Reply</Text>
            </TouchableOpacity>
          </View>

          {isReply ? item?.nestedComments?.map(item => comment(item, true)) : null}
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </TouchableWithoutFeedback>
      <View
        // onPress={onClose}
        className="flex-1 justify-end items-center"
        // onPres

        style={{ marginBottom: !useTabHeight ? 0 : tabBarHeight - 16 }}>
        <Animated.View className="p-4 bg-white mb-2 w-full rounded" entering={SlideInDown}>
          <View
            className="flex-row justify-between w-full mb-6"
            style={{
              borderBottomWidth: 2,
              borderColor: '#f9f9f9',
              paddingBottom: 10,
              paddingHorizontal: 5,
            }}>
            <View className="flex-row gap-1">
              <Image
                source={{
                  uri: 'https://wordynerdbird.files.wordpress.com/2019/06/facebook-circle-heart-love-png-4.png',
                }}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
              <Text>{likes}</Text>
            </View>
            <View className="flex-row gap-1">
              <Text>{data.length} comments</Text>
            </View>
          </View>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{ maxHeight: 350 }}>
            {data.map(item => {
              return comment(item);
            })}
          </ScrollView>
          <View className="mt-5 ">
            {selectedComment ? (
              <View className="bg-[#efefef] flex-row w-full py-2 px-3 items-center mb-2 rounded">
                <Image
                  source={{
                    uri: getImageLink(selectedComment?.user?.photo ?? ''),
                  }}
                  resizeMode="cover"
                  style={{ width: 25, height: 25, borderRadius: 50, marginRight: 10 }}
                />

                <Text className="text-[lightgrey] flex-1">
                  Replying to {selectedComment.user.userName}
                </Text>

                <TouchableOpacity onPress={() => setSelectedComment(null)}>
                  <IonIcons name="close" size={17} color="black" />
                </TouchableOpacity>
              </View>
            ) : null}
            <View className="flex-row">
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg',
                }}
                resizeMode="cover"
                style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
              />
              <View className="bg-[#f8f8f8] py-1 px-3 rounded-md flex-1 border-[#f0f0f0] border flex-row items-center justify-between">
                <TextInput
                  value={inp}
                  onChangeText={setInp}
                  ref={inpRef}
                  placeholder="Write a comment"
                  className="flex-1"
                />
                <IonIcons onPress={() => {
                  // if(!selectedComment) setData(prevState)
                }} name="send" color={'#1236f3'} size={19} />
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Commentsui;
