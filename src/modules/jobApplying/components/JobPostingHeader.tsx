import { Image, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from 'components/Header/Header';
import Icons from 'components/Icons';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { getHitSlop, units } from 'utils/helpers';

type Props = {
  goBack: () => void;
  onSave: () => void;
};

const JobPostingHeader = ({ goBack, onSave }: Props) => (
  <View className="z-10">
    <View className="absolute w-full z-30 px-4">
      <Header
        leftComponent={
          <Pressable
            onPress={goBack}
            hitSlop={getHitSlop({ value: 20 })}
            className="bg-white p-1.5 rounded-full w-10 h-10 justify-center items-center z-20">
            <Icons.ArrowLeftIcon />
          </Pressable>
        }
        rightComponent={
          <View className="bg-white p-1.5 rounded-full w-10 h-10 justify-center items-center">
            <Icons.HeartIcon color={'black'} />
          </View>
        }
      />
    </View>
    <Image
      source={{ uri: 'https://i.pravatar.cc/1024?img=2' }}
      style={{ width: '100%', height: units.vh * 50 }}
    />
    <LinearGradient
      colors={[
        colors['black-o-025'],
        colors['black-o-20'],
        colors['black-o-30'],
        colors['black-o-40'],
      ]}
      locations={[0, 0.1, 0.6, 1]}
      className="items-center justify-between flex-row absolute w-full bottom-0 px-4 pb-2">
      <View>
        <Text className={text({ type: 'b24', class: 'text-white' })}>Cleaner needed</Text>
        <Text className={text({ type: 'r16', class: 'text-white' })}>in Buea</Text>
      </View>
      <Pressable onPress={onSave} className="items-center justify-center">
        <Icons.ShareIcon className="mb-4" />
        <Icons.BookmarkIcon />
      </Pressable>
    </LinearGradient>
  </View>
);

export default JobPostingHeader;
