import React, { useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { G, Text, Rect } from 'react-native-svg';

import { NodeProps } from '../type';

// TODO: color 먹이고
// TODO: highlighting

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
    }
    return '';
  }, []);
  const isHighlight = selectedPositions.includes(position);
  const modifiedColor = isHighlight ? 'red' : color;

  return (
    <G>
      <Rect
        x={x}
        y={y}
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
        y={y + 20}
        fill="black"
        fontSize="12"
        fontWeight="bold"
        textAnchor="start">
        {text}
      </Text>
    </G>
  );
};

export default Node;
