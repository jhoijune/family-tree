import React, { useMemo, useState } from 'react';
import { View, Dimensions } from 'react-native';

import Tree from './Tree';
import TreeView from './TreeView';
import { TreeContainerProps, Position, FamilyNode } from '../type';

const PADDING = 20;
const NODE_WIDTH = 50;
const NODE_HEIGHT = 30;
const VERTICAL_INTERVAL = 13;
const HORIZONTAL_INTERVAL = 10;
const COLORS: readonly string[] = ['#4FC3F7', '#F7F895'];

const TreeContainer: React.FC<TreeContainerProps> = ({
  tree: treeObj,
  move,
  selectedPositions,
}) => {
  const [tree, setTree] = useState(<View />);
  const { width, height } = Dimensions.get('window');

  const { root, svgHeight, svgWidth, rootX } = useMemo(() => {
    const root: Position<FamilyNode> = treeObj.root()!;
    const svgHeight =
      treeObj.height() * (VERTICAL_INTERVAL + NODE_HEIGHT) +
      PADDING * 2 +
      NODE_HEIGHT;
    const svgWidth = treeObj.calculateSubtreeWidth(
      root,
      NODE_WIDTH,
      HORIZONTAL_INTERVAL
    );
    const rootX = treeObj.calculateRootX(
      NODE_WIDTH,
      HORIZONTAL_INTERVAL,
      PADDING
    );
    return { root, svgHeight, svgWidth, rootX };
  }, []);
  console.log(`svg width: ${svgWidth} device Width:${width}`);
  console.log(`svg height : ${svgHeight} device height: ${height}`);
  return (
    <>
      <TreeView
        tree={tree}
        svgHeight={svgHeight}
        svgWidth={svgWidth}
        rootX={rootX}
      />
      <Tree
        tree={treeObj}
        setTree={setTree}
        selectedPositions={selectedPositions}
        root={root}
        rootX={rootX}
        padding={PADDING}
        nodeWidth={NODE_WIDTH}
        nodeHeight={NODE_HEIGHT}
        colors={COLORS}
        move={move}
        verticalInterval={VERTICAL_INTERVAL}
        horizontalInterval={HORIZONTAL_INTERVAL}
      />
    </>
  );
};

export default TreeContainer;
