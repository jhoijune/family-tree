import React, { useMemo, useContext } from 'react';
import { G } from 'react-native-svg';

import Node from './Node';
import Branch from './Branch';
import { Position, SubtreeComponentProps, FamilyNode } from '../type';
import { TREE_SETTING } from '../setting';
import { TreeContext } from '../context';

const Subtree: React.FC<SubtreeComponentProps> = ({
  position,
  navigation,
  x,
  y,
  searchedPositions,
  pressedPosition,
}) => {
  const {
    nodeWidth,
    nodeHeight,
    verticalInterval,
    horizontalInterval,
    colors,
  } = TREE_SETTING;
  const { treeObj } = useContext(TreeContext);
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
    const childrenLen = treeObj.numChildren(position);
    if (childrenLen !== 0) {
      const childrens = [];
      for (const children of treeObj.children(position)) {
        childrens.push(children);
      }
      const branchX = x + nodeWidth / 2;
      const branchY = y + nodeHeight;
      const branchHeight = verticalInterval;
      const firstX = treeObj.calculateFirstNodeX(
        position,
        x,
        nodeWidth,
        horizontalInterval
      );
      const depth = treeObj.depth(position) + 1;
      const colorInd = depth % colors.length;
      const color = colors[colorInd];
      const nodeY = y + nodeHeight + verticalInterval;
      const nodes: { position: Position<FamilyNode>; x: number }[] = [
        { position: childrens[0], x: firstX },
      ];
      const branchXs: number[] = [firstX + nodeWidth / 2];
      let cacheX = firstX;
      for (let index = 1; index < childrenLen; index++) {
        const interval = treeObj.calculateNodeInterval(
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
          isBlur={!!pressedPosition && pressedPosition !== position}
        />
        <G>
          {nodes!.map(({ position, x }) => (
            <G key={x}>
              <Node
                position={position}
                x={x}
                y={nodeY!}
                color={color!}
                navigation={navigation}
                searchedPositions={searchedPositions}
                isBlur={!!pressedPosition && pressedPosition !== position}
              />
              <Subtree
                position={position}
                navigation={navigation}
                x={x}
                y={nodeY!}
                searchedPositions={searchedPositions}
                pressedPosition={
                  pressedPosition && pressedPosition === position
                    ? null
                    : pressedPosition
                }
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
