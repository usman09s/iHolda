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

export default {
  CaretDownIcon,
  VerifiedBadgeIcon,
};
