import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createTree } from './src/util';
import { HomeScreen, InfoScreen } from './src/screen';
import { FamilyTree } from './src/DataStructure';
import {
  StackParamList,
  FamilyNode,
  Position,
  PositionAndName,
} from './src/type';
import data from './data.json';

const Stack = createStackNavigator<StackParamList<FamilyNode>>();

const tree: FamilyTree<FamilyNode> = createTree(data);

/**
 * 현재 포지션의 parent의 이름과 포지션을 반환함
 * @param position
 */
const returnParentNamePosition = (
  position: Position<FamilyNode>
): PositionAndName | null => {
  const parent: Position<FamilyNode> | null = tree.parent(position);
  if (parent === null) {
    return null;
  }
  const { element } = parent;
  if (element === null) {
    return null;
  }
  return {
    name: element.name,
    position: parent,
  };
};

/**
 * 현재 포지션의 children의 이름과 position을 배열로 반환함
 * @param position
 */
const returnChildrenNamePosition = (
  position: Position<FamilyNode>
): PositionAndName[] | null => {
  const arr: PositionAndName[] = [];
  for (const children of tree.children(position)) {
    const { element } = children;
    if (element !== null) {
      arr.push({
        name: element.name,
        position: children,
      });
    }
  }
  if (arr.length === 0) {
    return null;
  }
  return arr;
};

const TreeUtilContext = React.createContext({
  returnParentNamePosition,
  returnChildrenNamePosition,
  searchKeyword: tree.searchKeyword,
});

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <TreeUtilContext.Provider
        value={{
          returnParentNamePosition,
          returnChildrenNamePosition,
          searchKeyword: tree.searchKeyword,
        }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: '족보' }}
          />
          <Stack.Screen name="Info" component={InfoScreen} />
        </Stack.Navigator>
      </TreeUtilContext.Provider>
    </NavigationContainer>
  );
};

export { TreeUtilContext };
export default App;
