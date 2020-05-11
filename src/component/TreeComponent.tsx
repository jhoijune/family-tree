import React, { useEffect } from 'react';
import { G } from 'react-native-svg';

import SubtreeComponent from './SubtreeComponent';
import Node from './Node';
import { TreeComponentProps } from '../type';

const TreeComponent: React.FC<TreeComponentProps> = ({
  treeObj,
  setTreeElement,
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
    setTreeElement(
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
        <SubtreeComponent
          treeObj={treeObj}
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

  return null;
};

export default TreeComponent;
