import Header from 'components/Header/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { DeleteLinkIcon } from '../../../../assets/referralGift';
import { Formik } from 'formik';
import { CustomReferenceInput } from 'modules/requestReference/components/CustomReferenceInput';
import { CustomRestaurantButton } from '../components/CustomRestaurantButton';
import { useCartpoActions } from '../hooks/useCartpoActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePaymentAccount,
  selectCartpoSettings,
  selectSelectedPayment,
  setCartpoSettings,
} from 'store/cartpo/calculateSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  accountType: Yup.string()
    .required('Account provider / Type is required')
    .matches(/^\S*$/, 'Invalid Account Type'),
  account: Yup.string().required('Account is required').matches(/^\S*$/, 'Invalid Account Number'), // Disallow spaces
});

export const RestaurantAddPaymentScreen = () => {
  const { handleAddPayment, handleDeletePayment } = useCartpoActions();
  const settingsData = useSelector(selectCartpoSettings);
  const selectPayment = useSelector(selectSelectedPayment);
  console.log(selectPayment, 'pipipip');
  console.log(settingsData.setting.paymentMethod, 'pipipipoioio');
  const initialValues = {
    accountType: selectPayment?.bank || '',
    account: selectPayment?.account?.toString() || '',
  };
  const dispatch = useDispatch();
  const deletePaymentAccountHandler = () => {
    if (settingsData && settingsData.setting && settingsData.setting.paymentMethod) {
      handleDeletePayment(selectPayment.account);
    }
  };

  return (
    <View className="flex-1 px-6">
      <Header
        showBackIcon
        centerComponent={<Text className="text-base font-normal">Add Payment</Text>}
        rightComponent={
          <TouchableOpacity onPress={deletePaymentAccountHandler}>
            <DeleteLinkIcon />
          </TouchableOpacity>
        }
      />
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={handleAddPayment}
        validationSchema={validationSchema}>
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
