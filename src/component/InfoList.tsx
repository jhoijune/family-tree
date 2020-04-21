import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import { InfoListProps, Info, FamilyNode, Position } from '../type';
import HighlightalbeText from './HighlightableText';
import MovableView from './MoveableView';

const InfoList: React.FC<InfoListProps> = ({ infos, keyword, push }) => {
  const convertValue = (
    value: Info['value']
  ): JSX.Element | JSX.Element[] | null => {
    if (value === null) {
      return null;
    } else if (typeof value === 'string' || typeof value === 'number') {
      return <HighlightalbeText keyword={keyword}>{value}</HighlightalbeText>;
    } else if (value instanceof Array) {
      return value.map((children) => (
        <MovableView position={children.position} move={push}>
          <HighlightalbeText keyword={keyword} style={{ color: 'blue' }}>
            {children.name}
          </HighlightalbeText>
        </MovableView>
      ));
    }
    return (
      <MovableView position={value.position} move={push}>
        <HighlightalbeText keyword={keyword} style={{ color: 'blue' }}>
          {value.name}
        </HighlightalbeText>
      </MovableView>
    );
  };

  return (
    <View>
      {infos.map((info, index) => {
        return (
          <React.Fragment key={index}>
            <View style={{ flex: 2 }}>
              <Text>{info.header}</Text>
            </View>
            <View style={{ flex: 3 }}>{convertValue(info.value)}</View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default InfoList;
