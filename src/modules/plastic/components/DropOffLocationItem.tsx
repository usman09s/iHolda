import { Platform, Pressable, Text, View } from 'react-native';
import { text } from 'theme/text';
import { DropOffLocationItemType } from 'types/PlasticTypes';
import { formatDays } from 'utils/helpers';

type Props = {
  location: DropOffLocationItemType;
  onPressLocation: () => void;
};

const DropOffLocationItem = ({ location, onPressLocation }: Props) => {
  const calculateDisplayHours = (openingHour: any, closingHour: any) => {
    const parseHour = (hour: any) => {
      const parts = hour.split(':');
      let hours = parseInt(parts[0]);
      if (hours > 12) {
        hours -= 12;
        return `${hours}pm`;
      } else if (hours === 12) {
        return `${hours}pm`;
      } else if (hours === 0) {
        return `12am`;
      } else {
        return `${hours}am`;
      }
    };
    const displayOpeningHour = parseHour(openingHour);
    const displayClosingHour = parseHour(closingHour);
    return `${displayOpeningHour} to ${displayClosingHour}`;
  };

  return (
    <Pressable
      onPress={onPressLocation}
      className={`py-6 px-6 bg-white mb-5 rounded-xl ${Platform.select({
        android: 'shadow-xl',
        ios: 'shadow',
      })}`}>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className={text({ type: 'r16' })}>{location?.name || ''}</Text>
        </View>
        <Text
          className={text({
            type: 'r12',
            class: location?.isAvailable ? 'text-green-600' : 'text-red-500',
          })}>
          {location?.isAvailable ? 'Open now' : 'Closed'}
        </Text>
      </View>
      <Text className={text({ type: 'r12', class: 'text-black-o-70' })}>
        {location?.dropoffLocation.address || ''}
      </Text>
      <View className="flex-row justify-between mt-2">
        <Text className={text({ type: 'r10', class: 'text-black-o-60' })}>
          Open from {calculateDisplayHours(location?.openingHour, location?.closingHour)}
        </Text>
        <Text className={text({ type: 'r10', class: 'text-black-o-60' })}>
          {formatDays(location?.days)}
        </Text>
      </View>
    </Pressable>
  );
};

export default DropOffLocationItem;
