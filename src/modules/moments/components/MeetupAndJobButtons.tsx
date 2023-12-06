import { Pressable, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { text } from 'theme/text';
import { getHitSlop, units } from 'utils/helpers';

import { MomentsStackParamList } from '../MomentsStackNavigator';

type Props = {
  isAbsolute?: boolean;
  flow: 'meetup' | 'job' | 'post';
};

const MeetupAndJobButtons = ({ flow, isAbsolute = true }: Props) => {
  const { navigate, goBack } = useNavigation<NavigationProp<MomentsStackParamList>>();

  return (
    <View
      className={isAbsolute ? 'absolute' : ''}
      style={{ bottom: units.vh * 3, right: units.vw * 3 * (isAbsolute ? 1 : 0) }}>
      <View className="flex-row bg-gray-300 shadow-md mx-2 self-end mt-10 py-4 px-10 rounded-full items-between">
        <Pressable
          hitSlop={getHitSlop({ value: 20, right: 10, left: 40 })}
          onPress={() => {
            if (flow === 'job') {
              goBack();

              return;
            }

            if (flow === 'post') {
              goBack();
            }
          }}>
          <Text
            className={text({
              type: 'r15',
              class: flow === 'meetup' ? 'mr-8' : 'text-black-o-40 mr-8',
            })}>
            Meetup
          </Text>
        </Pressable>
        <Pressable
          hitSlop={getHitSlop({ value: 20, left: 10, right: 40 })}
          onPress={() => navigate('PostCamera')}>
          <Text
            className={text({
              type: 'r15',
              // class: flow === 'post' ? 'text-black mr-8' : 'text-black-o-40 mr-8',
              class: flow === 'post' ? 'text-black' : 'text-black-o-40',
            })}>
            Post
          </Text>
        </Pressable>
        {/* <Pressable
          hitSlop={getHitSlop({ value: 20, left: 10, right: 40 })}
          onPress={() => {
            if (flow === 'meetup') {
              navigate('JobPostingStack');
            }

            if (flow === 'post') {
              goBack();
              navigate('JobPostingStack');
            }
          }}>
          <Text
            className={text({
              type: 'r15',
              class: flow === 'job' ? 'text-black' : 'text-black-o-40',
            })}>
            Job
          </Text>
        </Pressable> */}
      </View>
    </View>
  );
};

export default MeetupAndJobButtons;
