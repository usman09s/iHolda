import { Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units, width } from 'utils/helpers';

type Props = {
  activeIndex: number;
  tabs: string[];
  onPressTabItem: (value: number) => () => void;
};

type JobTabItemProps = {
  title: string;
  tabsCount: number;
  isActive?: boolean;
  onPressTabItem: () => void;
};

const JobTabItem = ({ title, isActive, onPressTabItem, tabsCount = 1 }: JobTabItemProps) => (
  <Pressable
    style={{
      width: width / tabsCount,
      borderBottomWidth: isActive ? 2 : 0,
      borderBottomColor: 'black',
    }}
    onPress={onPressTabItem}
    className="justify-center items-center">
    <Text className={text({ type: 'm13', class: isActive ? 'text-black' : 'text-black-o-50' })}>
      {title}
    </Text>
  </Pressable>
);

const JobTabs = ({ activeIndex, onPressTabItem, tabs = [] }: Props) => (
  <View
    className="flex-row  border-b-b1 bg-white border-black-o-10  w-full"
    style={{ height: units.vh * 5 }}>
    {tabs.map((tab, index) => (
      <JobTabItem
        title={tab}
        key={`${tab}-${index}`}
        tabsCount={tabs.length}
        isActive={activeIndex === index}
        onPressTabItem={onPressTabItem(index)}
      />
    ))}
  </View>
);

export default JobTabs;
