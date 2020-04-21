import React from 'react';
import { Svg, G } from 'react-native-svg';

import Subtree from './Subtree';
import Node from './Node';
import { TreeProps, Position, FamilyNode } from '../type';

const PADDING = 20;
const NODE_WIDTH = 100;
const NODE_HEIGHT = 30;
const VERTICAL_INTERVAL = 10;
const HORIZONTAL_INTERVAL = 10;
const COLORS: readonly string[] = ['#4FC3F7', '#F7F895'];

const Tree: React.FC<TreeProps> = ({ tree, move }) => {
  const root: Position<FamilyNode> = tree.root()!;
  const SVG_HEIGHT =
    tree.height() * (VERTICAL_INTERVAL + NODE_HEIGHT) +
    PADDING * 2 +
    NODE_HEIGHT;
  const SVG_WIDTH = tree.calculateSubtreeWidth(
    root,
    NODE_WIDTH,
    HORIZONTAL_INTERVAL
  );
  const rootX = tree.calculateRootX(NODE_WIDTH, HORIZONTAL_INTERVAL, PADDING);
  return (
    <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      <G>
        <Node
          position={root}
          x={rootX}
          y={PADDING}
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          color={COLORS[0]}
          move={move}
        />
        {/* <Subtree
          tree={tree}
          position={root}
          move={move}
          x={rootX}
          y={PADDING}
          nodeWidth={NODE_WIDTH}
          nodeHeight={NODE_HEIGHT}
          verticalInterval={VERTICAL_INTERVAL}
          horizontalInterval={HORIZONTAL_INTERVAL}
          colors={COLORS}
        />*/}
      </G>
    </Svg>
  );
};

export default Tree;
