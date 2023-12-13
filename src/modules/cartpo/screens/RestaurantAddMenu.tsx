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

export const RestaurantAddMenuScreen = () => {
  const initialValues = {
    photo: '',
    itemName: '',
    price: '',
    category: '',
    daysAvailable: '',
    timeAvailable: '',
  };

  const handleSubmit = values => {
    console.log(values);
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

  return (
    <ScrollView className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text className="text-base font-normal">Add item</Text>}
        rightComponent={<DeleteLinkIcon />}
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
                  <Icon name="plus" />
                  <Text>Add Cover Image</Text>
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
              <Text>Category</Text>
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
                renderDropdownIcon={() => {
                  return (
                    <View style={{ justifyContent: 'flex-end', paddingRight: 20, paddingLeft: 0 }}>
                      <Ionicon name="chevron-down-sharp" style={{ fontSize: 24 }} color="gray" />
                    </View>
                  );
                }}
                dropdownIconPosition="right"
              />
            </View>
            <View>
              <Text>Days Available</Text>
              <CustomDayPicker
                itemsArray={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                multiselect={true}
                onDaySelect={() => console.log('Something')}
              />
            </View>
            <View>
              <Text>Time Available</Text>
              <CustomDayPicker
                itemsArray={['All day', 'Morning', 'Afternoon']}
                onDaySelect={() => console.log('Something')}
                customButtonContainer={'w-20'}
                customClassContainer={'justify-start gap-3'}
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
