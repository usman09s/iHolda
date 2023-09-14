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
