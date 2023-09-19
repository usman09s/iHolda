import { PropsWithChildren } from 'react';
import { Svg, Text as T } from 'react-native-svg';

const BorderedText = ({ children, size = 60 }: PropsWithChildren & { size?: number }) => (
  <Svg height={(64 * size) / 60} width={(82 * size) / 60}>
    <T
      fill="none"
      stroke="white"
      strokeWidth={2}
      fontSize={size}
      x={(81 * size) / 60}
      y={size}
      textAnchor="end">
      {children}
    </T>
  </Svg>
);

export default BorderedText;
