import React from 'react';
import { TouchableHighlight, View } from 'react-native';

import { MoveableViewProps } from '../type';

const MoveableView: React.FC<MoveableViewProps> = ({
  children,
  position,
  move,
  keyword,
  style,
}) => (
  <TouchableHighlight
    onPress={() => {
      move('Info', {
        position: position,
        keyword: keyword,
      });
    }}>
    <View style={style}>{children}</View>
  </TouchableHighlight>
);

export default MoveableView;
