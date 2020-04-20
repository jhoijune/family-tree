import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreenProps } from '../type';
import { Searchbox, Tree } from '../component';

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation: { navigate },
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Tree />
      <Searchbox
        visible={modalVisible}
        setVisible={setModalVisible}
        move={navigate}
      />
      <TouchableHighlight
        style={{ position: 'absolute', left: 10, bottom: 10 }}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Ionicons name="magnify" size={32} color="white" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
