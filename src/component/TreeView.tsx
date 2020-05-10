import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Dimensions,
  NativeTouchEvent,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Svg } from 'react-native-svg';
import _ from 'lodash';

import { TreeViewProps } from '../type';

const getDiagonalLength = (touches: NativeTouchEvent[]): number => {
  const [touch1, touch2] = touches;
  const diagonalLength = Math.sqrt(
    Math.pow(touch2.locationX - touch1.locationX, 2) +
      Math.pow(touch2.locationY - touch1.locationY, 2)
  );
  return diagonalLength;
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

const { width, height } = Dimensions.get('window');

const TreeView: React.FC<TreeViewProps> = ({
  tree,
  rootX,
  generationNodes,
  generationDottedLines,
}) => {
  // TODO: rootX좌표로 처음 position 위치 로직 작성
  const [isInit, setIsInit] = useState(true);
  const [oPosition, setOPosition] = useState({
    x: -2161,
    y: 15,
  });
  const [position, setPosition] = useState({
    x: -2161,
    y: 15,
  });
  const [initialTouchState, setInitialTouchState] = useState<null | {
    x: number;
    y: number;
    length: number;
    scale: number;
  }>(null);
  const [scale, setScale] = useState(2);

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
            } = initialTouchStateRef.current;
            const currentLength = getDiagonalLength(touches);
            const velocity = 0.002;
            const newScale =
              initialScale + (currentLength - initialLength) * velocity;
            const scaleChange = scaleRef.current - newScale;
            setScale(newScale);
            // FIXME: 좀더 세밀하게
            setPosition({
              x:
                positionRef.current.x +
                scaleChange * (initialX - positionRef.current.x),
              y:
                positionRef.current.y +
                scaleChange * (initialY - positionRef.current.y),
            });
          }
        } else if (
          initialTouchStateRef.current === null &&
          touches.length === 1
        ) {
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
    if (tree) {
      setIsInit(false);
    }
  });

  return (
    <View style={styles.container}>
      {tree ? (
        <>
          <Svg
            width={30}
            height={height}
            transform={
              isInit
                ? undefined
                : {
                    translateY: position.y,
                    scale: scale,
                  }
            }>
            {generationNodes}
            {generationDottedLines(30)}
          </Svg>
          <Svg
            width={width - 30}
            height={height}
            transform={
              isInit
                ? undefined
                : {
                    translateX: position.x,
                    translateY: position.y,
                    scale: scale,
                  }
            }
            {...panResponder.panHandlers}>
            {tree}
            {generationDottedLines()}
          </Svg>
        </>
      ) : (
        <ActivityIndicator size="large" color="#008ff8" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default TreeView;
