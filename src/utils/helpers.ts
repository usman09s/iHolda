import { Dimensions, Insets } from 'react-native';

export const { width, height } = Dimensions.get('screen');

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
