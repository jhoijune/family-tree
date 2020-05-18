import React, { useMemo, useState, useContext } from 'react';
import _ from 'lodash';
import { Line, G } from 'react-native-svg';

import TreeComponent from './TreeComponent';
import TreeView from './TreeView';
import GenerationNode from './GenerationNode';
import { TreeContext } from '../context';
import { TreeContainerProps } from '../type';
import { treeSetting } from '../setting';

const TreeContainer: React.FC<TreeContainerProps> = ({
  navigation,
  searchedPositions,
  presentRoot,
}) => {
  const [treeElement, setTreeElement] = useState<JSX.Element | null>(null);
  const { treeObj } = useContext(TreeContext);
  const {
    nodeWidth,
    nodeHeight,
    horizontalInterval,
    verticalInterval,
    padding,
  } = treeSetting;
  const { rootX, generationNodes, generationDottedLines } = useMemo(() => {
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
    const firstGeneartion = presentRoot.element!.generation;
    const treeHeight = treeObj.height(presentRoot);
    const generations = _.range(
      firstGeneartion,
      firstGeneartion + treeHeight + 1
    );
    const generationNodes = (
      <G>
        {generations.map((generation, index) => (
          <GenerationNode
            key={index}
            y={padding + (verticalInterval + nodeHeight) * index}>
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
    return { rootX, generationNodes, generationDottedLines };
  }, []);

  return (
    <>
      <TreeView
        treeElement={treeElement}
        rootX={rootX}
        generationNodes={generationNodes}
        generationDottedLines={generationDottedLines}
      />
      <TreeComponent
        setTreeElement={setTreeElement}
        searchedPositions={searchedPositions}
        presentRoot={presentRoot}
        rootX={rootX}
        navigation={navigation}
      />
    </>
  );
};

export default TreeContainer;
