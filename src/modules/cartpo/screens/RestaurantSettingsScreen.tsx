import { useState } from 'react';
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

export const RestaurantSettingsScreen = () => {
  const { handleSettingsSubmit, handleLocationPress, cityCountry } = useCartpoActions();
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [pickerMode, setPickerMode] = useState('open');
  const settingsData = useSelector(selectCartpoSettings);
  console.log(settingsData, 'lplplplpl');

  const initialValues = {
    name: '',
    about: '',
    phoneNumber: '',
    address: '',
    openHours: '',
    closeHours: '',
    coverImage: '',
    featuredImages: [],
    selectedDays: [],
  };

  const pickImage = async (setFieldValue: any, fieldName: any, values: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(values.featuredImages);
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
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

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
        onSubmit={handleSettingsSubmit}>
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
              handleChange={handleChange('phoneNumber')}
              value={values.phoneNumber}
              error={errors.phoneNumber}
              customLabelClass={'text-[13px] font-normal'}
              customTextInputClass={'text-[13px] pl-6'}
            />
            <View>
              <Text>Address</Text>
              <CustomInputButton
                placeholder={cityCountry ? cityCountry : 'Tap to add address'}
                onPress={handleLocationPress}
              />
            </View>
            <TouchableOpacity>
              <Text>Open hours</Text>
              <CustomDayPicker
                itemsArray={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                multiSelect={true}
                onDaySelect={selectedDays => setFieldValue('selectedDays', selectedDays)}
              />
            </TouchableOpacity>
            <View className="flex-row gap-2 items-center">
              <TouchableOpacity
                className="px-2 py-1 bg-neutral-200 rounded-lg"
                onPress={() => showTimepicker('open')}>
                <Text>{formatTime(openTime)}</Text>
              </TouchableOpacity>
              <Text>To</Text>
              <TouchableOpacity
                className="px-2 py-1 bg-neutral-200 rounded-lg"
                onPress={() => showTimepicker('close')}>
                <Text>{formatTime(closeTime)}</Text>
              </TouchableOpacity>
            </View>
            <View className="my-4">
              <TouchableOpacity
                className="border-dashed border-2 border-gray-300 rounded-xl h-44 justify-center items-center"
                onPress={() => pickImage(setFieldValue, 'coverImage', values)}>
                {values.coverImage ? (
                  <Image source={{ uri: values.coverImage }} className="w-full h-44 rounded-xl" />
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
                {values.featuredImages.map((image, index) => (
                  <View className="border-dashed border border-gray-300 rounded-xl h-16 items-center justify-center flex-1 mx-1">
                    <Image key={index} source={{ uri: image }} className="w-full h-16 rounded-xl" />
                  </View>
                ))}
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
