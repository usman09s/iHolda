import CustomHeader from 'components/Header/CustomHeader';
import { Formik } from 'formik';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { CustomReferenceInput } from 'modules/requestReference/components/CustomReferenceInput';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomDayPicker from '../components/CustomDayPicker';

export const RestaurantSettingsScreen = () => {
  const initialValues = {
    name: '',
    about: '',
    phoneNumber: '',
    address: '',
    openHours: '',
    coverImage: '',
  };

  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <View className="px-6">
      <CustomHeader showBackIcon centerComponent={<Text className="text-base">Settings</Text>} />
      <Formik initialValues={initialValues} validateOnChange={false} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View className="my-12">
            <CustomReferenceInput
              label="Business name"
              placeholder="e.g abc business"
              field="name"
              handleChange={handleChange('name')}
              value={values.name}
              error={errors.name}
              customLabelClass={'text-[13px] font-normal'}
            />
            <CustomReferenceInput
              label="About business"
              placeholder="Write  about business here for customers to see"
              field="about"
              handleChange={handleChange('about')}
              value={values.about}
              error={errors.about}
              customLabelClass={'text-[13px] font-normal'}
              customTextInputClass={'text-[13px] h-20 py-3 rounded-xl'}
              textAlignVertical="top"
              multiline={true}
            />
            <CustomReferenceInput
              label="Phone number"
              placeholder="+237  679090404"
              field="fullName"
              handleChange={handleChange('fullName')}
              value={values.fullName}
              error={errors.fullName}
              customLabelClass={'text-[13px] font-normal'}
              customTextInputClass={'text-[13px] pl-6'}
            />
            <TouchableOpacity>
              <CustomDayPicker />
            </TouchableOpacity>
            <View className="items-center mt-20">
              <CustomReferenceButton title="Next" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
