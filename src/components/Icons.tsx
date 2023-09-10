import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';
import colors from 'theme/colors';

const VerifiedBadgeIcon = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <Path
      fill="#056DFA"
      fillOpacity={0.75}
      d="m6.315.17 1.153 1.28L9.132.939l.385 1.665 1.664.384-.512 1.665 1.28 1.152-1.28 1.153.512 1.665-1.664.384-.385 1.665-1.664-.513-1.153 1.28-1.152-1.28-1.665.513-.384-1.665-1.665-.384.512-1.665-1.28-1.153 1.28-1.152-.512-1.665 1.665-.384.384-1.665 1.665.513L6.315.17Z"
    />
    <Path
      fill="#fff"
      d="M9.03 3.397 5.547 6.88 4.113 5.446l-.717.717 2.151 2.151 4.2-4.2-.717-.717Z"
    />
  </Svg>
);
const CaretDownIcon = (props: SvgProps) => (
  <Svg width={10} height={5.68} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M4.94 5.684a.94.94 0 0 1-.667-.276L.276 1.41a.942.942 0 0 1 0-1.333C.453-.098-.052.174.198.174s.609-.176.785 0h8.111c.177-.176.26-.096.509-.096-.177-.176.25 0 0 0a.942.942 0 0 1 0 1.333L5.606 5.408a.939.939 0 0 1-.667.276Z"
    />
  </Svg>
);

const AvatarEditIcon = (props: SvgProps) => (
  <Svg width={100} height={107} fill="none" {...props}>
    <Path
      fill="#979797"
      d="M57.258 67.921a24.743 24.743 0 1 0-30.598 0 41.238 41.238 0 0 0-25.65 33.732 4.15 4.15 0 0 0 8.248.908 32.99 32.99 0 0 1 65.567 0 4.124 4.124 0 0 0 4.124 3.67h.453a4.125 4.125 0 0 0 3.63-4.536 41.237 41.237 0 0 0-25.774-33.774Zm-15.299-2.927a16.494 16.494 0 1 1 0-32.989 16.494 16.494 0 0 1 0 32.989Z"
    />
    <Path
      fill="#979797"
      d="M66.007 36.658h9.503a2.242 2.242 0 0 0 1.591-.65l15.51-15.533 6.366-6.23a2.243 2.243 0 0 0 0-3.183l-9.503-9.615a2.242 2.242 0 0 0-3.183 0L79.97 7.79 64.415 23.322a2.243 2.243 0 0 0-.65 1.591v9.503a2.241 2.241 0 0 0 2.241 2.242Zm21.875-30.46 6.343 6.343-3.182 3.183L84.7 9.38l3.182-3.183ZM68.248 25.832l13.291-13.29 6.343 6.342-13.29 13.291h-6.344v-6.343Z"
    />
  </Svg>
);

const WarningIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512" width={48} height={48} {...props}>
    <Path
      fill="none"
      stroke="red"
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
    />
    <Path
      stroke="red"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M250.26 166.05 256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6z"
    />
    <Path fill="red" d="M256 367.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20z" />
  </Svg>
);

export const CrossIcon = (props: SvgProps) => (
  <Svg className="ionicon" viewBox="0 0 512 512" width={32} height={32} {...props}>
    <Path
      fill={props.color || 'black'}
      stroke={props.color || 'black'}
      strokeWidth={32}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M368 368 144 144m224 0L144 368"
    />
  </Svg>
);

