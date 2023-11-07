import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Button from 'components/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useLoadCountries } from 'hooks/useLoadContries';
import { useMutation } from 'react-query';
import Api from 'services/Api';
import { text } from 'theme/text';
import { CountryCodeType } from 'types/AuthTypes';
import { INITIAL_SELECTED_COUNTRY } from 'utils/fixtures';

import { AuthStackParamList } from '../AuthStackNavigator';
import CountriesModal from '../components/CountriesModal';
import PhoneConfirmationModal from '../components/PhoneConfirmationModal';
import PhoneInput from '../components/PhoneInput';
import { setCountryCode } from 'store/auth/userSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { verticalScale } from 'utils/helpers';

const SignUpScreen = () => {
  const { countries } = useLoadCountries();
  const [phoneNumber, setPhoneNumber] = useState('5468167196');
  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const { navigate } = useAppNavigation<NavigationProp<AuthStackParamList>>();
  const [showPhoneConfirmationModal, setShowPhoneConfirmationModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeType>(INITIAL_SELECTED_COUNTRY);
  const dispatch = useAppDispatch();

  const { isLoading, mutate } = useMutation(Api.verifyPhoneBeforeRegister, {
    onSuccess: data => {
      if (data.navigateTo === 'ConfirmOtp') {
        navigate(data.navigateTo);

        return;
      }
      if (data.navigateTo === 'SignIn') {
        const formattedPhone = `${selectedCountry.phone}${phoneNumber}`;
        navigate('SignIn', {
          phone: formattedPhone.substring(1, formattedPhone.length),
        });

        return;
      }
    },
  });

  useEffect(() => {
    if (selectedCountry !== INITIAL_SELECTED_COUNTRY) {
      setPhoneNumber('');
    }
  }, [selectedCountry]);

  const onPressContinue = () => {
    if (phoneNumber.length < 4) {
      return;
    }
    setShowPhoneConfirmationModal(false);

    const formattedPhone = `${selectedCountry.phone}${phoneNumber}`;
    const formattedPhoneWithoutPlus = formattedPhone.replace(/\+/g, '');
    console.log(formattedPhoneWithoutPlus, 'ssss');
    dispatch(
      setCountryCode({
        countryCode: selectedCountry.countryCode,
        phone: formattedPhoneWithoutPlus,
      }),
    );
    mutate({
      phone: formattedPhone.substring(1, formattedPhone.length).toString(),
    });
  };

  return (
    <View className="pt-10 bg-blue flex-1 px-7 justify-center">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: verticalScale(120) }}>
        <Text className={text({ type: 'b44', class: 'text-white mb-16' })}>
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
          extraStyles={{ borderWidth: 5, borderColor: 'white', width: 190 }}
          isLoading={isLoading}
          onPress={() => setShowPhoneConfirmationModal(true)}
          disabled={isLoading || !phoneNumber || phoneNumber.length < 4}
          customContainer={`self-center mt-20 ${phoneNumber.length < 4 && ' opacity-40'} `}
        />
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
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
