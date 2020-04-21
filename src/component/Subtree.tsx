import React from 'react';
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
}) => {
  const positions = [];
  for (const children of tree.children(position)) {
    positions.push(children);
  }
  const positionLen = positions.length;
  if (positionLen !== 0) {
    const branchX = x + nodeWidth / 2;
    const branchY = y + nodeHeight;
    const branchHeight = verticalInterval;
    const branchWidth = tree.calculateBranchWidth(
      position,
      nodeWidth,
      horizontalInterval
    );
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
      { position: positions[0], x: firstX },
    ];
    const branchXs: number[] = [firstX + nodeWidth / 2];
    let cacheX = firstX;
    for (let i = 1; i < positionLen; i++) {
      const interval = tree.calculateNodeInterval(
        positions[i - 1],
        positions[i],
        nodeWidth,
        horizontalInterval
      );
      cacheX = cacheX + interval;
      nodes.push({ position: positions[i], x: cacheX });
      branchXs.push(cacheX + nodeWidth / 2);
    }
    return (
      <G>
        <Branch
          x={branchX}
          y={branchY}
          branchHeight={branchHeight}
          branchWidth={branchWidth}
          branchXs={branchXs}
        />
        <G>
          {nodes.map(({ position, x }) => (
            <G>
              <Node
                position={position}
                x={x}
                y={nodeY}
                width={nodeWidth}
                height={nodeHeight}
                color={color}
                move={move}
              />
              <Subtree
                tree={tree}
                position={position}
                move={move}
                x={x}
                y={nodeY}
                nodeWidth={nodeWidth}
                nodeHeight={nodeHeight}
                verticalInterval={verticalInterval}
                horizontalInterval={horizontalInterval}
                colors={colors}
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

/*

type BranchProps = {
  x: number;
  y: number;
  height: number;
  branchWidth: number;
  branchInterval: number;
};
*/
