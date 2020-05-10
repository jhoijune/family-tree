import React, { useMemo } from 'react';
import { G, Text, Rect } from 'react-native-svg';

import { NodeProps } from '../type';

const Node: React.FC<NodeProps> = ({
  position,
  x,
  y,
  width,
  height,
  color,
  move,
  selectedPositions,
}) => {
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
  const isHighlight = selectedPositions.includes(position);
  const modifiedColor = isHighlight ? '#FF4C4F' : color;

  return (
    <G>
      <Rect
        x={x}
        y={y}
        rx={width / 6}
        ry={width / 6}
        width={width}
        height={height}
        fill={modifiedColor}
        onPress={() => {
          move('Info', {
            position: position,
          });
        }}
      />
      <Text
        x={x}
        y={y + height / 2 + 2}
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
