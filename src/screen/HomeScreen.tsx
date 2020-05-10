import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import { HomeScreenProps, FamilyNode, Position } from '../type';
import { SearchContainer, TreeContainer } from '../component';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({
  tree,
  navigation: { navigate },
}) => {
  const [selectedPositions, setSelectedPositions] = useState<
    Position<FamilyNode>[]
  >([]);

  return (
    <View style={styles.container}>
      <TreeContainer
        tree={tree}
        move={navigate}
        selectedPositions={selectedPositions}
      />
      <SearchContainer
        tree={tree}
        move={navigate}
        setSelectedPositions={setSelectedPositions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
  },
});

export default HomeScreen;
