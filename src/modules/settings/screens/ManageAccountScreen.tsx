import Header from 'components/Header/Header';
import { View, Text } from 'react-native';
import { CustomSettingOption } from '../components/CustomSettingOption';

export const ManageAccountScreen = ({ navigation }: any) => {
  return (
    <View className="px-6">
      <Header
        showBackIcon
        centerComponent={
          <Text style={{ fontSize: 14, fontWeight: '700', marginTop: 6 }}>Manage account</Text>
        }
      />
      <View>
        <CustomSettingOption
          option="Change pin"
          extraContainerStyles={{ borderBottomWidth: 0 }}
          onPress={() => navigation.navigate('ChangePin')}
        />
        <CustomSettingOption
          option="Deactivate account"
          extraContainerStyles={{ borderBottomWidth: 0 }}
          customContainerClass="py-2"
          onPress={() => navigation.navigate('DeactivateAccount')}
        />
      </View>
    </View>
  );
};
