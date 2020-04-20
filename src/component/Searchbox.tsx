import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { TreeUtilContext } from '../../App';
import { SearchboxProps, FamilyNode, SearchResultItem } from '../type';
import { createTree } from '../util';
import SearchResult from './SearchResult';

const Searchbox: React.FC<SearchboxProps> = ({ visible, setVisible, move }) => {
  const [value, setValue] = useState('');
  const [resultItems, setResultItems] = useState<
    SearchResultItem<FamilyNode>[]
  >([]);
  const { searchKeyword } = useContext(TreeUtilContext);

  /**
   * node의 하이라이트를 없앰
   */
  const clearHighlight = () => {
    resultItems.forEach(({ position }) => {
      if (position.element !== null) {
        position.element.isHighlight = false;
      }
    });
  };

  /**
   * 검색 결과를 SearchResults 배열로 리턴함
   */
  const returnSearchResults = (): JSX.Element[] => {
    const results: JSX.Element[] = [];
    resultItems.forEach(({ properties, position }) => {
      for (const property of properties) {
        results.push(
          <SearchResult
            position={position}
            property={property}
            move={move}
            keyword={value}
          />
        );
      }
    });
    return results;
  };

  useEffect(() => {
    if (value.length !== 0) {
      const { results } = searchKeyword(value);
      results.forEach(({ position }) => {
        if (position.element !== null) {
          position.element.isHighlight = true;
        }
      });
      setResultItems(results);
    }
    return clearHighlight;
  }, [value]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View>
        <View>
          <Ionicons name="magnify" size={32} color="grey" />
          <TextInput
            onChangeText={(text) => {
              setValue(text);
            }}
            value={value}
          />
          {value.length === 0 ? (
            ''
          ) : (
            <Ionicons name="cancel" size={32} color="red" />
          )}
        </View>
        {returnSearchResults()}
        <TouchableHighlight
          onPress={() => {
            setValue('');
            setResultItems([]);
            clearHighlight();
          }}>
          <Text>Clear</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Searchbox;
