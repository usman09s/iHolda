import { Insets } from 'react-native';

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
  if (!url) {
    return 'png';
  }

  return url.split('.')?.[1];
};
