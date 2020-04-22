import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { Svg } from 'react-native-svg';
import { TreeViewProps } from '../type';

const TreeView: React.FC<TreeViewProps> = ({ tree, svgWidth, svgHeight }) => {
  const [oPosition, setOPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const oPositionRef = useRef(oPosition);
  const positionRef = useRef(position);
  oPositionRef.current = oPosition;
  positionRef.current = position;

  const panResponder = useMemo(() => {
    return PanResponder.create({
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
  }, []);

  return (
    <View {...panResponder.panHandlers}>
      <Svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        translateX={position.x}
        translateY={position.y}>
        {tree}
      </Svg>
    </View>
  );
};

export default TreeView;
