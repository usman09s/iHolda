import { PropsWithChildren } from 'react';
import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LocationMarker } from 'components/Images';
import colors from 'theme/colors';
import { text } from 'theme/text';

type JobFeedItemDetailsBarProps = {
  caption: string;
};

const JobFeedItemDetailsBar = ({
  caption,
  children,
}: JobFeedItemDetailsBarProps & PropsWithChildren) => (
  <View className="absolute bottom-0 w-full">
    <LinearGradient
      colors={[
        colors['black-o-01'],
        colors['black-o-10'],
        colors['black-o-50'],
        colors['black-o-60'],
      ]}
      locations={[0, 0.1, 0.6, 1]}
      className="items-center z-20 px-4 pb-3 pt-2 w-full">
      <View className="pr-12 w-full ">
        <Text
          numberOfLines={2}
          className={text({
            type: 'b28',
            class: 'text-white text-start',
          })}>
          {caption}
        </Text>
      </View>
      <View className="flex-row items-center justify-between w-full mt-2.5">
        <View className="flex-row items-center">
          <View className="mr-4">
            <Text className={text({ type: 'r13', class: 'text-saffron mb-1' })}>Start time</Text>
            <Text className={text({ type: 'r14', class: 'text-white' })}>Asap</Text>
          </View>
          <View>
            <Text></Text>
            <View className="flex-row items-center">
              <Image source={LocationMarker} className="h-5 w-3 mr-1" resizeMode="contain" />
              <Text className={text({ type: 'r14', class: 'text-white' })}>Limbe, Cameron</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className={text({ type: 'r14', class: 'text-white text-center mb-1' })}>Asap</Text>
          <Text className={text({ type: 'b18', class: 'text-green-400' })}>5000Cfa</Text>
        </View>
      </View>
      {children}
    </LinearGradient>
  </View>
);

export default JobFeedItemDetailsBar;
