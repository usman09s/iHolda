import Header from 'components/Header/Header';
import { View, Text, ScrollView } from 'react-native';
import { CustomSettingsInput } from '../components/CustomSettingsInput';
import { Formik } from 'formik';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import * as Yup from 'yup';
import { height } from 'utils/helpers';

const validationSchema = Yup.object().shape({
  currentPin: Yup.string()
    .required('Current pin is required')
    .matches(/^\d{4}$/, 'Invalid Current Pin'),
  newPin: Yup.string()
    .required('New pin is required')
    .matches(/^\d{4}$/, 'Invalid New pin'),
  confirmPin: Yup.string()
    .required('Confirm pin is required')
    .oneOf([Yup.ref('newPin')], "Confirm pin doesn't match"),
});

export const ChangePinScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
  const initialValues = {
    currentPin: '',
    newPin: '',
    confirmPin: '',
  };
  const handleSubmit = values => {
    console.log(values);
    navigation.navigate('CartpoStack');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
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
          validationSchema={validationSchema}
          validateOnChange={false}>
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
              <View style={{ alignSelf: 'center', marginTop: isSmallScreen ? '40%' : '60%' }}>
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
    </ScrollView>
  );
};
