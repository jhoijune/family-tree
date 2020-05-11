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
  HomeScreenNavigationParameter,
} from '../type';
import SearchResult from './SearchResult';

const { width, height } = Dimensions.get('window');

const Searchbox: React.FC<SearchboxProps> = ({
  treeObj,
  visible,
  setVisible,
  move,
  setSelectedPositions,
}) => {
  const [value, setValue] = useState('');
  const [resultItems, setResultItems] = useState<
    SearchResultItem<FamilyNode>[]
  >([]);
  /**
   *  info screen으로 이동할 때 modal안 보이게 하기 위해 변형함
   * @param text
   * @param obj
   */
  const modifiedMove = (...args: HomeScreenNavigationParameter): void => {
    setVisible(false);
    move(...args);
  };

  useEffect(() => {
    if (value.length !== 0) {
      const { results } = treeObj.searchKeyword(value);
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
      <View style={styles.screen}>
        <View style={styles.contentContainer}>
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
            {resultItems.map(({ properties, position }, index) => (
              <SearchResult
                key={index}
                position={position}
                properties={properties}
                move={modifiedMove}
                keyword={value}
                lastName={treeObj.lastName}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'transparent',
    width: width - 75,
    height: height - 100,
  },
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#919191',
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
    borderColor: '#919191',
  },
});

export default Searchbox;
