import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { CustomSettingsInput } from 'modules/settings/components/CustomSettingsInput';
import * as Yup from 'yup';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { height, verticalScale } from 'utils/helpers';

const initialValues = {
  pin: '',
};

const validationSchema = Yup.object().shape({
  pin: Yup.string()
    .min(5, 'OTP must be exactly 5 characters long')
    .max(5, 'OTP must be exactly 5 characters long')
    .matches(/^\d+$/, 'OTP must contain only digits')
    .required('OTP is required'),
});

export const UnlockPinScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  const handleSubmit = values => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'CartpoTab' }],
    });
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
          <View className="px-6 my-12">
            <Text
              style={{
                fontSize: 30,
                width: '60%',
                color: '#7f7e7e',
                fontWeight: '700',
                marginBottom: verticalScale(20),
              }}>
              Enter unlock pin
            </Text>
            <View
              style={{ marginVertical: isSmallScreen ? verticalScale(120) : verticalScale(170) }}>
              <CustomSettingsInput
                label="Enter pin"
                placeholder="34312"
                field="pin"
                handleChange={handleChange('pin')}
                keyboardType={'numeric'}
                customLabelClass={'text-gray-500 font-normal'}
                customTextInputClass={'h-14'}
                value={values.pin}
                error={errors.pin}
              />
            </View>
            <CustomReferenceButton
              customContainerClass={'rounded-xl w-72 self-center h-14'}
              extraStyles={{
                borderWidth: 0,
                backgroundColor: 'rgb(51,70,252)',
                marginTop: verticalScale(20),
              }}
              title={'Login'}
              customTextClass={'text-white'}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
