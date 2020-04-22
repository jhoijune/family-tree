import React, { useState } from 'react';
import { View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SearchContainerProps } from '../type';
import Searchbox from './Searchbox';

const SearchContainer: React.FC<SearchContainerProps> = ({
  tree,
  move,
  setSelectedPositions,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { height } = Dimensions.get('window');
  return (
    <>
      <Searchbox
        tree={tree}
        visible={modalVisible}
        setVisible={setModalVisible}
        move={move}
        setSelectedPositions={setSelectedPositions}
      />
      <TouchableHighlight
        style={[styles.magnify, { top: height - 150 }]}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Ionicons name="ios-search" size={50} color="#919191" />
      </TouchableHighlight>
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
  },
});

export default SearchContainer;
