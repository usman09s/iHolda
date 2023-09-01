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

export default {
  VerifiedBadgeIcon,
};
