import React from 'react';
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
}) => {
  const { element } = position;
  let text;
  if (element !== null) {
    if (typeof element['genealogy name'] !== 'undefined') {
      if (element.name === element['genealogy name']) {
        text = element.name;
      } else {
        text = `${element.name} (${element['genealogy name']})`;
      }
    }
  }
  return (
    <TouchableHighlight
      onPress={() => {
        move('Info', {
          position: position,
        });
      }}>
      <G>
        <Text fontSize="8" x={x} y={y} textAnchor="start">
          {text}
        </Text>
        <Rect x={x} y={y} width={width} height={height} fill={color}></Rect>
      </G>
    </TouchableHighlight>
  );
};

export default Node;
