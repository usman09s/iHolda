import { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

export const useDateTimePicker = () => {
  const datetimePickerMode = useRef('time');
  const [dateTime, setDateTime] = useState(dayjs());
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const [selectedDateOption, setSelectedDateOption] = useState<'today' | 'tomorrow' | 'calendar'>(
    'today',
  );
  const [selectedTimeOption, setSelectedTimeOption] = useState<'asap' | 'time'>('asap');

  const handleDateTimeChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    const newDateTime = dayjs(date);
    if (datetimePickerMode.current === 'time') {
      setDateTime(
        dateTime
          .clone()
          .set('hour', newDateTime.get('hour'))
          .set('minutes', newDateTime.get('minute')),
      );

      return;
    }
    setDateTime(
      dateTime
        .clone()
        .set('month', newDateTime.get('month'))
        .set('date', newDateTime.get('date'))
        .set('year', newDateTime.get('year')),
    );
  };

  const showMode = () => {
    if (Platform.OS === 'ios') {
      setShowIOSPicker(true);

      return;
    }
    DateTimePickerAndroid.open({
      is24Hour: true,
      value: dateTime.toDate(),
      onChange: handleDateTimeChange,
      mode: datetimePickerMode.current,
    });
  };

  const showDatePicker = () => {
    setSelectedDateOption('calendar');
    datetimePickerMode.current = 'date';
    showMode();
  };

  const showTimePicker = () => {
    setSelectedTimeOption('time');
    datetimePickerMode.current = 'time';
    showMode();
  };

  const onPressToday = () => {
    setSelectedDateOption('today');
    setDateTime(dayjs());
  };

  const onPressTomorrow = () => {
    setSelectedDateOption('tomorrow');
    setDateTime(dayjs().add(1, 'day'));
  };

  return {
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
  };
};
