import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';

import { MoveableViewProps } from '../type';

const MoveableView: React.FC<MoveableViewProps> = ({
  children,
  position,
  move,
  keyword,
  style,
}) => (
  <TouchableNativeFeedback
    onPress={() => {
      move('Info', {
        position: position,
        keyword: keyword,
      });
    }}
    background={TouchableNativeFeedback.Ripple('#000', true)}>
    <View style={style}>{children}</View>
  </TouchableNativeFeedback>
);

export default MoveableView;
