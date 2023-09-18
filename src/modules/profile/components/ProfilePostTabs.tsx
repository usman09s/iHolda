import { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';
import Icons from 'components/Icons';

type Props = {
  index: number;
  activeIndex: number;
  onPressTabItem: (val: number) => () => void;
};

const ItemContainer = ({
  index,
  children,
  activeIndex,
  onPressTabItem,
}: PropsWithChildren & Props) => (
  <Pressable
    onPress={onPressTabItem(index)}
    className={'flex-1 justify-center items-center  py-2'}
    style={{
      borderBottomWidth: activeIndex === index ? 1 : 0,
    }}>
    {children}
  </Pressable>
);

const ProfilePostTabs = ({ activeIndex, onPressTabItem }: Omit<Props, 'index'>) => (
  <View className="justify-between flex-row mb-4 mt-5">
    <ItemContainer onPressTabItem={onPressTabItem} activeIndex={activeIndex} index={0}>
      <Icons.SmilingFacesIcon />
    </ItemContainer>
    <ItemContainer onPressTabItem={onPressTabItem} activeIndex={activeIndex} index={1}>
      <Icons.NineDotsIcon />
    </ItemContainer>
    <ItemContainer onPressTabItem={onPressTabItem} activeIndex={activeIndex} index={2}>
      <Icons.BookMarkIconProfile />
    </ItemContainer>
  </View>
);

export default ProfilePostTabs;
