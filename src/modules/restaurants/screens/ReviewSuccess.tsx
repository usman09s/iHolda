import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { text } from 'theme/text';
import Octicons from '@expo/vector-icons/Octicons';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { height } from 'utils/helpers';

export const ReviewSuccess = ({ navigation, route }: any) => {
  const isSmallScreen = height < 700;
  const { type } = route.params;
  return (
    <View className="px-6 flex-1">
      <View className={`flex-1 items-center justify-between ${isSmallScreen ? 'my-20' : 'my-28'}`}>
        <Text className="text-black text-[15px]">Review posted successfully</Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 55,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
          }}>
          <Octicons name="check-circle-fill" color="#30c04f" size={100} />
        </View>
        <View className="justify-center items-center">
          <Text className="text-black text-[20px] font-bold">Reward</Text>
          <Text className="text-center mx-4 text-black mt-5">
            You have been rewarded with <Text className='font-bold'>2CP</Text> for sharing you honest opinion about this business to
            you community.
          </Text>
        </View>
        <CustomReferenceButton
          title={'Close'}
          customContainerClass={'bg-[#0584fa] border-0 px-10 ml-4 py-2'}
          customTextClass={'text-white text-sm py-0 my-0 font-normal'}
          onPress={() => navigation.navigate('BottomTabs')}
        />
      </View>
    </View>
  );
};
