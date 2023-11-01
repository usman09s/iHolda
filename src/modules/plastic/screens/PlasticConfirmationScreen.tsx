import { ScrollView, Text, View } from 'react-native';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';
import Header from 'components/Header/Header';
import { text } from 'theme/text';
import { CashAndPointsFixture } from 'utils/fixtures';

import AddedPlasticInformationLabel from '../components/AddedPlasticInformationLabel';
import AddedPlasticInformationStats from '../components/AddedPlasticInformationStats';
import AddedPlasticTotalInformation from '../components/AddedPlasticTotalInformation';
import RatioBar from '../components/RatioBar';
import ResultBarCashAndPoints from '../components/ResultBarCashAndPoint';
import { usePlasticConfirmationActions } from '../hooks/usePlasticConfirmationActions';
import CustomErrorModal from 'components/ErrorModal/errorModal';

const PlasticConfirmationScreen = () => {
  const {
    isLoading,
    totalPrice,
    totalPlastic,
    onPressRatio,
    errorMessage,
    addedPlastics,
    selectedRatio,
    onPressConfirm,
    modalVisible,
    modalClose,
    modalText,
  } = usePlasticConfirmationActions();

  return (
    <View className="bg-milkWhite px-7 flex-1">
      <Header showBackIcon title="Confirmation" />
      <ScrollView className="flex-1 my-6" showsVerticalScrollIndicator={false}>
        <AddedPlasticInformationLabel />
        {addedPlastics.map(plastic => (
          <AddedPlasticInformationStats key={plastic._id} plastic={plastic} />
        ))}
        <AddedPlasticTotalInformation totalPlastic={totalPlastic} totalPrice={totalPrice} />
        <View>
          <Text className={text({ type: 'r12', class: 'text-center text-black-o-70. mb-8' })}>
            Choose how you want to split your reward between cash and community points
          </Text>
        </View>
        <View>
          {CashAndPointsFixture.map(item => (
            <RatioBar
              key={item.id}
              cash={item.cash}
              point={item.point}
              customContainerClass="mb-4"
              onPressRatio={() => onPressRatio(item)}
              isSelected={selectedRatio?.id === item.id}
            />
          ))}
        </View>
        <ResultBarCashAndPoints
          totalPrice={totalPrice}
          cash={selectedRatio?.cash}
          point={selectedRatio?.point}
        />
        <Button
          title="Confirm"
          disabled={isLoading}
          isLoading={isLoading}
          onPress={onPressConfirm}
          customContainer="self-center px-12 mt-7 mb-4"
        />
      </ScrollView>
      <ErrorModal errorText={errorMessage} />
      <CustomErrorModal
        visible={modalVisible}
        errorText={modalText}
        onClose={modalClose}
        buttonTitle="CLOSE"
      />
    </View>
  );
};

export default PlasticConfirmationScreen;
