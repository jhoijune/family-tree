import React from 'react';
import { G, Rect, Text } from 'react-native-svg';

import { GenerationNodeProps } from '../type';

const GenerationNode: React.FC<GenerationNodeProps> = ({
  children,
  y,
  width,
  height,
}) => {
  return (
    <G>
      <Rect y={y} width={width} height={height} fill={'#F6F6BA'} />
      <Text
        x={3}
        y={y + height / 2 + 2}
        fill={'#000'}
        fontSize={6}
        fontWeight="bold"
        textAnchor="start">
        {children}
      </Text>
    </G>
  );
};

export default GenerationNode;
