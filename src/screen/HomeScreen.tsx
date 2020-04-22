import React, { useState } from 'react';
import { View } from 'react-native';

import { HomeScreenProps, FamilyNode, Position } from '../type';
import { SearchContainer, Tree } from '../component';

const HomeScreen: React.FC<HomeScreenProps> = ({
  tree,
  navigation: { navigate },
}) => {
  const [selectedPositions, setSelectedPositions] = useState<
    Position<FamilyNode>[]
  >([]);
  return (
    <View>
      <Tree tree={tree} move={navigate} selectedPositions={selectedPositions} />
      <SearchContainer
        tree={tree}
        move={navigate}
        setSelectedPositions={setSelectedPositions}
      />
    </View>
  );
};

export default HomeScreen;
