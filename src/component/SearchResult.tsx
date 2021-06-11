import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import MoveableView from './MoveableView';
import HighlightableText from './HighlightableText';
import { SearchResultProps, FamilyNode, Properties } from '../type';
import { mapPropName } from '../util';
import { LAST_NAME } from '../setting';

const SearchResult: React.FC<SearchResultProps> = ({
  position,
  properties,
  move,
  keyword,
}) => {
  const filter = (element: FamilyNode | null, property: Properties) => {
    if (element === null) {
      return '';
    }
    const value = element[property];
    if (typeof value === 'string' || typeof value === 'number') {
      if (property === 'name') {
        return [value.toString(), `${LAST_NAME}${value}`];
      }
      return value;
    } else if (value instanceof Array) {
      return value;
    } else {
      return '';
    }
  };

  return (
    <MoveableView
      position={position}
      move={move}
      keyword={keyword}
      style={styles.container}
    >
      {properties.map((property, index) => {
        if (property !== 'children' && property !== 'childrenName') {
          return (
            <View
              key={index.toString()}
              style={[
                styles.itemContainer,
                {
                  borderBottomWidth: properties.length - 1 !== index ? 1 : 0,
                },
              ]}
            >
              <Text style={styles.propertyText}>{mapPropName(property)}</Text>
              <HighlightableText
                text={filter(position.element, property)}
                keyword={keyword}
                style={styles.resultText}
              />
              {property !== 'name' ? (
                <Text style={styles.nameText}>({position.element!.name})</Text>
              ) : null}
            </View>
          );
        }
        const childrens = position.element![property] as string[];
        const filtered = childrens.filter((value) => value.includes(keyword));
        return filtered.map((children, nestedIndex) => (
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
            ]}
          >
            <Text style={styles.propertyText}>{mapPropName(property)}</Text>
            <HighlightableText
              text={children}
              keyword={keyword}
              style={styles.resultText}
            />
            <Text style={styles.nameText}>({position.element!.name})</Text>
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
    flexWrap: 'wrap',
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
  nameText: {
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'right',
  },
});

export default SearchResult;
