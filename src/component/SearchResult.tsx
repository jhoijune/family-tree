import React from 'react';
import { Text, StyleSheet } from 'react-native';

import MoveableView from './MoveableView';
import HighlightableText from './HighlightableText';
import { SearchResultProps } from '../type';
import { mapPropName } from '../util';

const SearchResult: React.FC<SearchResultProps> = ({
  position,
  property,
  move,
  keyword,
}) => {
  return (
    <MoveableView position={position} move={move} style={styles.container}>
      <Text style={styles.propertyText}>{mapPropName(property)}</Text>
      <HighlightableText keyword={keyword} style={styles.resultText}>
        {position.element !== null ? position.element[property] : ''}
      </HighlightableText>
    </MoveableView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderTopWidth: 0,
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
