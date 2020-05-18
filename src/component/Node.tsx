import React, { useMemo, useContext } from 'react';
import { G, Text, Rect } from 'react-native-svg';

import { PopupContext, PressedContext } from '../context';
import { NodeProps } from '../type';
import { treeSetting } from '../setting';

const Node: React.FC<NodeProps> = ({
  position,
  x,
  y,
  color,
  searchedPositions,
  navigation: { navigate, push },
  isBlur,
}) => {
  const { setInfo } = useContext(PopupContext);
  const { setPressedPosition } = useContext(PressedContext);
  const { nodeWidth, nodeHeight } = treeSetting;

  const text = useMemo(() => {
    const { element } = position;
    if (element !== null) {
      if (typeof element['genealogical name'] !== 'undefined') {
        if (element.name === element['genealogical name']) {
          return element.name;
        } else {
          return `${element.name} (${element['genealogical name']})`;
        }
      }
      return element.name;
    }
    return '';
  }, []);
  const isHighlight = searchedPositions.includes(position);
  const modifiedColor = isHighlight ? '#FF4C4F' : color;

  return (
    <G opacity={isBlur ? 0.4 : 1}>
      <Rect
        x={x}
        y={y}
        rx={nodeWidth / 6}
        ry={nodeWidth / 6}
        width={nodeWidth}
        height={nodeHeight}
        fill={modifiedColor}
        onPress={() => {
          navigate('Info', {
            position,
          });
        }}
        onLongPress={(evt) => {
          const {
            nativeEvent: { locationX: x, locationY: y },
          } = evt;
          setPressedPosition(position);
          setInfo({
            x,
            y,
            visible: true,
            items: [
              {
                text: '재구성',
                action: () => {
                  push('Home', {
                    presentRoot: position,
                  });
                  setPressedPosition(null);
                  setInfo((value) => ({ ...value, visible: false }));
                },
              },
            ],
            cleanup: () => {
              setPressedPosition(null);
            },
          });
        }}
      />
      <Text
        x={x}
        y={y + nodeHeight / 2 + 2}
        fill={isHighlight ? '#fff' : '#000'}
        fontSize={6}
        fontWeight="bold"
        textAnchor="start">
        {text.padStart(8)}
      </Text>
    </G>
  );
};

export default Node;
