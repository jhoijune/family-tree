import React, { useMemo } from 'react';
import { G } from 'react-native-svg';

import Node from './Node';
import Branch from './Branch';
import { Position, SubtreeProps, FamilyNode } from '../type';

const Subtree: React.FC<SubtreeProps> = ({
  tree,
  position,
  move,
  x,
  y,
  nodeWidth,
  nodeHeight,
  verticalInterval,
  horizontalInterval,
  colors,
  selectedPositions,
}) => {
  const {
    childrenLen,
    branchX,
    branchY,
    branchHeight,
    color,
    nodeY,
    nodes,
    branchXs,
  } = useMemo(() => {
    const childrenLen = tree.numChildren(position);
    if (childrenLen !== 0) {
      const childrens = [];
      for (const children of tree.children(position)) {
        childrens.push(children);
      }
      const branchX = x + nodeWidth / 2;
      const branchY = y + nodeHeight;
      const branchHeight = verticalInterval;
      const firstX = tree.calculateFirstNodeX(
        position,
        x,
        nodeWidth,
        horizontalInterval
      );
      const depth = tree.depth(position) + 1;
      const colorInd = depth % colors.length;
      const color = colors[colorInd];
      const nodeY = y + nodeHeight + verticalInterval;
      const nodes: { position: Position<FamilyNode>; x: number }[] = [
        { position: childrens[0], x: firstX },
      ];
      const branchXs: number[] = [firstX + nodeWidth / 2];
      let cacheX = firstX;
      for (let index = 1; index < childrenLen; index++) {
        const interval = tree.calculateNodeInterval(
          childrens[index - 1],
          childrens[index],
          nodeWidth,
          horizontalInterval
        );
        cacheX = cacheX + interval;
        nodes.push({ position: childrens[index], x: cacheX });
        branchXs.push(cacheX + nodeWidth / 2);
      }
      return {
        childrenLen,
        branchX,
        branchY,
        branchHeight,
        color,
        nodeY,
        nodes,
        branchXs,
      };
    }
    return { childrenLen };
  }, []);
  if (childrenLen !== 0) {
    return (
      <G>
        <Branch
          x={branchX!}
          y={branchY!}
          branchHeight={branchHeight!}
          branchXs={branchXs!}
        />
        <G>
          {nodes!.map(({ position, x }) => (
            <G key={x}>
              <Node
                position={position}
                x={x}
                y={nodeY!}
                width={nodeWidth}
                height={nodeHeight}
                color={color!}
                move={move}
                selectedPositions={selectedPositions}
              />
              <Subtree
                tree={tree}
                position={position}
                move={move}
                x={x}
                y={nodeY!}
                nodeWidth={nodeWidth}
                nodeHeight={nodeHeight}
                verticalInterval={verticalInterval}
                horizontalInterval={horizontalInterval}
                colors={colors}
                selectedPositions={selectedPositions}
              />
            </G>
          ))}
        </G>
      </G>
    );
  }
  return null;
};

export default Subtree;
