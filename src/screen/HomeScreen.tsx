import React, { useState, createContext } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import { HomeScreenProps, FamilyNode, Position } from '../type';
import { SearchContainer, TreeContainer } from '../component';

const { width, height } = Dimensions.get('window');

const LoadingContext = createContext({
  toggle: () => {},
});

const HomeScreen: React.FC<HomeScreenProps> = ({
  treeObj,
  navigation: { navigate },
}) => {
  const [selectedPositions, setSelectedPositions] = useState<
    Position<FamilyNode>[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggle = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ toggle }}>
      <View style={styles.container}>
        <TreeContainer
          treeObj={treeObj}
          move={navigate}
          selectedPositions={selectedPositions}
        />
        <SearchContainer
          treeObj={treeObj}
          isLoading={isLoading}
          move={navigate}
          setSelectedPositions={setSelectedPositions}
        />
      </View>
    </LoadingContext.Provider>
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
export { LoadingContext };
