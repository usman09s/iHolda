import { Text, View } from 'react-native';
import { text } from 'theme/text';

const StatsItem = ({ title, subTitle }: { title: string; subTitle: string }) => (
  <View>
    <Text className={text({ type: 'm13', class: 'text-center' })}>{title}</Text>
    <Text className={text({ type: 'r13', class: 'text-center' })}>{subTitle}</Text>
  </View>
);

type Props = {
  followers: string;
  metPeople: string;
  impression: string;
  description: string;
};

const ProfileDescriptionAndStats = ({ followers, metPeople, impression, description }: Props) => (
  <>
    <Text className={text({ type: 'r12', class: 'leading-4 px-4 py-4' })}>{description}</Text>
    <View className="border-[0.5px] border-black-o-10" />
    <View className="flex-row py-4 justify-between px-4">
      <StatsItem title={followers} subTitle="Followers" />
      <StatsItem title={'Met'} subTitle={metPeople} />
      <StatsItem title={impression} subTitle="impressions" />
    </View>
  </>
);

export default ProfileDescriptionAndStats;
