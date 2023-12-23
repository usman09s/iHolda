import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { CustomSettingsInput } from 'modules/settings/components/CustomSettingsInput';
import * as Yup from 'yup';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { height, verticalScale } from 'utils/helpers';
import { useCartpoActions } from '../hooks/useCartpoActions';

const initialValues = {
  pin: '',
};

const validationSchema = Yup.object().shape({
  pin: Yup.string()
    .min(4, 'Unlock pin must be 4 characters long')
    .matches(/^\d+$/, 'Unlock pin must contain only digits')
    .test('is-valid-pin', 'Pin must be between 1001 and 9999', value => {
      const numericValue = parseInt(value, 10);
      return numericValue >= 1001 && numericValue <= 9999;
    })
    .required('Unlock pin is required'),
});

export const SignInScreen = ({ navigation }: any) => {
  const { handleLoginSubmit } = useCartpoActions();
  const isSmallScreen = height < 700;

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
        onSubmit={handleLoginSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View className="px-6 my-12">
            <Text
              style={{
                fontSize: 30,
                width: '60%',
                color: '#656565',
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
