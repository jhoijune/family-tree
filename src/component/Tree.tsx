import React, { Component, useMemo, useRef, useState } from 'react';
import { Svg, G } from 'react-native-svg';
import {
  View,
  PanResponder,
  Animated,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native';

import Subtree from './Subtree';
import Node from './Node';
import { TreeProps, Position, FamilyNode } from '../type';

const PADDING = 20;
const NODE_WIDTH = 50;
const NODE_HEIGHT = 30;
const VERTICAL_INTERVAL = 10;
const HORIZONTAL_INTERVAL = 10;
const COLORS: readonly string[] = ['#4FC3F7', '#F7F895'];

const Tree: React.FC<TreeProps> = ({ tree, move, selectedPositions }) => {
  const [oPosition, setOPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const oPositionRef = useRef(oPosition);
  const positionRef = useRef(position);
  oPositionRef.current = oPosition;
  positionRef.current = position;

  const { panResponder, root, svgHeight, svgWidth, rootX } = useMemo(() => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        let xdiff = gestureState.x0 - gestureState.moveX;
        let ydiff = gestureState.y0 - gestureState.moveY;
        setPosition({
          x: oPositionRef.current.x - xdiff,
          y: oPositionRef.current.y - ydiff,
        });
      },
      onPanResponderRelease: () => {
        setOPosition(positionRef.current);
      },
    });
    const root: Position<FamilyNode> = tree.root()!;
    const svgHeight =
      tree.height() * (VERTICAL_INTERVAL + NODE_HEIGHT) +
      PADDING * 2 +
      NODE_HEIGHT;
    const svgWidth = tree.calculateSubtreeWidth(
      root,
      NODE_WIDTH,
      HORIZONTAL_INTERVAL
    );
    const rootX = tree.calculateRootX(NODE_WIDTH, HORIZONTAL_INTERVAL, PADDING);
    return { panResponder, root, svgHeight, svgWidth, rootX };
  }, []);
  //console.log(svgWidth, svgHeight, rootX);
  // init root x 설정
  return (
    <View {...panResponder.panHandlers}>
      <Svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        translateX={position.x}
        translateY={position.y}>
        <G>
          <Node
            position={root}
            x={rootX}
            y={PADDING}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            color={COLORS[0]}
            move={move}
            selectedPositions={selectedPositions}
          />
          <Subtree
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
            selectedPositions={selectedPositions}
          />
        </G>
      </Svg>
    </View>
  );
};

export default Tree;