const CopyIcon = (props: SvgProps) => (
  <Svg width={18} height={14} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M7.09 2.063c-.236 0-.461.073-.628.202a.621.621 0 0 0-.26.486v.344a.31.31 0 0 1-.129.243.515.515 0 0 1-.313.1.515.515 0 0 1-.314-.1.31.31 0 0 1-.13-.243v-.344c0-.365.187-.715.52-.973.332-.258.783-.403 1.253-.403h.443c.118 0 .23.037.313.101a.31.31 0 0 1 .13.243.31.31 0 0 1-.13.244.515.515 0 0 1-.313.1H7.09Zm-.887 6.19c0 .183.093.358.26.487.166.129.391.201.626.201h.443c.118 0 .23.036.313.1a.31.31 0 0 1 .13.244.31.31 0 0 1-.13.243.515.515 0 0 1-.313.1H7.09c-.47 0-.92-.144-1.253-.402-.333-.258-.52-.608-.52-.973V7.91a.31.31 0 0 1 .13-.243.515.515 0 0 1 .314-.1c.117 0 .23.036.313.1a.31.31 0 0 1 .13.243v.344Zm0-3.782a.31.31 0 0 0-.13-.244.515.515 0 0 0-.313-.1.515.515 0 0 0-.314.1.31.31 0 0 0-.13.244v2.063a.31.31 0 0 0 .13.243c.084.065.196.1.314.1.117 0 .23-.035.313-.1a.31.31 0 0 0 .13-.243V4.47Zm7.976-2.408c.235 0 .46.073.626.202a.62.62 0 0 1 .26.486v.344a.31.31 0 0 0 .13.243c.083.065.195.1.313.1.117 0 .23-.035.313-.1a.31.31 0 0 0 .13-.243v-.344c0-.365-.187-.715-.52-.973-.332-.258-.782-.403-1.252-.403h-.444a.515.515 0 0 0-.313.101.31.31 0 0 0-.13.243.31.31 0 0 0 .13.244c.083.064.196.1.313.1h.444Zm0 6.878c.235 0 .46-.072.626-.201a.62.62 0 0 0 .26-.487V7.91a.31.31 0 0 1 .13-.243.515.515 0 0 1 .313-.1c.117 0 .23.036.313.1a.31.31 0 0 1 .13.243v.344c0 .365-.187.715-.52.973-.332.258-.782.403-1.252.403h-.444a.515.515 0 0 1-.313-.1.31.31 0 0 1-.13-.244.31.31 0 0 1 .13-.243.515.515 0 0 1 .313-.1h.444Zm1.329-4.814a.515.515 0 0 0-.313.1.31.31 0 0 0-.13.244v2.063a.31.31 0 0 0 .13.243c.083.065.195.1.313.1.117 0 .23-.035.313-.1a.31.31 0 0 0 .13-.243V4.47a.31.31 0 0 0-.13-.244.515.515 0 0 0-.313-.1ZM9.305 1.375a.515.515 0 0 0-.314.101.31.31 0 0 0-.13.243.31.31 0 0 0 .13.244c.083.064.196.1.314.1h2.658c.118 0 .23-.036.313-.1a.31.31 0 0 0 .13-.244.31.31 0 0 0-.13-.243.515.515 0 0 0-.313-.1H9.305Zm-.444 7.91a.31.31 0 0 1 .13-.243.515.515 0 0 1 .314-.1h2.658c.118 0 .23.035.313.1a.31.31 0 0 1 .13.243.31.31 0 0 1-.13.243.515.515 0 0 1-.313.1H9.305a.515.515 0 0 1-.314-.1.31.31 0 0 1-.13-.243ZM3.544 4.127h.887v4.47c0 .456.233.894.648 1.216.416.322.98.504 1.567.504h5.76v.688c0 .364-.187.714-.519.972s-.783.403-1.253.403h-5.76c-.823 0-1.612-.254-2.194-.705-.581-.452-.908-1.064-.908-1.702v-4.47c0-.366.187-.716.52-.973.331-.258.782-.403 1.252-.403Z"
    />
  </Svg>
);

const PlasticIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Rect width={12} height={12} y={13} fill={props.color} rx={1} />
    <Rect width={12} height={12} y={13} fill={props.color} rx={1} />
    <Rect width={12} height={12} x={15} y={13} fill={props.color} rx={1} />
    <Rect width={12} height={12} x={15} y={13} fill={props.color} rx={1} />
    <Rect width={6} height={6} x={3} y={16} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={3} y={16} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={3} y={16} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={18} y={16} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={18} y={16} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={18} y={16} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={3} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={3} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={3} fill={props.color} rx={1} />
    <Rect width={6} height={6} x={18} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={18} fill="#fff" rx={1} />
    <Rect width={6} height={6} x={18} fill={props.color} rx={1} />
  </Svg>
);

