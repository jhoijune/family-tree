import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import MoveableView from './MoveableView';
import HighlightableText from './HighlightableText';
import { SearchResultProps, FamilyNode } from '../type';
import { mapPropName } from '../util';

const SearchResult: React.FC<SearchResultProps> = ({
  position,
  properties,
  move,
  keyword,
}) => {
  const filter = (element: FamilyNode | null, property: string) => {
    if (element === null) {
      return '';
    }
    const value = element[property];

    if (typeof value === 'string' || typeof value === 'number') {
      if (property === 'name') {
        const modified = value as string;
        //FIXME: 성 부분 하드코딩하지 말아야함
        return [modified, `장${modified}`];
      }
      return value;
    } else if (value instanceof Array) {
      return value as string[];
    } else {
      return '';
    }
  };

  return (
    <MoveableView
      position={position}
      move={move}
      keyword={keyword}
      style={styles.container}>
      {properties.map((property, index) => {
        if (property !== 'children') {
          return (
            <View
              key={index.toString()}
              style={[
                styles.itemContainer,
                {
                  borderBottomWidth: properties.length - 1 !== index ? 1 : 0,
                },
              ]}>
              <Text style={styles.propertyText}>{mapPropName(property)}</Text>
              <HighlightableText
                text={filter(position.element, property)}
                keyword={keyword}
                style={styles.resultText}
              />
            </View>
          );
        }
        const childrens = position.element![property] as string[];
        return childrens.map((children, nestedIndex) => (
          <View
            key={`${index} ${nestedIndex}`}
            style={[
              styles.itemContainer,
              {
                borderBottomWidth:
                  properties.length - 1 !== index
                    ? 1
                    : childrens.length - 1 !== nestedIndex
                    ? 1
                    : 0,
              },
            ]}>
            <Text style={styles.propertyText}>{mapPropName(property)}</Text>
            <HighlightableText
              text={children}
              keyword={keyword}
              style={styles.resultText}
            />
          </View>
        ));
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
