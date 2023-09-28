import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from 'components/Button';
import { text } from 'theme/text';

import JobDetailOptionItemContainer from '../components/JobDetailOptionItemContainer';
import { useDateTimePicker } from '../hooks/useDateTimePicker';

const StartDateAndTime = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    dateTime,
    onPressToday,
    showIOSPicker,
    showDatePicker,
    showTimePicker,
    onPressTomorrow,
    setShowIOSPicker,
    selectedDateOption,
    selectedTimeOption,
    datetimePickerMode,
    handleDateTimeChange,
    setSelectedTimeOption,
  } = useDateTimePicker();

  return (
    <View>
      <Text className={text({ type: 'm14', class: 'mb-5 text-center' })}>Date</Text>
      <View className="flex-row justify-between">
        <JobDetailOptionItemContainer
          title="Today"
          itemCount={3}
          onPressItem={onPressToday}
          isSelected={selectedDateOption === 'today'}
        />
        <View className="w-2" />
        <JobDetailOptionItemContainer
          itemCount={3}
          title="Tomorrow"
          onPressItem={onPressTomorrow}
          isSelected={selectedDateOption === 'tomorrow'}
        />
        <View className="w-2" />
        <JobDetailOptionItemContainer
          itemCount={3}
          onPressItem={showDatePicker}
          isSelected={selectedDateOption === 'calendar'}
          title={selectedDateOption === 'calendar' ? dateTime.format('DD/MM/YYYY') : 'Calendar'}
        />
      </View>
      <Text className={text({ type: 'm14', class: 'my-5 text-center' })}>Work start time</Text>
      <View className="flex-wrap flex-row justify-between items-center">
        <JobDetailOptionItemContainer
          title="Asap"
          isSelected={selectedTimeOption === 'asap'}
          onPressItem={() => setSelectedTimeOption('asap')}
        />
        <JobDetailOptionItemContainer
          isBig
          onPressItem={() => showTimePicker()}
          isSelected={selectedTimeOption === 'time'}
          title={
            selectedTimeOption === 'time' ? dateTime.format('hh:mmA')?.toLowerCase() : 'Custom Time'
          }
        />
      </View>
      <Modal visible={showIOSPicker} transparent>
        <Pressable
          onPress={() => setShowIOSPicker(false)}
          className="flex-1 justify-end items-end bg-black-o-50 w-full">
          <Pressable
            onPress={() => null}
            className="bg-white w-full"
            style={{ paddingBottom: bottom || 16 }}>
            <DateTimePicker
              display="spinner"
              themeVariant="light"
              value={dateTime.toDate()}
              mode={datetimePickerMode.current}
              onChange={handleDateTimeChange}
            />
            <Button
              title="Done"
              customContainer="px-8 py-2 self-center"
              onPress={() => setShowIOSPicker(false)}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default StartDateAndTime;
