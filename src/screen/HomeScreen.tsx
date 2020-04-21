import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreenProps } from '../type';
import { Searchbox, Tree } from '../component';

const HomeScreen: React.FC<HomeScreenProps> = ({
  tree,
  navigation: { navigate },
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { height } = Dimensions.get('window');
  return (
    <View>
      {/*<Tree tree={tree} move={navigate} /> */}
      <Searchbox
        tree={tree}
        visible={modalVisible}
        setVisible={setModalVisible}
        move={navigate}
      />

      <TouchableHighlight
        style={[styles.magnify, { top: height - 150 }]}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Ionicons name="ios-search" size={50} color="#919191" />
      </TouchableHighlight>
    </View>
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

export default HomeScreen;
