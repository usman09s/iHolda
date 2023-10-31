/* eslint-disable indent */
import { Dimensions, Insets } from 'react-native';

export const { width, height } = Dimensions.get('screen');
export const windowSizes = Dimensions.get('window');

export const sW = width,
  sH = height,
  wW = windowSizes.width,
  wH = windowSizes.height;
export const getHitSlop = (
  params: Insets & { value?: number } = {
    value: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
): Insets | undefined => {
  const { value, top, left, right, bottom } = params;

  return {
    top: top || value,
    left: left || value,
    right: right || value,
    bottom: bottom || value,
  };
};

export const parseApiError = (error: { message: string } | unknown, field?: string) => {
  if (!error?.message) {
    return;
  }

  let errorText = '';

  try {
    const parsedMessage = JSON.parse(error.message);
    errorText = parsedMessage.details || parsedMessage.detail || (field && parsedMessage[field]);
  } catch {
    errorText = 'Try again';
  }

  return errorText;
};

export const getImageFormatFromUrl = (url: string | undefined): string => {
  if (url?.includes('.jpeg')) {
    return 'jpeg';
  }

  if (url?.includes('.jpg')) {
    return 'jpg';
  }

  if (url?.includes('.png')) {
    return 'png';
  }

  return 'png';
};

export const getHourWithTimeZone = (value: string): string => {
  if (!value) {
    return '';
  }

  const hour = value?.split(':')[0];
  const timeZone = Number(hour) < 12 ? 'am' : 'pm';

  return `${hour}${timeZone}`;
};

export const getFlexByRatio = (value: number) => {
  switch (value) {
    case 0.8:
      return 5;
    case 0.2:
      return 3;
    default:
      return 1;
  }
};

export const units = {
  vw: windowSizes.width / 100,
  vh: windowSizes.height / 100,
};

export const formatDateDifference = (dateString: string) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Average days in a month
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days > 6) {
    return `${Math.floor(days / 7)} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    return 'Today';
  }
};

export const deepEqual = (obj1: object, obj2: object) => {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const getStars = (point: number) => {
  const halfStarCount = (point / 0.5) % 2;
  const starCount = (point / 0.5 - halfStarCount) / 2;

  return {
    starCount: new Array(starCount).fill(''),
    halfStarCount: new Array(halfStarCount).fill(''),
  };
};

export const getMonthAndYear = (dateString: string) => {
  if (!dateString) {
    return '';
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];

  return `${month} ${year}`;
};

const daysMap = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export const formatDays = days => {
  const daysInOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const sortedDays = days.slice().sort((a, b) => daysInOrder.indexOf(a) - daysInOrder.indexOf(b));

  if (areDaysConsecutive(sortedDays, daysInOrder)) {
    return `${capitalizeFirstLetter(sortedDays[0])}-${daysMap[sortedDays[sortedDays.length - 1]]}`;
  }

  return sortedDays
    .map((day, index) => {
      const isLast = index === sortedDays.length - 1;
      const dayLabel = capitalizeFirstLetter(day);
      return isLast ? dayLabel : dayLabel + ', ';
    })
    .join('');
};

const areDaysConsecutive = (days, daysInOrder) => {
  for (let i = 0; i < days.length - 1; i++) {
    if (daysInOrder.indexOf(days[i + 1]) - daysInOrder.indexOf(days[i]) !== 1) {
      return false;
    }
  }
  return true;
};

const capitalizeFirstLetter = day => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (size: any) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: any) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: any, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
