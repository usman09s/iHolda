import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { CustomSettingsInput } from 'modules/settings/components/CustomSettingsInput';
import * as Yup from 'yup';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { verticalScale } from 'utils/helpers';
import { useCartpoActions } from '../hooks/useCartpoActions';

const initialValues = {
  otp: '',
};

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .min(6, 'OTP must be exactly 6 characters long')
    .max(6, 'OTP must be exactly 6 characters long')
    .matches(/^\d+$/, 'OTP must contain only digits')
    .required('OTP is required'),
});

export const ConfirmOtpScreen = ({ navigation }: any) => {
  const { verifyOtp } = useCartpoActions();

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
        onSubmit={verifyOtp}
        validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View className="px-6 my-12">
            <Text
              style={{
                fontSize: 30,
                width: '40%',
                color: '#656565',
                fontWeight: '700',
                marginBottom: verticalScale(20),
              }}>
              Confirm OTP
            </Text>
            <View style={{ marginVertical: verticalScale(170) }}>
              <CustomSettingsInput
                label="Enter OTP"
                placeholder="12125"
                field="otp"
                handleChange={handleChange('otp')}
                keyboardType={'numeric'}
                customLabelClass={'text-gray-500 font-normal'}
                customTextInputClass={'h-14'}
                value={values.otp}
                error={errors.otp}
              />
            </View>
            <CustomReferenceButton
              customContainerClass={'rounded-xl w-72 self-center h-14'}
              extraStyles={{
                borderWidth: 0,
                backgroundColor: 'rgb(51,70,252)',
                marginTop: verticalScale(20),
              }}
              title={'Confirm'}
              customTextClass={'text-white'}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
