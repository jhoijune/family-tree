import React from 'react';
import { TouchableHighlight, View } from 'react-native';

import { MoveableViewProps } from '../type';

const MoveableView: React.FC<MoveableViewProps> = ({
  children,
  position,
  move,
}) => (
  <TouchableHighlight
    onPress={() => {
      move('Info', {
        position: position,
      });
    }}>
    <View>{children}</View>
  </TouchableHighlight>
);

export default MoveableView;
