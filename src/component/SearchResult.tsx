import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import MoveableView from './MoveableView';
import HighlightableText from './HighlightableText';
import { SearchResultProps } from '../type';
import { mapPropName } from '../util';

const SearchResult: React.FC<SearchResultProps> = ({
  position,
  properties,
  move,
  keyword,
}) => {
  return (
    <MoveableView
      position={position}
      move={move}
      keyword={keyword}
      style={styles.container}>
      {properties.map((property, index) => {
        return (
          <View
            key={index}
            style={[
              styles.itemContainer,
              {
                borderBottomWidth: properties.length - 1 !== index ? 1 : 0,
              },
            ]}>
            <Text style={styles.propertyText}>{mapPropName(property)}</Text>
            <HighlightableText keyword={keyword} style={styles.resultText}>
              {position.element !== null ? position.element[property] : ''}
            </HighlightableText>
          </View>
        );
      })}
    </MoveableView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#919191',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DADADA',
  },
  propertyText: {
    margin: 10,
    fontSize: 20,
  },
  resultText: {
    fontSize: 20,
  },
});

export default SearchResult;
