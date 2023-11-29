import Header from 'components/Header/Header';
import { View, Text, TextInput, FlatList } from 'react-native';
import { text } from 'theme/text';
import { CustomReferenceContact } from '../components/CustomReferenceContact';
import { height } from 'utils/helpers';
import { useRequestReferenceAction } from '../hooks/useRequestReferenceActions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const AddReferenceScreen = () => {
  const { searchText, handleChangeText, handleSearchUsers } = useRequestReferenceAction();
  const searchData = useSelector(state => state.userReference.searchUsers);
  const isSmallScreen = height < 700;

  useEffect(() => {
    handleSearchUsers();
  }, []);

  return (
    <View className="px-6 flex-1">
      <Header
        showBackIcon
        centerComponent={
          <Text className={text({ type: 'm16', class: 'mt-2 text-lg' })}>Reference</Text>
        }
      />
      <View className={`mb-6 ${isSmallScreen ? 'mt-8' : 'mt-12'}`}>
        <TextInput
          className="bg-neutral-200 rounded-3xl h-10 mx-6 px-4"
          placeholder="Search user"
          value={searchText}
          onChangeText={handleChangeText}
          placeholderTextColor={'gray'}
        />
      </View>
      <FlatList
        data={searchData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CustomReferenceContact data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
