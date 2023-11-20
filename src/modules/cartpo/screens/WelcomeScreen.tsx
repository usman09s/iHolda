import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { CustomSettingsInput } from 'modules/settings/components/CustomSettingsInput';
import * as Yup from 'yup';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { verticalScale } from 'utils/helpers';

const initialValues = {
  phoneNumber: '',
};

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, 'Phone number must be at least 10 characters long')
    .required('Phone number is required'),
});

export const WelcomeScreen = ({ navigation }: any) => {
  const handleSubmit = values => {
    // Handle form submission here
    console.log('Form values:', values);
    navigation.navigate('ConfirmOtp');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View className="px-6 py-12">
            <Text
              style={{
                fontSize: 30,
                width: '70%',
                color: '#7f7e7e',
                fontWeight: '700',
                marginBottom: 20,
              }}>
              Welcome To Cartpo
            </Text>
            <View style={{ marginVertical: verticalScale(160) }}>
              <CustomSettingsInput
                label="phone number"
                placeholder="e.g +44 7514795083"
                field="phoneNumber"
                handleChange={handleChange('phoneNumber')}
                customLabelClass={'text-gray-500 font-normal'}
                customTextInputClass={'h-14'}
                keyboardType={'numeric'}
                value={values.phoneNumber}
                error={errors.phoneNumber}
              />
            </View>
            <CustomReferenceButton
              customContainerClass={'rounded-xl w-72 self-center h-14'}
              extraStyles={{ borderWidth: 0, backgroundColor: 'rgb(51,70,252)', marginTop: 20 }}
              title={'Next'}
              customTextClass={'text-white'}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
