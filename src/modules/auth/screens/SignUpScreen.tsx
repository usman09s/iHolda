import { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useLoadCountries } from 'hooks/useLoadContries';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { setUserInfo } from 'store/auth/userSlice';
import { text } from 'theme/text';
import { CountryCodeType } from 'types/AuthTypes';
import { INITIAL_SELECTED_COUNTRY } from 'utils/fixtures';

import { AuthStackParamList } from '../AuthStackNavigator';
import CountriesModal from '../components/CountriesModal';
import PhoneConfirmationModal from '../components/PhoneConfirmationModal';
import PhoneInput from '../components/PhoneInput';

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const { countries } = useLoadCountries();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const [showPhoneConfirmationModal, setShowPhoneConfirmationModal] = useState(false);
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeType>(INITIAL_SELECTED_COUNTRY);

  const { isLoading, mutate } = useMutation(Api.signUp, {
    onSuccess: data => {
      dispatch(
        setUserInfo({
          phone: data.phone,
          query_id: data.query_id,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        }),
      );
      navigate('ConfirmOtp');
    },
    onError: err => {
      const parsedError = JSON.parse(err?.message);
      if (parsedError[1].username || parsedError[1].phone === 'Already exists') {
        navigate('SignIn');
      }
    },
  });

  const onPressContinue = () => {
    if (phoneNumber.length < 4) {
      return;
    }

    setShowPhoneConfirmationModal(false);

    mutate({
      phone: `${selectedCountry.phone}${phoneNumber}`,
    });
  };

  return (
    <View className="pt-10 bg-blue flex-1 px-7 justify-center">
      <KeyboardAvoidingView behavior="position">
        <Text className={text({ type: 'b44', class: 'text-white mb-20' })}>
          Enter your{'\n'}Phone Number
        </Text>
        <PhoneInput
          value={phoneNumber}
          editable={!isLoading}
          onChangeText={setPhoneNumber}
          selectedCountry={selectedCountry}
          onPressCountryCode={() => setShowCountriesModal(true)}
        />
        <Button
          title="Continue"
          type="borderedSolid"
          isLoading={isLoading}
          disabled={isLoading || !phoneNumber}
          onPress={() => setShowPhoneConfirmationModal(true)}
          customContainer={`self-center mt-20 ${phoneNumber.length < 4 && ' opacity-40'} `}
        />
      </KeyboardAvoidingView>
      <CountriesModal
        countries={countries}
        visible={showCountriesModal}
        onCloseModal={() => setShowCountriesModal(false)}
        onPressCountry={value => setSelectedCountry(value)}
      />
      <PhoneConfirmationModal
        phoneNumber={phoneNumber}
        onPressYes={onPressContinue}
        countryCode={selectedCountry.phone}
        visible={showPhoneConfirmationModal}
        onCloseModal={() => setShowPhoneConfirmationModal(false)}
      />
    </View>
  );
};

export default SignUpScreen;
