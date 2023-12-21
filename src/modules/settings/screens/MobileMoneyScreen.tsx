// import Header from 'components/Header/Header';
import { View, Text, ScrollView } from 'react-native';
import { CustomSettingsInput } from '../components/CustomSettingsInput';
import { Formik } from 'formik';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userDataSlice';
import { useSettingActions } from '../hooks/useSettingsActions';
import CustomHeader from 'components/Header/CustomHeader';
import { userSelector } from 'store/auth/userSelectors';

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .required('This field is required')
    .min(6, 'Number must be at least 6 characters')
    .max(9, 'Number must be at most 9 characters'),
  confirmNumber: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('number')], "Confirm number doesn't match"),
});

const CustomPaymentAccount = ({ index, number, default: paymentDefault }) => {
  const numStars = Math.max(0, number.length - 4);
  const stars = '*'.repeat(numStars);
  const formattedNumber = `${number.substring(0, 2)}${stars}${number.slice(-2)}`;
  return (
    <View
      className="flex-row justify-between items-center py-3"
      style={{ borderBottomWidth: 0.5, borderColor: 'gray' }}>
      <Text className="text-base text-black font-semibold">{`${index}. ${formattedNumber}`}</Text>
      <View className="flex-row items-center">
        <Text className="text-xs font-semibold text-gray-500">Default</Text>
        <Text className="text-base font-semibold">
          {' '}
          {paymentDefault ? paymentDefault.toUpperCase() : 'MTN'}
        </Text>
      </View>
    </View>
  );
};

export const MobileMoneyScreen = ({ navigation }: any) => {
  const { handleAddPaymentAccount } = useSettingActions();
  const userData: any = useSelector(userSelector)?.user;
  console.log(userData.linkedPaymentAccounts);
  const initialValues = {
    number: '',
    confirmNumber: '',
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="px-6">
        <CustomHeader
          showBackIcon
          centerComponent={<Text className="text-gray-500 font-semibold">Mobile money</Text>}
        />
        <View className="mx-4 my-12">
          <Text className="text-base text-black font-semibold">Current linked accounts</Text>
          {userData.linkedPaymentAccounts.map((account, index) => (
            <CustomPaymentAccount key={index} index={index + 1} {...account} />
          ))}
          <Formik
            initialValues={initialValues}
            onSubmit={handleAddPaymentAccount}
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({ handleChange, handleSubmit, values, errors }) => (
              <View className="justify-between my-12 mx-6">
                <View>
                  <CustomSettingsInput
                    label="Enter Number"
                    placeholder="Enter Text Here"
                    field="number"
                    handleChange={handleChange('number')}
                    value={values.number}
                    keyboardType={'numeric'}
                    error={errors.number}
                  />
                  <CustomSettingsInput
                    label="Confirm Number"
                    placeholder="Enter Text Here"
                    field="confirmNumber"
                    handleChange={handleChange('confirmNumber')}
                    value={values.confirmNumber}
                    keyboardType={'numeric'}
                    error={errors.confirmNumber}
                  />
                </View>
                <View style={{ alignSelf: 'center', marginTop: '70%' }}>
                  <CustomReferenceButton
                    title="Save"
                    customContainerClass={'w-44'}
                    extraStyles={{ borderWidth: 5 }}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};
