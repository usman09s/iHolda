import { Platform, Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { DropOffLocationItemType } from 'types/PlasticTypes';
import { getHourWithTimeZone } from 'utils/helpers';

type Props = {
  location: DropOffLocationItemType;
  onPressLocation: () => void;
};

const DropOffLocationItem = ({ location, onPressLocation }: Props) => (
  <Pressable
    onPress={onPressLocation}
    className={`py-6 px-6 bg-white mb-5 rounded-xl ${Platform.select({
      android: 'shadow-xl',
      ios: 'shadow',
    })}`}>
    <View className="flex-row justify-between items-center">
      <View>
        <Text className={text({ type: 'r16' })}>{location?.name || ''}</Text>
        <Text className={text({ type: 'r12', class: 'text-black-o-70' })}>
          {location?.dropoffLocation.address || ''}
        </Text>
      </View>
      <Text
        className={text({
          type: 'r12',
          class: location?.state === 'Closed' ? 'text-red-500' : 'text-green-600',
        })}>
        {location?.isAvailable || ''}
      </Text>
    </View>
    <View className="flex-row justify-between mt-2">
      <Text className={text({ type: 'r10', class: 'text-black-o-60' })}>
        Open from {getHourWithTimeZone(location?.openingHour)} to{' '}
        {getHourWithTimeZone(location?.closingHour)}
      </Text>
      <Text>
        {location?.days[0]}-{location?.days[location?.days.length - 1]}
      </Text>
    </View>
  </Pressable>
);

export default DropOffLocationItem;
