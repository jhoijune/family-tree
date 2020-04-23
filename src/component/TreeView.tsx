import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Dimensions,
  NativeTouchEvent,
  StyleSheet,
} from 'react-native';
import { Svg, G } from 'react-native-svg';
import _ from 'lodash';

import { TreeViewProps } from '../type';

const SCALE_SENSITIVITY = 1.01;

const getDiagonalLength = (touches: NativeTouchEvent[]): number => {
  const [touch1, touch2] = touches;
  const diagonalLength = Math.sqrt(
    Math.pow(touch2.locationX - touch1.locationX, 2) +
      Math.pow(touch2.locationY - touch1.locationY, 2)
  );
  return diagonalLength;
};

const getScale = (currentLength: number, initialLength: number): number => {
  return (currentLength / initialLength) * SCALE_SENSITIVITY;
};

const getCenterCoordinates = (
  touches: NativeTouchEvent[]
): { x: number; y: number } => {
  const xCoordinates: number[] = [];
  const yCoordinates: number[] = [];
  touches.forEach(({ locationX, locationY }) => {
    xCoordinates.push(locationX);
    yCoordinates.push(locationY);
  });
  return {
    x: _.mean(xCoordinates),
    y: _.mean(yCoordinates),
  };
};

const TreeView: React.FC<TreeViewProps> = ({
  tree,
  svgWidth,
  svgHeight,
  rootX,
}) => {
  const { width } = Dimensions.get('window');
  const [isInit, setIsInit] = useState(true);
  const [oPosition, setOPosition] = useState({ x: -rootX + width / 2, y: 0 });
  const [position, setPosition] = useState({ x: -rootX + width / 2, y: 0 });
  const [initialTouchState, setInitialTouchState] = useState<null | {
    x: number;
    y: number;
    length: number;
    scale: number;
  }>(null);
  const [scale, setScale] = useState(1);

  const oPositionRef = useRef(oPosition);
  const positionRef = useRef(position);
  const initialTouchStateRef = useRef(initialTouchState);
  const scaleRef = useRef(scale);
  oPositionRef.current = oPosition;
  positionRef.current = position;
  initialTouchStateRef.current = initialTouchState;
  scaleRef.current = scale;

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const {
          nativeEvent: { touches },
        } = event;
        if (touches.length >= 2) {
          if (initialTouchStateRef.current === null) {
            const initialLength = getDiagonalLength(touches);
            const { x, y } = getCenterCoordinates(touches);
            setInitialTouchState({
              x,
              y,
              length: initialLength,
              scale: scaleRef.current,
            });
          } else {
            const {
              x: initialX,
              y: initialY,
              length: initialLength,
              scale: initialScale,
            } = initialTouchStateRef.current!;
            const currentLength = getDiagonalLength(touches);
            const { x, y } = getCenterCoordinates(touches);
            const touchZoom = currentLength / initialLength;
            const dx = x - initialX;
            const dy = y - initialY;
            setScale(touchZoom * initialScale);
            setPosition({
              x: (oPositionRef.current.x + dx - x) * touchZoom + x,
              y: (oPositionRef.current.y + dy - y) * touchZoom + y,
            });
          }
        } else {
          const xdiff = gestureState.x0 - gestureState.moveX;
          const ydiff = gestureState.y0 - gestureState.moveY;
          setPosition({
            x: oPositionRef.current.x - xdiff,
            y: oPositionRef.current.y - ydiff,
          });
        }
      },
      onPanResponderRelease: () => {
        setInitialTouchState(null);
        setOPosition(positionRef.current);
      },
    });
  }, []);

  useEffect(() => {
    setIsInit(false);
  });

  return (
    <View {...panResponder.panHandlers} style={[styles.container]}>
      <Svg
        width={svgWidth}
        height={svgHeight}
        translateX={position.x}
        translateY={position.y}
        style={{ width: '100%', height: '100%' }}
        transform={isInit ? undefined : { scale }}>
        {tree}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default TreeView;
