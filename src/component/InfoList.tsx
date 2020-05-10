import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InfoListProps, Info, PositionAndName } from '../type';
import HighlightalbeText from './HighlightableText';
import MoveableView from './MoveableView';

const InfoList: React.FC<InfoListProps> = ({ infos, keyword, push }) => {
  const convertValue = (
    value: Info['value'],
    header: string
  ): JSX.Element | JSX.Element[] => {
    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <HighlightalbeText
          text={value}
          keyword={keyword}
          style={styles.defaultFont}
        />
      );
    } else if (value instanceof Array) {
      if (typeof value[0] === 'string') {
        const modified = value as string[];
        // FIXME: 하드코딩 제거
        if (header === '자녀') {
          return modified.map((childrenName, index) => (
            <View
              key={index}
              style={{ marginBottom: modified.length - 1 !== index ? 10 : 0 }}>
              <HighlightalbeText
                text={childrenName}
                keyword={keyword}
                style={styles.defaultFont}
              />
            </View>
          ));
        } else {
          return (
            <HighlightalbeText
              text={modified[0]}
              keyword={keyword}
              style={styles.defaultFont}
            />
          );
        }
      }
      const modified = value as PositionAndName[];
      return modified.map((children, index) => (
        <MoveableView
          key={index}
          position={children.position}
          move={push}
          style={{ marginBottom: modified.length - 1 !== index ? 10 : 0 }}>
          <HighlightalbeText
            text={children.name}
            keyword={keyword}
            style={[{ color: '#40B0F8' }, styles.defaultFont]}
          />
        </MoveableView>
      ));
    }
    return (
      <MoveableView position={value!.position} move={push}>
        <HighlightalbeText
          text={value!.name}
          keyword={keyword}
          style={[{ color: '#40B0F8' }, styles.defaultFont]}
        />
      </MoveableView>
    );
  };

  const showInfos = () => {
    const elementArr: JSX.Element[] = [];
    infos.forEach(({ header, value }, index) => {
      if (value != null) {
        elementArr.push(
          <View key={index} style={styles.itemContainer}>
            <View>
              <Text style={styles.defaultFont}>{header}</Text>
            </View>
            <View>{convertValue(value, header)}</View>
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
