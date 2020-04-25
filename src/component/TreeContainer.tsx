import React, { useMemo, useState } from 'react';
import { View, Dimensions } from 'react-native';

import Tree from './Tree';
import TreeView from './TreeView';
import { TreeContainerProps, Position, FamilyNode } from '../type';

const PADDING = 10;
const NODE_WIDTH = 30;
const NODE_HEIGHT = 15;
const VERTICAL_INTERVAL = 10;
const HORIZONTAL_INTERVAL = 5;
const COLORS: readonly string[] = ['#99CDFF', '#99FFCD', '#CCFF9A', '#FEFF99'];

const TreeContainer: React.FC<TreeContainerProps> = ({
  tree: treeObj,
  move,
  selectedPositions,
}) => {
  const [tree, setTree] = useState(<View />);
  const { root, rootX } = useMemo(() => {
    const root: Position<FamilyNode> = treeObj.root()!;
    const rootX = treeObj.calculateRootX(
      NODE_WIDTH,
      HORIZONTAL_INTERVAL,
      PADDING
    );
    return { root, rootX };
  }, []);

  return (
    <>
      <TreeView tree={tree} rootX={rootX} />
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
