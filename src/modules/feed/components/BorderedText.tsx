import { PropsWithChildren } from 'react';
import { Svg, Text as T } from 'react-native-svg';

const BorderedText = ({ children }: PropsWithChildren) => (
  <Svg height="64" width="68">
    <T fill="none" stroke="white" strokeWidth={2} fontSize="60" x="68" y="60" textAnchor="end">
      {children}
    </T>
  </Svg>
);

export default BorderedText;
