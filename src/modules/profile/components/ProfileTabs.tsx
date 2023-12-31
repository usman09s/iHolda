import { Pressable, Text, View } from 'react-native';
import colors from 'theme/colors';
import { text } from 'theme/text';
import { units, width } from 'utils/helpers';

type Props = {
  activeIndex: number;
  isCurrentUser: boolean;
  onPressTabItem: (value: number) => () => void;
};

type ProfileTabITemProps = {
  title: string;
  isActive?: boolean;
  onPressTabItem: () => void;
};

const ProfileTabItem = ({ title, isActive, onPressTabItem }: ProfileTabITemProps) => (
  <Pressable
    style={{
      width: width / 4,
      borderBottomWidth: isActive ? 1 : 0,
      borderBottomColor: colors.saffron,
    }}
    onPress={onPressTabItem}
    className="justify-center items-center">
    <Text className={text({ type: 'r13', class: isActive ? 'text-saffron' : 'text-black-o-50' })}>
      {title}
    </Text>
  </Pressable>
);

const ProfileTabs = ({ activeIndex, onPressTabItem, isCurrentUser }: Props) => (
  <View
    className="flex-row  border-b-b1 bg-white border-black-o-10  w-full"
    style={{ height: units.vh * 8 }}>
    <ProfileTabItem
      title="Profile"
      onPressTabItem={onPressTabItem(0)}
      isActive={activeIndex === 0}
    />
    <ProfileTabItem
      title="Community"
      isActive={activeIndex === 1}
      onPressTabItem={onPressTabItem(1)}
    />
    <ProfileTabItem title="Work" onPressTabItem={onPressTabItem(2)} isActive={activeIndex === 2} />
    {isCurrentUser ? (
      <ProfileTabItem
        title="Wallet"
        onPressTabItem={onPressTabItem(3)}
        isActive={activeIndex === 3}
      />
    ) : (
      <ProfileTabItem
        title="Shared"
        onPressTabItem={onPressTabItem(4)}
        isActive={activeIndex === 4}
      />
    )}
  </View>
);

export default ProfileTabs;
