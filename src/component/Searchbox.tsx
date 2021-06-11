import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  SearchboxProps,
  FamilyNode,
  SearchResultItem,
  HomeScreenNavigationParameter,
} from '../type';
import {
  TreeContext,
  DimensionsContext,
  ExModalContext,
  ModalContext,
} from '../context';
import SearchResult from './SearchResult';

//FIXME: info에서 뒤로 갈때 모달 켜져있게

const Searchbox: React.FC<SearchboxProps> = ({
  move,
  setSearchedPositions,
  presentRoot,
  keyword,
  setKeyword,
}) => {
  const [resultItems, setResultItems] = useState<
    SearchResultItem<FamilyNode>[]
  >([]);
  const { treeObj } = useContext(TreeContext);
  const { visible, setVisible } = useContext(ModalContext);
  const { width, height } = useContext(DimensionsContext);
  const exModalVisibleRef = useContext(ExModalContext);

  /**
   *  info screen으로 이동할 때 modal안 보이게 하기 위해 변형함
   * @param text
   * @param obj
   */
  const modifiedMove = (...args: HomeScreenNavigationParameter): void => {
    setVisible(false);
    move(...args);
    if (exModalVisibleRef !== null) {
      exModalVisibleRef.current = true;
    }
  };

  useEffect(() => {
    if (keyword.length !== 0) {
      const { results } = treeObj.searchKeyword(keyword, presentRoot);
      const positions = results.map(({ position }) => position);
      setResultItems(results);
      setSearchedPositions(positions);
    } else {
      setResultItems([]);
      setSearchedPositions([]);
    }
  }, [keyword]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setVisible(false);
        }}
      >
        <View style={[styles.screen, { width, height }]}>
          <View
            style={[
              styles.contentContainer,
              { width: width - 75, height: height - 100 },
            ]}
          >
            <View style={styles.searchContainer}>
              <TouchableNativeFeedback
                onPress={() => {
                  setVisible(false);
                }}
                background={TouchableNativeFeedback.Ripple('#000', true)}
              >
                <View style={styles.backwardButton}>
                  <Ionicons name="ios-arrow-back" size={40} color="grey" />
                </View>
              </TouchableNativeFeedback>
              <TextInput
                onChangeText={(text) => {
                  setKeyword(text);
                }}
                value={keyword}
                style={styles.input}
                placeholder="검색..."
              />
              {keyword.length === 0 ? null : (
                <TouchableNativeFeedback
                  onPress={() => {
                    setKeyword('');
                    setResultItems([]);
                    setSearchedPositions([]);
                  }}
                  background={TouchableNativeFeedback.Ripple('#000', true)}
                >
                  <View style={styles.cancelButton}>
                    <Ionicons name="ios-close" size={40} color="grey" />
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
            <ScrollView
              style={[
                styles.resultContainer,
                { borderTopWidth: resultItems.length === 0 ? 0 : 1 },
              ]}
            >
              {resultItems.map(({ properties, position }, index) => (
                <SearchResult
                  key={index}
                  position={position}
                  properties={properties}
                  move={modifiedMove}
                  keyword={keyword}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