const LeaderBoardIcon = (props: SvgProps) => (
  <Svg width={29} height={24} fill="none" {...props}>
    <Path
      fill={props.color || '#FF9134'}
      d="M1.601 20.547 12.374.677l14.311 19.645c.963 1.322.019 3.178-1.616 3.178H3.359c-1.515 0-2.48-1.62-1.758-2.953Z"
    />
  </Svg>
);

const ArrowLeftIcon = (props: SvgProps) => (
  <Svg width={23} height={16} fill="none" {...props}>
    <Path
      fill={props.color || '#000'}
      d="M21.015 9a1 1 0 1 0 0-2v2ZM.308 7.293a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L2.429 8l5.657-5.657A1 1 0 0 0 6.67.93L.308 7.293ZM21.015 7h-20v2h20V7Z"
    />
  </Svg>
);

const TickIcon = (props: SvgProps) => (
  <Svg width={23} height={19} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={5}
      d="m2.699 11.456 6.653 4.839c.288.209.69.15.904-.134l9.719-12.854"
    />
  </Svg>
);

const ApprovedCircleIcon = (props: SvgProps) => (
  <Svg width={181} height={181} fill="none" {...props}>
    <Path
      stroke="#52C3FF"
      strokeLinecap="round"
      strokeWidth={9}
      d="m63.5 96.5 20.412 14.845a2 2 0 0 0 2.772-.411L116.5 71.5"
    />
    <Rect width={179} height={179} x={1} y={1} stroke="#52C3FF" strokeWidth={2} rx={89.5} />
  </Svg>
);

const MomentsIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 28h3.5a3.5 3.5 0 0 0 3.5-3.5V21m0-10V7.5A3.5 3.5 0 0 0 24.5 4H21M11 28H7.5A3.5 3.5 0 0 1 4 24.5V21m0-10V7.5A3.5 3.5 0 0 1 7.5 4H11M15.75 9v13.5m6.75-6.75H9"
    />
  </Svg>
);

const QrCodeIcon = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path fill="#fff" d="M4.645 4.851h2.716v2.716H4.645V4.851Z" />
    <Path
      fill="#fff"
      d="M.571 11.642V.777h10.864v10.865H.571Zm2.716-8.149v5.432H8.72V3.493H3.287ZM14.152 14.358h4.074v2.716h-4.074v-2.716Z"
    />
    <Path
      fill="#fff"
      d="M18.226 17.074h2.716v-2.716h4.074v4.074h-4.074v1.358H22.3v1.358h2.716v4.074H22.3v-2.716h-2.716v2.716h-5.432V19.79h2.716v2.716h1.358v-5.432ZM20.942 4.851h-2.716v2.716h2.716V4.851Z"
    />
    <Path
      fill="#fff"
      d="M14.152.777v10.865h10.864V.777H14.152ZM22.3 3.493v5.432h-5.432V3.493H22.3ZM4.645 18.432h2.716v2.716H4.645v-2.716Z"
    />
    <Path
      fill="#fff"
      d="M.571 25.222V14.358h10.864v10.864H.571Zm2.716-8.148v5.432H8.72v-5.432H3.287Z"
    />
  </Svg>
);

const TrashIcon = (props: SvgProps) => (
  <Svg width={22} height={25} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M20.683 4.867h-4.866V3.65A3.65 3.65 0 0 0 12.167 0H9.733a3.65 3.65 0 0 0-3.65 3.65v1.217H1.217a1.217 1.217 0 1 0 0 2.433h1.216v13.383a3.65 3.65 0 0 0 3.65 3.65h9.734a3.65 3.65 0 0 0 3.65-3.65V7.3h1.216a1.216 1.216 0 1 0 0-2.433ZM8.517 3.65a1.217 1.217 0 0 1 1.216-1.217h2.434a1.217 1.217 0 0 1 1.216 1.217v1.217H8.517V3.65Zm8.516 17.033a1.216 1.216 0 0 1-1.216 1.217H6.083a1.217 1.217 0 0 1-1.216-1.217V7.3h12.166v13.383Z"
    />
  </Svg>
);

const TakePhotoIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeWidth={1.88}
      d="M1.142 9.151A3.122 3.122 0 0 1 4.264 6.03c.994 0 1.921-.496 2.472-1.323l.234-.35A3.18 3.18 0 0 1 9.615 2.94h1.53c.944 0 1.839.42 2.443 1.144l.722.866a3 3 0 0 0 2.304 1.08h.065a3.18 3.18 0 0 1 3.18 3.179v7.208a3.18 3.18 0 0 1-3.18 3.18H4.321a3.18 3.18 0 0 1-3.179-3.18V9.151Z"
    />
    <Path
      fill="#fff"
      d="M9.357 16.185V7.709h1.687v8.476H9.357Zm-3.391-3.398v-1.686h8.476v1.686H5.966Z"
    />
  </Svg>
);

const ScanQrCodeIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M0 3.111A3.111 3.111 0 0 1 3.111 0h5.445c.43 0 .777.348.777.778v1.555c0 .43-.348.778-.777.778H3.889a.778.778 0 0 0-.778.778v4.667c0 .43-.348.777-.778.777H.778A.778.778 0 0 1 0 8.556V3.11ZM28 3.111A3.111 3.111 0 0 0 24.889 0h-5.445a.778.778 0 0 0-.777.778v1.555c0 .43.348.778.777.778h4.667c.43 0 .778.348.778.778v4.667c0 .43.348.777.778.777h1.555c.43 0 .778-.348.778-.777V3.11ZM24.889 28A3.111 3.111 0 0 0 28 24.889v-5.445a.778.778 0 0 0-.778-.777h-1.555a.778.778 0 0 0-.778.777v4.667c0 .43-.348.778-.778.778h-4.667a.778.778 0 0 0-.777.778v1.555c0 .43.348.778.777.778h5.445ZM0 24.889A3.111 3.111 0 0 0 3.111 28h5.445c.43 0 .777-.348.777-.778v-1.555a.778.778 0 0 0-.777-.778H3.889a.778.778 0 0 1-.778-.778v-4.667a.778.778 0 0 0-.778-.777H.778a.778.778 0 0 0-.778.777v5.445ZM27.222 15.556c.43 0 .778-.349.778-.778v-1.556a.778.778 0 0 0-.778-.778H.778a.778.778 0 0 0-.778.778v1.556c0 .43.348.778.778.778h26.444Z"
    />
  </Svg>
);

const SmallVerifiedCircleIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fill="#056DFA"
      stroke="#fff"
      d="m7.197 10.136.354.354.353-.354 3.088-3.087c.105-.106.24-.106.347 0 .106.106.106.241 0 .347L7.724 11.01c-.106.106-.24.106-.347 0L5.721 9.354c-.106-.106-.106-.241 0-.347.106-.106.24-.106.347 0l1.13 1.13ZM8.53 1C4.112 1 .5 4.612.5 9.03c0 4.417 3.612 8.03 8.03 8.03 4.417 0 8.03-3.613 8.03-8.03C16.56 4.612 12.946 1 8.53 1Z"
    />
  </Svg>
);

export const BottomNavigationIcons: { [key in string]: (props: SvgProps) => React.JSX.Element } = {
  PlasticStack: () => <PlasticIcon color={colors.smokeGray} />,
  MomentsStack: () => <MomentsIcon color={colors.smokeGray} />,
  LeaderBoard: () => <LeaderBoardIcon color={colors.smokeGray} />,
  ProfileStack: () => (
    <View className="h-8 w-8  rounded-full bg-smokeGray border-2 border-transparent" />
  ),
};

export const BottomNavigationFilledIcons: {
  [key in string]: (props: SvgProps) => React.JSX.Element;
} = {
  LeaderBoard: () => <LeaderBoardIcon color={colors.saffron} />,
  PlasticStack: () => <PlasticIcon color={colors.saffron} />,
  ProfileStack: () => (
    <View className="h-8 w-8 rounded-full bg-smokeGray border-2 border-saffron" />
  ),
  MomentsStack: () => <MomentsIcon color={colors.saffron} />,
};

export default {
  TickIcon,
  CopyIcon,
  TrashIcon,
  CrossIcon,
  QrCodeIcon,
  PlasticIcon,
  WarningIcon,
  TakePhotoIcon,
  ArrowLeftIcon,
  CaretDownIcon,
  AvatarEditIcon,
  ScanQrCodeIcon,
  VerifiedBadgeIcon,
  ApprovedCircleIcon,
  SmallVerifiedCircleIcon,
};
