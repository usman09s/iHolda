import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

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
      fill="black"
      stroke="black"
      strokeWidth={32}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M368 368 144 144m224 0L144 368"
    />
  </Svg>
);

export default {
  CrossIcon,
  WarningIcon,
  CaretDownIcon,
  AvatarEditIcon,
  VerifiedBadgeIcon,
};
