import { useEffect, useState } from 'react';
import CustomHeader from 'components/Header/CustomHeader';
import { Formik } from 'formik';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { CustomReferenceInput } from 'modules/requestReference/components/CustomReferenceInput';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import CustomDayPicker from '../components/CustomDayPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';
import { useCartpoActions } from '../hooks/useCartpoActions';
import CustomInputButton from '../components/CustomInputButton';
import { useSelector } from 'react-redux';
import { selectCartpoSettings } from 'store/cartpo/calculateSlice';
import { getImageLink } from '../../moments/helpers/imageHelpers';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be at most 20 characters')
    .matches(/^[^\s].*[^\s]$/, 'Item name cannot start or end with spaces'),
  about: Yup.string()
    .required('Please provide information about your business')
    .min(5, 'About must be at least 3 characters')
    .matches(/^[^\s].*$/, 'About should not start with a space'),
  phoneNumber: Yup.string().required('Please enter a phone number'),
  openHours: Yup.string().required('Please select open hours'),
  closeHours: Yup.string().required('Please select close hours'),
  coverImage: Yup.string().required('Please add a cover image'),
  featuredImages: Yup.array().min(1, 'Please add at least one featured image'),
});

export const RestaurantSettingsScreen = () => {
  const { handleSettingsSubmit, handleLocationPress, cityCountry } = useCartpoActions();
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [pickerMode, setPickerMode] = useState('open');
  const settingsData = useSelector(selectCartpoSettings);

  const initialValues = {
    name: settingsData?.setting?.shop?.name || '',
    about: settingsData?.setting?.shop?.description || '',
    phoneNumber: settingsData?.setting?.shop?.phone || '',
    address: settingsData?.setting?.shop?.address || '',
    openHours: settingsData?.setting?.shop?.opening?.from || '',
    closeHours: settingsData?.setting?.shop?.opening?.to || '',
    coverImage:
      settingsData?.setting?.shop?.coverImage?.mediaId ||
      settingsData?.setting?.shop?.coverImage ||
      '',
    featuredImages: settingsData?.setting?.shop?.photos || [],
    selectedDays: settingsData?.setting?.shop?.opening?.days || [],
  };

  const pickImage = async (setFieldValue: any, fieldName: any, values: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFieldValue(
        fieldName,
        fieldName === 'coverImage'
          ? result.assets[0].uri
          : [...values.featuredImages, result.assets[0].uri],
      );
    }
  };

  const showTimepicker = mode => {
    setIsPickerShow(true);
    setPickerMode(mode);
  };

  const onTimeChange = (event: any, selectedTime: any, setFieldValue: any) => {
    const currentTime = selectedTime || (pickerMode === 'open' ? openTime : closeTime);
    if (pickerMode === 'open') {
      setOpenTime(currentTime);
      setFieldValue('openHours', formatTime(currentTime));
    } else {
      setCloseTime(currentTime);
      setFieldValue('closeHours', formatTime(currentTime));
    }
    setIsPickerShow(false);
  };

  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <ScrollView
      className="px-6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}>
      <CustomHeader showBackIcon centerComponent={<Text className="text-base">Settings</Text>} />
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={handleSettingsSubmit}
        validationSchema={validationSchema}>
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
              field="phoneNumber"
              keyboardType={'phone-pad'}
              handleChange={handleChange('phoneNumber')}
              value={values.phoneNumber}
              error={errors.phoneNumber}
              customLabelClass={'text-[13px] font-normal'}
              customTextInputClass={'text-[13px] pl-6'}
            />
            <View>
              <Text>Address</Text>
              <CustomInputButton
                placeholder={
                  cityCountry ? cityCountry : values.address ? values.address : 'Tap to add address'
                }
                onPress={handleLocationPress}
                customContainerClass={errors.address ? 'border-2 border-red-500' : ''}
              />
            </View>
            <TouchableOpacity>
              <Text>Open hours</Text>
              <CustomDayPicker
                itemsArray={[
                  { value: 'Monday', label: 'M' },
                  { value: 'Tuesday', label: 'T' },
                  { value: 'Wednesday', label: 'W' },
                  { value: 'Thursday', label: 'T' },
                  { value: 'Friday', label: 'F' },
                  { value: 'Saturday', label: 'S' },
                  { value: 'Sunday', label: 'S' },
                ]}
                onDaySelect={selectedDays => setFieldValue('selectedDays', selectedDays)}
                multiselect={true}
                defaultValue={values.selectedDays}
              />
            </TouchableOpacity>
            <View className="flex-row gap-2 items-center">
              <TouchableOpacity
                className="px-2 py-1 bg-neutral-200 rounded-lg"
                onPress={() => showTimepicker('open')}>
                <Text>
                  {settingsData?.setting?.shop?.opening?.from === values.openHours
                    ? settingsData?.setting?.shop?.opening?.from
                    : formatTime(openTime)}
                </Text>
              </TouchableOpacity>
              <Text>To</Text>
              <TouchableOpacity
                className="px-2 py-1 bg-neutral-200 rounded-lg"
                onPress={() => showTimepicker('close')}>
                <Text>
                  {settingsData?.setting?.shop?.opening?.to === values.closeHours
                    ? settingsData?.setting?.shop?.opening?.to
                    : formatTime(closeTime)}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="my-4">
              <TouchableOpacity
                className="border-dashed border-2 border-gray-300 rounded-xl h-44 justify-center items-center"
                onPress={() => pickImage(setFieldValue, 'coverImage', values)}>
                {values.coverImage ? (
                  <Image
                    source={{
                      uri: values.coverImage.startsWith('file')
                        ? values.coverImage
                        : getImageLink(values.coverImage),
                    }}
                    className="w-full h-44 rounded-xl"
                  />
                ) : (
                  <View className="items-center">
                    <Icon name="plus" />
                    <Text>Add Cover image</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text className="text-[13px] font-normal mt-4 mb-2">
                Add featured images{' '}
                <Text className="italic text-[9px] text-red-500">(Optional)</Text>
              </Text>
              <View className="flex-row justify-between my-4">
                {values.featuredImages.map((image, index) => {
                  return (
                    <TouchableOpacity
                      className="border-dashed border border-gray-300 rounded-xl h-16 items-center justify-center flex-1 mx-1"
                      onPress={() => pickImage(setFieldValue, 'featuredImages', values)}>
                      <Image
                        key={index}
                        source={{
                          uri:
                            !image.mediaId && image.startsWith('file')
                              ? image
                              : getImageLink(image.mediaId),
                        }}
                        className="w-full h-16 rounded-xl"
                      />
                    </TouchableOpacity>
                  );
                })}
                {values.featuredImages.length < 4 &&
                  [...Array(4 - values.featuredImages.length)].map((_, index) => (
                    <TouchableOpacity
                      onPress={() => pickImage(setFieldValue, 'featuredImages', values)}
                      key={index}
                      className="border-dashed border border-gray-300 rounded-xl h-16 items-center justify-center flex-1 mx-1">
                      <Text className="text-[13px]">+</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
            <View className="items-center mt-8">
              <CustomRestaurantButton title={'Save'} onPress={handleSubmit} />
            </View>
            {isPickerShow && (
              <DateTimePicker
                value={pickerMode === 'open' ? openTime : closeTime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={(event, selectedTime) => onTimeChange(event, selectedTime, setFieldValue)}
              />
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
function wretch(arg0: string) {
  throw new Error('Function not implemented.');
}
