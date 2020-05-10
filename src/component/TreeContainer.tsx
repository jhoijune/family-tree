import React, { useMemo, useState } from 'react';
import { View, Dimensions } from 'react-native';
import _ from 'lodash';
import { Line, G } from 'react-native-svg';

import Tree from './Tree';
import TreeView from './TreeView';
import GenerationNode from './GenerationNode';
import { TreeContainerProps, Position, FamilyNode } from '../type';

const PADDING = 10;
const NODE_WIDTH = 30;
const NODE_HEIGHT = 15;
const VERTICAL_INTERVAL = 10;
const HORIZONTAL_INTERVAL = 5;
const COLORS: readonly string[] = ['#99CDFF', '#CCFF9A', '#FEFF99', '#99FFCD'];

const TreeContainer: React.FC<TreeContainerProps> = ({
  tree: treeObj,
  move,
  selectedPositions,
}) => {
  const [tree, setTree] = useState<JSX.Element | null>(null);
  const {
    root,
    rootX,
    generationNodes,
    generationDottedLines,
  } = useMemo(() => {
    const root: Position<FamilyNode> = treeObj.root()!;
    const rootX = treeObj.calculateRootX(
      NODE_WIDTH,
      HORIZONTAL_INTERVAL,
      PADDING
    );
    const svgWidth = treeObj.calculateSubtreeWidth(
      root,
      NODE_WIDTH,
      HORIZONTAL_INTERVAL
    );
    const firstGeneartion: number = root.element!.generation as number;
    const treeHeight = treeObj.height();
    const generations = _.range(
      firstGeneartion,
      firstGeneartion + treeHeight + 1
    );
    const generationNodes = (
      <G>
        {generations.map((generation, index) => (
          <GenerationNode
            key={index}
            y={PADDING + (VERTICAL_INTERVAL + NODE_HEIGHT) * index}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}>
            {generation}
          </GenerationNode>
        ))}
      </G>
    );
    const generationDottedLines = (
      width: number = svgWidth + PADDING * 2
    ): JSX.Element => (
      <G>
        {_.range(generations.length * 2).map((value) => (
          <Line
            key={value}
            x1={0}
            x2={width}
            y1={
              PADDING +
              NODE_HEIGHT * Math.round(value / 2) +
              VERTICAL_INTERVAL * (value / 2 - (value % 2) / 2)
            }
            y2={
              PADDING +
              NODE_HEIGHT * Math.round(value / 2) +
              VERTICAL_INTERVAL * (value / 2 - (value % 2) / 2)
            }
            stroke={'#bbb'}
            strokeWidth={0.5}
            strokeDasharray={'4 4'}
          />
        ))}
      </G>
    );
    return { root, rootX, generationNodes, generationDottedLines };
  }, []);

  return (
    <>
      <TreeView
        tree={tree}
        rootX={rootX}
        generationNodes={generationNodes}
        generationDottedLines={generationDottedLines}
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
