import { CommentUserAvatar } from 'components/Images';
import colors from 'theme/colors';

export const WelcomeComments = [
  {
    username: 'Bayuga',
    image: CommentUserAvatar,
    bgColor: colors.teaGreen,
    comment: 'Be part of your local community growth',
  },
  {
    username: 'Bayuga',
    image: CommentUserAvatar,
    bgColor: colors.lightGold,
    comment: 'Rescue plastics from your neighborhood and get rewarded instantly.',
  },
  {
    username: 'Bayuga',
    image: CommentUserAvatar,
    bgColor: colors.sunriseOrange,
    comment: 'Meet amazing people in your local community and share moments',
  },
];

// export const INITIAL_SELECTED_COUNTRY = {
//   phone: '+237',
//   name: 'Cameroon',
//   emoji: '\ud83c\udde8\ud83c\uddf2',
// };
export const INITIAL_SELECTED_COUNTRY = __DEV__
  ? {
      phone: '+92',
      name: 'Pakistan',
      emoji: '\ud83c\udde8\ud83c\uddf2',
      countryCode: 'PK',
    }
  : {
      phone: '+237',
      name: 'Cameroon',
      emoji: '\ud83c\udde8\ud83c\uddf2',
      countryCode: 'CM',
    };
export const CashAndPointsFixture = [
  {
    id: 1,
    cash: 0.8,
    point: 0.2,
  },
  {
    id: 2,
    cash: 0.5,
    point: 0.5,
  },
  {
    id: 3,
    cash: 0.2,
    point: 0.8,
  },
  { id: 4, cash: 0, point: 1 },
];
