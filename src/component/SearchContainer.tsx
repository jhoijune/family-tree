import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SearchContainerProps } from '../type';
import Searchbox from './Searchbox';

const { height } = Dimensions.get('window');

const SearchContainer: React.FC<SearchContainerProps> = ({
  treeObj,
  isLoading,
  move,
  setSelectedPositions,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Searchbox
        treeObj={treeObj}
        visible={modalVisible}
        setVisible={setModalVisible}
        move={move}
        setSelectedPositions={setSelectedPositions}
      />
      {isLoading ? null : (
        <TouchableHighlight
          style={styles.magnify}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Ionicons name="ios-search" size={50} color="#919191" />
        </TouchableHighlight>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  magnify: {
    position: 'absolute',
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#919191',
    top: height - 150,
  },
});

export default SearchContainer;
