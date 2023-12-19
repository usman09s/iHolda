import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import { Formik } from 'formik';
import { CustomReferenceInput } from 'modules/requestReference/components/CustomReferenceInput';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import CustomDayPicker from '../components/CustomDayPicker';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMenuItem,
  selectCartpoSettings,
  setMenuData,
  setSelectedMenuItem,
} from 'store/cartpo/calculateSlice';
import { selectSelectedMenuItem } from '../../../store/cartpo/calculateSlice';
import Toast from 'react-native-toast-message';

export const RestaurantAddMenuScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const restaurantData = useSelector(selectCartpoSettings);
  const selectedItem = useSelector(selectSelectedMenuItem);
  const initialValues = {
    photo: '',
    itemName: (selectedItem && selectedItem?.name) || '',
    price: (selectedItem && selectedItem?.price?.toString()) || '',
    category: (selectedItem && selectedItem?.category) || '',
    daysAvailable: (selectedItem && selectedItem?.daysAvailable) || '',
    timeAvailable: (selectedItem && selectedItem?.timeAvailable) || '',
  };

  const handleSubmit = async values => {
    const formData = new FormData();
    formData.append('_id', '656f383b30363e897026b0c2');
    formData.append('shop', '656f1f52f6a855f521383ad3');
    formData.append('name', values.itemName);
    formData.append('price', values.price);
    formData.append('daysAvailable[0]', 'Monday');
    formData.append('timeAvailable[0]', values.timeAvailable);
    formData.append('category', values.category);
    formData.append('photos[0][mediaId]', '49c7fefd-df2f-436e-f480-c84c1c824400');
    formData.append('photos[0][mediaType]', 'image/png');
    formData.append('photos', values.photo);
    console.log('Form Data:', formData);
    try {
      const response = await fetch('http://ihold.yameenyousuf.com/api/cartpo/shop/menu', {
        method: 'POST',
        headers: {},
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API request failed:', response.status, errorData);
        return;
      }

      const result = await response.json();
      console.log('API Response:', result);
      dispatch(setMenuData(result.data));
      dispatch(setSelectedMenuItem([]));
      navigation.goBack();
    } catch (error) {
      console.error('Error sending API request:', error.message);
    }
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
      setFieldValue(fieldName, result.uri);
    }
  };

  const handleDeleteMenuItem = () => {
    if (selectedItem._id) {
      dispatch(deleteMenuItem(selectedItem._id));
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please add a menu item first',
      });
    }
  };

  return (
    <ScrollView className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text className="text-base font-normal">Add item</Text>}
        rightComponent={
          <TouchableOpacity onPress={handleDeleteMenuItem}>
            <DeleteLinkIcon />
          </TouchableOpacity>
        }
      />
      <Formik initialValues={initialValues} validateOnChange={false} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View className="my-6 flex-1">
            <TouchableOpacity
              className="border-2 border-gray-300 rounded-xl h-36 w-4/5 justify-center items-center self-center"
              onPress={() => pickImage(setFieldValue, 'photo', values)}>
              {values.photo ? (
                <Image source={{ uri: values.photo }} className="w-full h-36 rounded-xl" />
              ) : (
                <View className="items-center">
                  <View className="bg-neutral-200 rounded-full p-1">
                    <Icon name="plus" color="black" size={20} />
                  </View>
                  <Text className="text-[14px] font-bold">Add photo</Text>
                </View>
              )}
            </TouchableOpacity>
            <CustomReferenceInput
              label="Item name"
              placeholder="e.g stewed beef curry"
              field="itemName"
              handleChange={handleChange('itemName')}
              value={values.itemName}
              error={errors.itemName}
              customLabelClass={'text-[13px] font-normal'}
              customTextInputClass={'pl-6'}
            />
            <CustomReferenceInput
              label="Price"
              placeholder="e.g stewed beef curry"
              field="price"
              handleChange={handleChange('price')}
              value={values.price}
              error={errors.price}
              customLabelClass={'text-[13px] font-normal'}
              customTextInputClass={'pl-6'}
              keyboardType={'numeric'}
            />
            <View className="w-full">
              <Text className="mb-2">Category</Text>
              <SelectDropdown
                data={['Mains', 'Sides', 'Drinks', 'Extras']}
                placeholder="Main"
                buttonTextStyle={{ color: 'black', textAlign: 'left', fontSize: 16 }}
                placeholderColor={'gray'}
                buttonStyle={{
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                  backgroundColor: 'rgb(229 229 229)',
                  borderRadius: 30,
                  width: '100%',
                }}
                rowTextStyle={{ fontSize: 14, fontWeight: '500' }}
                dropdownStyle={{ borderRadius: 7, paddingHorizontal: 10 }}
                buttonTextAfterSelection={(selectedItem: string, index: number) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item: string, index: number) => {
                  return item;
                }}
                onSelect={item => setFieldValue('category', item)}
                renderDropdownIcon={() => {
                  return (
                    <View style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                      <Ionicon name="chevron-down-sharp" style={{ fontSize: 24 }} color="gray" />
                    </View>
                  );
                }}
                dropdownIconPosition="right"
                defaultValue={values.category}
              />
            </View>
            <View className="mt-2">
              <Text className="my-2 text-[15px]">Days Available</Text>
              <CustomDayPicker
                itemsArray={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                multiselect={true}
                onDaySelect={index => setFieldValue('daysAvailable', index)}
              />
            </View>
            <View>
              <Text className="my-3 text-[15px]">Time Available</Text>
              <CustomDayPicker
                itemsArray={['All day', 'Morning', 'Afternoon', 'Evening']}
                onDaySelect={index => setFieldValue('timeAvailable', index[0])}
                customButtonContainer={'w-20'}
                customClassContainer={'justify-start gap-3'}
                multiselect={false}
                defaultValue={values.timeAvailable[0]}
              />
            </View>
            <View className="items-center mb-12">
              <CustomRestaurantButton title="Save" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
