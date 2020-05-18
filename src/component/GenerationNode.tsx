import React from 'react';
import { G, Rect, Text } from 'react-native-svg';

import { GenerationNodeProps } from '../type';
import { treeSetting } from '../setting';

const GenerationNode: React.FC<GenerationNodeProps> = ({ children, y }) => {
  const { nodeWidth, nodeHeight } = treeSetting;
  return (
    <G>
      <Rect y={y} width={nodeWidth} height={nodeHeight} fill={'#F6F6BA'} />
      <Text
        x={3}
        y={y + nodeHeight / 2 + 2}
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
