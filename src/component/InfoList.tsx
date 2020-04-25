import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InfoListProps, Info } from '../type';
import HighlightalbeText from './HighlightableText';
import MoveableView from './MoveableView';

const InfoList: React.FC<InfoListProps> = ({ infos, keyword, push }) => {
  const convertValue = (value: Info['value']): JSX.Element | JSX.Element[] => {
    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <HighlightalbeText keyword={keyword} style={styles.defaultFont}>
          {value}
        </HighlightalbeText>
      );
    } else if (value instanceof Array) {
      return value.map((children, index) => (
        <MoveableView
          key={index}
          position={children.position}
          move={push}
          style={{ marginBottom: value.length - 1 !== index ? 10 : 0 }}>
          <HighlightalbeText
            keyword={keyword}
            style={[{ color: '#40B0F8' }, styles.defaultFont]}>
            {children.name}
          </HighlightalbeText>
        </MoveableView>
      ));
    }
    return (
      <MoveableView position={value!.position} move={push}>
        <HighlightalbeText
          keyword={keyword}
          style={[{ color: '#40B0F8' }, styles.defaultFont]}>
          {value!.name}
        </HighlightalbeText>
      </MoveableView>
    );
  };

  const showInfos = () => {
    const elementArr: JSX.Element[] = [];
    infos.forEach(({ header, value }, index) => {
      if (value !== null) {
        elementArr.push(
          <View key={index} style={styles.itemContainer}>
            <View>
              <Text style={styles.defaultFont}>{header}</Text>
            </View>
            <View>{convertValue(value)}</View>
          </View>
        );
      }
    });
    return elementArr;
  };
  return <View style={styles.container}>{showInfos()}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
    padding: 20,
  },
  defaultFont: {
    fontSize: 20,
  },
});

export default InfoList;
