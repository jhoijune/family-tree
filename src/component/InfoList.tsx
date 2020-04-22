import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import { InfoListProps, Info, FamilyNode, Position } from '../type';
import HighlightalbeText from './HighlightableText';
import MoveableView from './MoveableView';

const InfoList: React.FC<InfoListProps> = ({ infos, keyword, push }) => {
  const convertValue = (
    value: Info['value']
  ): JSX.Element | JSX.Element[] | null => {
    if (value === null) {
      return null;
    } else if (typeof value === 'string' || typeof value === 'number') {
      return (
        <HighlightalbeText keyword={keyword} style={styles.defaultFont}>
          {value}
        </HighlightalbeText>
      );
    } else if (value instanceof Array) {
      return value.map((children, index) => (
        <MoveableView key={index} position={children.position} move={push}>
          <HighlightalbeText
            keyword={keyword}
            style={[{ color: 'blue' }, styles.defaultFont]}>
            {children.name}
          </HighlightalbeText>
        </MoveableView>
      ));
    }
    return (
      <MoveableView position={value.position} move={push}>
        <HighlightalbeText
          keyword={keyword}
          style={[{ color: 'blue' }, styles.defaultFont]}>
          {value.name}
        </HighlightalbeText>
      </MoveableView>
    );
  };

  return (
    <View style={styles.container}>
      {infos.map((info, index) => {
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={{ flex: 2 }}>
              <Text style={styles.defaultFont}>{info.header}</Text>
            </View>
            <View style={{ flex: 3 }}>{convertValue(info.value)}</View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  defaultFont: {
    fontSize: 20,
  },
});

export default InfoList;
