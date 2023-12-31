import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';
import { text } from 'theme/text';

const StatsItem = ({
  title,
  subTitle,
  onPress,
}: {
  title: string;
  subTitle: string;
  onPress: any;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text className={text({ type: 'm13', class: 'text-center' })}>{title}</Text>
    <Text className={text({ type: 'r13', class: 'text-center' })}>{subTitle}</Text>
  </TouchableOpacity>
);

type Props = {
  followers: string;
  metPeople: string;
  impression: string;
  description: string;
};

const ProfileDescriptionAndStats = ({ followers, metPeople, impression, description }: Props) => {
  const navigation = useNavigation();
  return (
    <>
      <Text className={text({ type: 'r12', class: 'leading-4 px-4 py-4' })}>{description}</Text>
      <View className="border-[0.5px] border-black-o-10" />
      <View className="flex-row py-4 justify-between px-4">
        <StatsItem
          onPress={() => navigation.navigate('Followers', { index: 0 })}
          title={followers}
          subTitle="Followers"
        />
        <StatsItem
          onPress={() => navigation.navigate('Followers', { index: 1 })}
          title={'Met'}
          subTitle={metPeople}
        />
        <StatsItem
          title={impression}
          subTitle="impressions"
        />
      </View>
    </>
  );
};

export default ProfileDescriptionAndStats;
