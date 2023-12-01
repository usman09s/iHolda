import Header from 'components/Header/Header';
import { View, Text, ScrollView } from 'react-native';
import { CustomSettingsInput } from '../components/CustomSettingsInput';
import { Formik } from 'formik';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .required('This field is required')
    .min(6, 'Number must be at least 6 characters')
    .max(8, 'Number must be at most 8 characters'),
  confirmNumber: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('number')], "Confirm number doesn't match"),
});

export const MobileMoneyScreen = ({ navigation }: any) => {
  const initialValues = {
    number: '',
    confirmNumber: '',
  };

  const handleSubmit = values => {
    console.log(values);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="px-6">
        <Header
          showBackIcon
          centerComponent={<Text className="text-gray-500 font-semibold mt-2">Mobile money</Text>}
        />
        <View className="mx-4 my-12">
          <Text className="text-base text-black font-semibold">Current linked accounts</Text>
          <View
            className="flex-row justify-between items-center py-3"
            style={{ borderBottomWidth: 0.5, borderColor: 'gray' }}>
            <Text className="text-base text-black font-semibold">1. 67*****84</Text>
            <View className="flex-row items-center">
              <Text className="text-xs font-semibold text-gray-500">Default</Text>
              <Text className="text-base font-semibold"> MTN</Text>
            </View>
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
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
