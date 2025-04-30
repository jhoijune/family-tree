import React, { useState, useMemo, useRef, useEffect, useContext } from 'react';
import {
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  NativeTouchEvent,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { G, Svg } from 'react-native-svg';
import _ from 'lodash-es';
import { useHeaderHeight } from '@react-navigation/elements';

import { TreeViewProps } from '../type';
import { LoadingContext, DimensionsContext } from '../context';
import { TREE_SETTING } from '../setting';

const VELOCITY = 0.004;
const MIN_SCALE = 0.6;
const MAX_SCALE = 5;
const GENERATION_NODES_WIDTH = 30;

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

const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const TreeView: React.FC<TreeViewProps> = ({
  treeElement,
  rootX,
  generationNodes,
  generationDottedLines,
  svgWidth,
  svgHeight,
}) => {
  const { padding, nodeWidth } = TREE_SETTING;
  const { setIsLoading, isLoading } = useContext(LoadingContext);
  const { width, height } = useContext(DimensionsContext);
  const [isInit, setIsInit] = useState(true);
  const isPortrait = useMemo(() => {
    return height > width;
  }, [width, height]);

  const [scale, setScale] = useState(isPortrait ? 2 : 1);
  const [position, setPosition] = useState({
    x: -scale * rootX + (width - GENERATION_NODES_WIDTH) / 2 - nodeWidth,
    y: isPortrait ? 30 : -40,
  });
  const oPositionRef = useRef({
    ...position,
  });
  const positionRef = useRef(position);
  const initialTouchStateRef = useRef<null | { length: number }>(null);
  const scaleRef = useRef(scale);
  positionRef.current = position;
  scaleRef.current = scale;
  const headerHeight = useHeaderHeight();

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
            initialTouchStateRef.current = { length: initialLength };
          } else {
            const { length: initialLength } = initialTouchStateRef.current;
            const currentLength = getDiagonalLength(touches);
            const { x: centerX, y: centerY } = getCenterCoordinates(touches);
            const { x, y } = positionRef.current;
            const delta = currentLength - initialLength;
            const newScale = clamp(
              scaleRef.current + delta * VELOCITY,
              MIN_SCALE,
              MAX_SCALE
            );
            const biasX =
              ((centerX - x) * newScale) / scaleRef.current - (centerX - x);
            const biasY =
              ((centerY - y) * newScale) / scaleRef.current - (centerY - y);
            const newX = x - biasX;
            const newY = y - biasY;
            setScale(newScale);
            setPosition({
              x: clamp(
                newX,
                -svgWidth * scaleRef.current - GENERATION_NODES_WIDTH,
                width - GENERATION_NODES_WIDTH
              ),
              y: clamp(
                newY,
                -scaleRef.current * svgHeight,
                Math.max(
                  scaleRef.current * (svgHeight + padding),
                  height - headerHeight - padding
                )
              ),
            });
            initialTouchStateRef.current = {
              length: currentLength,
            };
          }
        } else if (
          initialTouchStateRef.current === null &&
          touches.length === 1
        ) {
          const xdiff = gestureState.x0 - gestureState.moveX;
          const ydiff = gestureState.y0 - gestureState.moveY;
          setPosition({
            x: clamp(
              oPositionRef.current.x - xdiff,
              -svgWidth * scaleRef.current - GENERATION_NODES_WIDTH,
              width - GENERATION_NODES_WIDTH
            ),
            y: clamp(
              oPositionRef.current.y - ydiff,
              -scaleRef.current * svgHeight,
              Math.max(
                scaleRef.current * (svgHeight + padding),
                height - headerHeight - padding
              )
            ),
          });
        }
      },
      onPanResponderRelease: () => {
        initialTouchStateRef.current = null;
        oPositionRef.current = positionRef.current;
      },
    });
  }, []);

  useEffect(() => {
    if (treeElement) {
      setIsInit(false);
      setIsLoading(false);
    }
  }, [treeElement]);

  return (
    <View style={styles.container}>
      {treeElement && !isLoading ? (
        <>
          <Svg
            width={GENERATION_NODES_WIDTH}
            height={height - headerHeight}
            transform={
              isInit
                ? undefined
                : {
                    translateY: position.y,
                    scale: scale,
                  }
            }
          >
            {generationNodes}
            {generationDottedLines(30)}
          </Svg>
          <Svg
            width={width - 30}
            height={height - headerHeight}
            transform={
              isInit
                ? undefined
                : {
                    translateX: position.x,
                    translateY: position.y,
                    scale: scale,
                  }
            }
            {...panResponder.panHandlers}
          >
            {treeElement}
            {generationDottedLines()}
          </Svg>
        </>
      ) : (
        <ActivityIndicator
          size={60}
          color="#008ff8"
          style={{ elevation: 15 }}
        />
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
