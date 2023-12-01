import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Formik } from 'formik';
import Header from 'components/Header/Header';
import { CustomReferenceInput } from '../components/CustomReferenceInput';
import { text } from 'theme/text';
import * as Yup from 'yup';
import { CustomReferenceButton } from '../components/CustomReferenceButton';
import { useRequestReferenceAction } from '../hooks/useRequestReferenceActions';

const verificationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .matches(/^[A-Za-z\s]+$/, 'Invalid input')
    .min(3, 'Full name must be at least 3 characters')
    .matches(/[A-Za-z]/, 'Full name must contain atleast three letters'),
  dob: Yup.string()
    .matches(
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d\d$/,
      'Invalid date format. Must be DD/MM/YYYY',
    )
    .test('valid-date', 'Invalid Date', function (value) {
      if (!value) return true;
      const currentDate = new Date();
      const [day, month, year] = value.split('/').map(Number);
      const selectedDate = new Date(year, month - 1, day);
      return selectedDate instanceof Date && !isNaN(selectedDate) && selectedDate <= currentDate;
    })
    .required('Date is required'),
  email: Yup.string()
    .required('Email address is required')
    .matches(/^\S+@\S+\.\S+$/, 'Invalid email address'),
  city: Yup.string()
    .required('City is required')
    .matches(/^\S.*\S$/, 'Invalid city')
    .min(2, 'City must be at least 2 characters'),
  country: Yup.string()
    .required('Country is required')
    .min(2, 'Country must be at least 2 characters')
    .test('isValidCountry', 'Invalid country', async value => {
      let countriesData;
      try {
        const jsonData = require('../../../../assets/data/countryCode.json');
        countriesData = jsonData.countries;
      } catch (error) {
        console.error('Error loading country data:', error);
        return false;
      }
      if (!Array.isArray(countriesData)) {
        console.error('Invalid country data structure:', countriesData);
        return false;
      }
      const lowercasedValue = value.toLowerCase();
      const lowercasedCountries = countriesData.map(country => country.name.toLowerCase());
      const countryExists = lowercasedCountries.includes(lowercasedValue);
      return countryExists;
    }),
});

export const BasicVerificationTwoScreen = () => {
  const { handleNavigation2 } = useRequestReferenceAction();
  const initialValues = {
    fullName: '',
    dob: '',
    email: '',
    city: '',
    country: '',
  };

  const handleSubmit = values => {
    console.log(values, 'lajdkhs');
    handleNavigation2(values);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="px-6 flex-1">
        <Header
          showBackIcon
          centerComponent={
            <Text className={text({ type: 'm16', class: 'mt-2 text-lg' })}>Basic verification</Text>
          }
          title="Basic verification"
          rightComponent={<Text className={text({ type: 'm16', class: 'mt-1' })}>2/3</Text>}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={verificationSchema}
          validateOnChange={false}
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
                label="Date of birth"
                placeholder="01/09/2000"
                field="dob"
                handleChange={handleChange('dob')}
                keyboardType={'numeric'}
                value={values.dob}
                error={errors.dob}
              />
              <CustomReferenceInput
                label="Email address"
                placeholder="e.g name@email.com"
                field="email"
                handleChange={handleChange('email')}
                value={values.email}
                error={errors.email}
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
    </ScrollView>
  );
};
