import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  SearchboxProps,
  FamilyNode,
  SearchResultItem,
  Position,
} from '../type';
import SearchResult from './SearchResult';

const Searchbox: React.FC<SearchboxProps> = ({
  tree,
  visible,
  setVisible,
  move,
  setSelectedPositions,
}) => {
  const [value, setValue] = useState('');
  const [resultItems, setResultItems] = useState<
    SearchResultItem<FamilyNode>[]
  >([]);

  const { width, height } = Dimensions.get('window');

  /**
   *  info screen으로 이동할 때 modal안 보이게 하기 위해 변형함
   * @param text
   * @param obj
   */
  const modifiedMove = (text: string, obj: {}): void => {
    // TODO: text,obj 타입 세밀하게 설정해야 함
    setVisible(false);
    move(text, obj);
  };

  /**
   * 검색 결과를 SearchResults 배열로 리턴함
   */
  const returnSearchResults = (): JSX.Element[] => {
    const results: JSX.Element[] = [];
    let key = 0;
    resultItems.forEach(({ properties, position }) => {
      for (const property of properties) {
        results.push(
          <SearchResult
            key={key++}
            position={position}
            property={property}
            move={modifiedMove}
            keyword={value}
          />
        );
      }
    });
    return results;
  };

  useEffect(() => {
    if (value.length !== 0) {
      const { results } = tree.searchKeyword(value);
      const positions = results.map(({ position }) => position);
      setResultItems(results);
      setSelectedPositions(positions);
    } else {
      setResultItems([]);
      setSelectedPositions([]);
    }
  }, [value]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={[styles.screen, { width, height }]}>
        <View
          style={[
            styles.contentContainer,
            { width: width - 75, height: height - 100 },
          ]}>
          <View style={styles.searchContainer}>
            <TouchableHighlight
              onPress={() => {
                setVisible(false);
              }}
              style={styles.backwardButton}>
              <Ionicons name="ios-arrow-back" size={40} color="grey" />
            </TouchableHighlight>
            <TextInput
              onChangeText={(text) => {
                setValue(text);
              }}
              value={value}
              style={styles.input}
              placeholder="검색..."
            />
            {value.length === 0 ? null : (
              <TouchableHighlight
                onPress={() => {
                  setValue('');
                  setResultItems([]);
                  setSelectedPositions([]);
                }}
                style={styles.cancelButton}>
                <Ionicons name="ios-close" size={40} color="grey" />
              </TouchableHighlight>
            )}
          </View>
          <ScrollView
            style={[
              styles.resultContainer,
              { borderTopWidth: resultItems.length === 0 ? 0 : 1 },
            ]}>
            {returnSearchResults()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'transparent',
  },
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    borderRadius: 25,
  },
  backwardButton: {
    margin: 10,
    marginRight: 15,
  },
  input: {
    width: '100%',
    fontSize: 20,
  },
  cancelButton: {
    position: 'absolute',
    right: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
});

export default Searchbox;
