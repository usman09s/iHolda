import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'; // Import StyleSheet
import { Formik } from 'formik';
import { CustomSettingsInput } from 'modules/settings/components/CustomSettingsInput';
import * as Yup from 'yup';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { height, verticalScale } from 'utils/helpers';

const initialValues = {
  pin: '',
  repeatPin: '',
};

const validationSchema = Yup.object().shape({
  pin: Yup.string().min(4, 'Pin must be at least 4 characters long').required('Pin is required'),
  repeatPin: Yup.string()
    .oneOf([Yup.ref('pin'), null], 'Repeat pin must match the pin')
    .required('Repeat pin is required'),
});

export const CreatePinScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  const handleSubmit = values => {
    console.log('Form values:', values);
    navigation.navigate('UnlockPin');
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
                width: '30%',
                color: '#7f7e7e',
                fontWeight: '700',
                marginBottom: verticalScale(20),
              }}>
              Create pin
            </Text>
            <View
              style={{ marginVertical: isSmallScreen ? verticalScale(100) : verticalScale(170) }}>
              <CustomSettingsInput
                label="Enter pin"
                placeholder="Enter Text Here"
                field="pin"
                handleChange={handleChange('pin')}
                keyboardType={'numeric'}
                value={values.pin}
                error={errors.pin}
              />
              <CustomSettingsInput
                label="Repeat pin"
                placeholder="Enter Text Here"
                field="repeatPin"
                handleChange={handleChange('repeatPin')}
                keyboardType={'numeric'}
                value={values.repeatPin}
                error={errors.repeatPin}
              />
            </View>
            <CustomReferenceButton
              customContainerClass={'rounded-xl w-72 self-center h-14'}
              extraStyles={{
                borderWidth: 0,
                backgroundColor: 'rgb(51,70,252)',
                marginTop: verticalScale(20),
              }}
              title={'Create account'}
              customTextClass={'text-white'}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
