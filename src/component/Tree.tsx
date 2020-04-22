import React, { useEffect } from 'react';
import { View } from 'react-native';
import { G } from 'react-native-svg';
import Subtree from './Subtree';
import Node from './Node';
import { TreeProps } from '../type';

const Tree: React.FC<TreeProps> = ({
  tree,
  setTree,
  selectedPositions,
  root,
  rootX,
  padding,
  nodeWidth,
  nodeHeight,
  colors,
  move,
  verticalInterval,
  horizontalInterval,
}) => {
  useEffect(() => {
    setTree(
      <G>
        <Node
          position={root}
          x={rootX}
          y={padding}
          width={nodeWidth}
          height={nodeHeight}
          color={colors[0]}
          move={move}
          selectedPositions={selectedPositions}
        />
        <Subtree
          tree={tree}
          position={root}
          move={move}
          x={rootX}
          y={padding}
          nodeWidth={nodeWidth}
          nodeHeight={nodeHeight}
          verticalInterval={verticalInterval}
          horizontalInterval={horizontalInterval}
          colors={colors}
          selectedPositions={selectedPositions}
        />
      </G>
    );
  }, [selectedPositions]);

  return <View />;
};

export default Tree;
