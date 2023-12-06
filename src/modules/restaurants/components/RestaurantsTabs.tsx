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
      width: width / 3,
      borderBottomWidth: isActive ? 1 : 0,
      borderBottomColor: "#31bf4f",
    }}
    onPress={onPressTabItem}
    className="justify-center items-center">
    <Text className={text({ type: 'r13', class: isActive ? 'text-[#31bf4f]' : 'text-black-o-50' })}>
      {title}
    </Text>
  </Pressable>
);

const RestaurantsTabs = ({ activeIndex, onPressTabItem, isCurrentUser }: Props) => (
  <View
    className="flex-row  border-b-b1 bg-white border-black-o-10  w-full"
    style={{ height: units.vh * 8 }}>
    <ProfileTabItem
      title="Overview"
      onPressTabItem={onPressTabItem(0)}
      isActive={activeIndex === 0}
    />
    <ProfileTabItem title="Menu" isActive={activeIndex === 1} onPressTabItem={onPressTabItem(1)} />
    <ProfileTabItem
      title="Reviews"
      onPressTabItem={onPressTabItem(2)}
      isActive={activeIndex === 2}
    />
  </View>
);

export default RestaurantsTabs;
