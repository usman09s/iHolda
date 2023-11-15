import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { CustomSettingsInput } from '../components/CustomSettingsInput';
import { Formik } from 'formik';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  currentPin: Yup.string()
    .required('Current pin is required')
    .matches(/^\d{6}$/, 'Pin must be a 6 digit number'),
  newPin: Yup.string()
    .required('New pin is required')
    .matches(/^\d{6}$/, 'New pin must be a 6 digit number'),
  confirmPin: Yup.string()
    .required('Confirm pin is required')
    .oneOf([Yup.ref('newPin')], "Confirm pin doesn't match"),
});

export const ChangePinScreen = () => {
  const initialValues = {
    currentPin: '',
    newPin: '',
    confirmPin: '',
  };
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <View className="px-6">
      <Header
        showBackIcon
        centerComponent={
          <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 2, color: 'gray' }}>
            Change pin
          </Text>
        }
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View className="my-12 mx-4">
            <CustomSettingsInput
              label="Enter current pin"
              placeholder="Enter Text Here"
              field="currentPin"
              handleChange={handleChange('currentPin')}
              keyboardType={'numeric'}
              value={values.currentPin}
              error={errors.currentPin}
            />
            <CustomSettingsInput
              label="New pin"
              placeholder="Enter Text Here"
              field="newPin"
              handleChange={handleChange('newPin')}
              keyboardType={'numeric'}
              value={values.newPin}
              error={errors.newPin}
            />
            <CustomSettingsInput
              label="Confirm pin"
              placeholder="Enter Text Here"
              field="confirmPin"
              handleChange={handleChange('confirmPin')}
              keyboardType={'numeric'}
              value={values.confirmPin}
              error={errors.confirmPin}
            />
            <View style={{ alignSelf: 'center', marginTop: '60%' }}>
              <CustomReferenceButton
                title="Save"
                customContainerClass={'w-44'}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
