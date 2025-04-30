import React, { useContext } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SearchContainerProps } from '../type';
import Searchbox from './Searchbox';
import { ModalContext } from '../context';

const SearchContainer: React.FC<SearchContainerProps> = ({
  isLoading,
  move,
  setSearchedPositions,
  presentRoot,
  keyword,
  setKeyword,
}) => {
  const { setVisible } = useContext(ModalContext);

  return (
    <>
      <Searchbox
        move={move}
        setSearchedPositions={setSearchedPositions}
        presentRoot={presentRoot}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      {isLoading ? null : (
        <TouchableNativeFeedback
          onPress={() => {
            setVisible(true);
          }}
          background={TouchableNativeFeedback.Ripple('#000', true)}
        >
          <View style={[styles.magnify]}>
            <Ionicons name="search" size={50} color="#919191" />
          </View>
        </TouchableNativeFeedback>
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
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#919191',
  },
});

export default SearchContainer;
