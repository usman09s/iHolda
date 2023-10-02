import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Icons from 'components/Icons';
import colors from 'theme/colors';
import { text } from 'theme/text';

import Rate from '../components/Rate';
import { JobDashboardStackParamList } from '../JobDashboardStackNavigator';

const JobApprovedSuccessScreen = () => {
  const { dispatch, goBack } = useNavigation<NavigationProp<JobDashboardStackParamList>>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'position',
        android: undefined,
      })}
      className="flex-1 justify-evenly items-center">
      <View className="flex-1 bg-white justify-evenly items-center">
        <View>
          <Text>Job completed successfully</Text>
          <View className="bg-green-400 w-14 h-14 rounded-full items-center justify-center self-center mt-10">
            <Icons.TickIcon />
          </View>
        </View>
        <View className="mx-7">
          <Text className={text({ type: 'b26', class: 'text-center mb-4' })}>Pay</Text>
          <Text className={text({ type: 'r12', class: 'mb-4 mt-4 px-4 text-center' })}>
            Upon your approval, @worker will now be paid the total sum due. Thank you for trusting
            iHolda with your work.
          </Text>
        </View>
        <View className="w-full px-7">
          <Text className={text({ type: 'r15', class: 'text-start mb-6 mt-4' })}>Rate worker</Text>
          <Rate value={0} />
          <TextInput
            multiline
            returnKeyType="send"
            textAlignVertical="top"
            placeholder="Write review here"
            placeholderTextColor={colors['black-o-60']}
            className="border-[0.5px] min-h-[100px] mt-4 p-5 rounded-xl"
          />
          <Text className={text({ type: 'r12', class: 'mt-2.5 px-7 text-center' })}>
            Write a review to help others know your honest opinion about @worker’s job.
          </Text>
        </View>
        <View>
          <Button
            title="Review & Close"
            customContainer="px-12 py-3 bg-darkBlue"
            onPress={() => {
              dispatch(StackActions.popToTop());
              goBack();
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default JobApprovedSuccessScreen;
