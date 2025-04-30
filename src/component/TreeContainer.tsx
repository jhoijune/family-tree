import React, { useMemo, useState, useContext, useEffect } from 'react';
import _ from 'lodash-es';
import { Line, G } from 'react-native-svg';

import TreeComponent from './TreeComponent';
import TreeView from './TreeView';
import GenerationNode from './GenerationNode';
import { TreeContext } from '../context';
import { TreeContainerProps } from '../type';
import { TREE_SETTING } from '../setting';

const TreeContainer: React.FC<TreeContainerProps> = ({
  navigation,
  searchedPositions,
  presentRoot,
  keyword,
  isLoading,
}) => {
  const [treeElement, setTreeElement] = useState<JSX.Element | null>(null);
  const [renderer, setRenderer] = useState(true);
  const { treeObj } = useContext(TreeContext);
  const {
    nodeWidth,
    nodeHeight,
    horizontalInterval,
    verticalInterval,
    padding,
  } = TREE_SETTING;
  const { rootX, generationNodes, generationDottedLines, svgWidth, svgHeight } =
    useMemo(() => {
      const treeHeight = treeObj.height(presentRoot);
      const rootX = treeObj.calculateRootX(
        presentRoot,
        nodeWidth,
        horizontalInterval,
        padding
      );
      const svgWidth = treeObj.calculateSubtreeWidth(
        presentRoot,
        nodeWidth,
        horizontalInterval
      );
      const svgHeight =
        (treeHeight + 1) * nodeHeight + treeHeight * verticalInterval;
      const firstGeneartion = presentRoot.element!.generation;

      const generations = _.range(
        firstGeneartion,
        firstGeneartion + treeHeight + 1
      );
      const generationNodes = (
        <G>
          {generations.map((generation, index) => (
            <GenerationNode
              key={index}
              y={padding + (verticalInterval + nodeHeight) * index}
            >
              {generation}
            </GenerationNode>
          ))}
        </G>
      );
      const generationDottedLines = (
        width: number = svgWidth + padding * 2
      ): JSX.Element => (
        <G>
          {_.range(generations.length * 2).map((value) => (
            <Line
              key={value}
              x1={0}
              x2={width}
              y1={
                padding +
                nodeHeight * Math.round(value / 2) +
                verticalInterval * (value / 2 - (value % 2) / 2)
              }
              y2={
                padding +
                nodeHeight * Math.round(value / 2) +
                verticalInterval * (value / 2 - (value % 2) / 2)
              }
              stroke={'#bbb'}
              strokeWidth={0.5}
              strokeDasharray={'4 4'}
            />
          ))}
        </G>
      );
      return {
        rootX,
        generationNodes,
        generationDottedLines,
        svgWidth,
        svgHeight,
      };
    }, []);

  useEffect(() => {
    if (isLoading) {
      setRenderer((prev) => !prev);
    }
  }, [isLoading]);

  return (
    <>
      <TreeView
        key={renderer}
        treeElement={treeElement}
        rootX={rootX}
        generationNodes={generationNodes}
        generationDottedLines={generationDottedLines}
        svgWidth={svgWidth}
        svgHeight={svgHeight}
      />
      <TreeComponent
        setTreeElement={setTreeElement}
        searchedPositions={searchedPositions}
        keyword={keyword}
        presentRoot={presentRoot}
        rootX={rootX}
        navigation={navigation}
      />
    </>
  );
};

export default TreeContainer;
