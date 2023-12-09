import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import { Formik } from 'formik';
import { CustomReferenceInput } from 'modules/requestReference/components/CustomReferenceInput';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';

export const RestaurantAddPaymentScreen = () => {
  const initialValues = {
    accountType: '',
    account: '',
  };

  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <View className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text className="text-base font-normal">Add Payment</Text>}
        rightComponent={<DeleteLinkIcon />}
      />
      <Formik initialValues={initialValues} validateOnChange={false} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View className="my-12 flex-1 justify-between">
            <View>
              <CustomReferenceInput
                label="Account provider / Type"
                placeholder="e.g Momo, Card, Bank, apple pay"
                field="accountType"
                handleChange={handleChange('accountType')}
                value={values.accountType}
                error={errors.accountType}
                customLabelClass={'text-[13px] font-normal'}
                customTextInputClass={'pl-6'}
              />
              <CustomReferenceInput
                label="Account"
                placeholder="6790084984"
                field="account"
                handleChange={handleChange('account')}
                value={values.account}
                error={errors.account}
                customLabelClass={'text-[13px] font-normal'}
                customTextInputClass={'pl-6'}
              />
            </View>
            <View className="items-center mb-12">
              <CustomRestaurantButton title="Save" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
