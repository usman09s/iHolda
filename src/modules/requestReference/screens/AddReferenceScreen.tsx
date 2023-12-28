import Header from 'components/Header/Header';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { text } from 'theme/text';
import { CustomReferenceContact } from '../components/CustomReferenceContact';
import { height } from 'utils/helpers';
import { useRequestReferenceAction } from '../hooks/useRequestReferenceActions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export const AddReferenceScreen = () => {
  const { searchText, handleChangeText, handleSearchUsers, handleLoadMore, isLoading } =
    useRequestReferenceAction();
  const searchData = useSelector(state => state.userReference.searchUsers);
  const referenceUsers = useSelector(state => state.userReference.referenceUsers);
  const isFocused = useIsFocused();
  const isSmallScreen = height < 700;

  const filteredSearchData = searchData.filter(item => {
    return !referenceUsers.some(userId => userId._id === item._id);
  });

  useEffect(() => {
    if (searchText || isFocused) {
      console.log(searchText);
      console.log(searchData, searchText);
      handleSearchUsers();
    }
  }, [searchText, isFocused]);

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
          onSubmitEditing={handleSearchUsers}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator animating={true} color={'blue'} />
      ) : (
        <FlatList
          data={filteredSearchData}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <CustomReferenceContact data={item} />}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
        />
      )}
    </View>
  );
};
