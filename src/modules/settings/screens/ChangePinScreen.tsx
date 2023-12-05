import Header from 'components/Header/Header';
import { View, Text, ScrollView } from 'react-native';
import { CustomSettingsInput } from '../components/CustomSettingsInput';
import { Formik } from 'formik';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import * as Yup from 'yup';
import { height } from 'utils/helpers';
import { useSettingActions } from '../hooks/useSettingsActions';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Current pin is required')
    .matches(/^\d{4}$/, 'Invalid Current Pin'),
  newPassword: Yup.string()
    .required('New pin is required')
    .matches(/^\d{4}$/, 'Invalid New pin'),
  confirmPassword: Yup.string()
    .required('Confirm pin is required')
    .oneOf([Yup.ref('newPassword')], "Confirm pin doesn't match"),
});

export const ChangePinScreen = () => {
  const { handleSubmit } = useSettingActions();
  const isSmallScreen = height < 700;
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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
                field="oldPassword"
                handleChange={handleChange('oldPassword')}
                keyboardType={'numeric'}
                value={values.oldPassword}
                error={errors.oldPassword}
              />
              <CustomSettingsInput
                label="New pin"
                placeholder="Enter Text Here"
                field="newPassword"
                handleChange={handleChange('newPassword')}
                keyboardType={'numeric'}
                value={values.newPassword}
                error={errors.newPassword}
              />
              <CustomSettingsInput
                label="Confirm pin"
                placeholder="Enter Text Here"
                field="confirmPassword"
                handleChange={handleChange('confirmPassword')}
                keyboardType={'numeric'}
                value={values.confirmPassword}
                error={errors.confirmPassword}
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
