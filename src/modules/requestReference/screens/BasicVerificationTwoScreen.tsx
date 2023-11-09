import React from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import Header from 'components/Header/Header';
import { CustomReferenceInput } from '../components/CustomReferenceInput';
import { text } from 'theme/text';
import * as Yup from 'yup';
import Button from 'components/Button';
import { CustomReferenceButton } from '../components/CustomReferenceButton';

const verificationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  date: Yup.string()
    .required('Date is required')
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
      'Invalid date format (MM/DD/YYYY)',
    ),
  emailAddress: Yup.string().required('Email address is required').email('Invalid email address'),
  city: Yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  country: Yup.string()
    .required('Country is required')
    .min(2, 'Country must be at least 2 characters'),
});

export const BasicVerificationTwoScreen = ({ navigation }: any) => {
  const initialValues = {
    fullName: '',
    date: '',
    emailAddress: '',
    city: '',
    country: '',
  };

  const handleSubmit = values => {
    console.log(values);
    navigation.navigate('BasicVerificationThree');
  };

  return (
    <View className="px-6 flex-1">
      <Header
        showBackIcon
        title="Basic verification"
        rightComponent={<Text className={text({ type: 'm16' })}>2/3</Text>}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={verificationSchema}
        onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View className="my-12">
            <CustomReferenceInput
              label="Full name"
              placeholder="e.g Betrand Bayuga"
              field="fullName"
              handleChange={handleChange('fullName')}
              value={values.fullName}
              error={errors.fullName}
            />
            <CustomReferenceInput
              label="Date"
              placeholder="01/09/2000"
              field="date"
              handleChange={handleChange('date')}
              keyboardType={'numeric'}
              value={values.date}
              error={errors.date}
            />
            <CustomReferenceInput
              label="Email address"
              placeholder="e.g name@email.com"
              field="emailAddress"
              handleChange={handleChange('emailAddress')}
              value={values.emailAddress}
              error={errors.emailAddress}
            />
            <View className="flex-row w-full">
              <View className="w-1/2">
                <CustomReferenceInput
                  label="City"
                  containerClass={'mr-1.5'}
                  placeholder="e.g Paris"
                  field="city"
                  handleChange={handleChange('city')}
                  value={values.city}
                  error={errors.city}
                  customTextInputClass={'rounded-xl ml-1.5'}
                  customLabelClass={'text-base font-medium'}
                />
              </View>
              <View className="w-1/2">
                <CustomReferenceInput
                  label="Country"
                  placeholder="France"
                  containerClass={'ml-1.5'}
                  field="country"
                  handleChange={handleChange('country')}
                  value={values.country}
                  error={errors.country}
                  customTextInputClass={'rounded-xl'}
                  customLabelClass={'text-base font-medium'}
                />
              </View>
            </View>
            <View className="items-center mt-20">
              <CustomReferenceButton title="Next" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
