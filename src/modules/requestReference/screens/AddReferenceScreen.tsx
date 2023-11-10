import Header from 'components/Header/Header';
import { View, Text, TextInput, FlatList } from 'react-native';
import { text } from 'theme/text';
import { CustomReferenceContact } from '../components/CustomReferenceContact';
import { height } from 'utils/helpers';

const dummyData = [
  { id: '1', name: 'John Doe', card: 'Credit Card', imageUri: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', name: 'Jane Doe', card: 'National Bank', imageUri: 'https://i.pravatar.cc/100?img=2' },
  {
    id: '3',
    name: 'Alice Smith',
    card: 'Credit Card',
    imageUri: 'https://i.pravatar.cc/100?img=3',
  },
  {
    id: '4',
    name: 'Bob Johnson',
    card: 'National Bank',
    imageUri: 'https://i.pravatar.cc/100?img=4',
  },
  { id: '5', name: 'Eva Davis', card: 'Credit Card', imageUri: 'https://i.pravatar.cc/100?img=5' },
  {
    id: '6',
    name: 'Michael Brown',
    card: 'National Bank',
    imageUri: 'https://i.pravatar.cc/100?img=7',
  },
  {
    id: '7',
    name: 'Olivia White',
    card: 'Credit Card',
    imageUri: 'https://i.pravatar.cc/100?img=8',
  },
  {
    id: '8',
    name: 'William Miller',
    card: 'National Bank',
    imageUri: 'https://i.pravatar.cc/100?img=9',
  },
  {
    id: '9',
    name: 'Sophia Wilson',
    card: 'Credit Card',
    imageUri: 'https://i.pravatar.cc/100?img=10',
  },
  {
    id: '10',
    name: 'Liam Anderson',
    card: 'National Bank',
    imageUri: 'https://i.pravatar.cc/100?img=11',
  },
];

export const AddReferenceScreen = ({ navigation }: any) => {
  const isSmallScreen = height < 700;
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
          placeholderTextColor={'gray'}
        />
      </View>
      <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CustomReferenceContact data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
