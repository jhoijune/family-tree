import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createTree } from './src/util';
import { HomeScreen, InfoScreen } from './src/screen';
import { FamilyTree } from './src/DataStructure';
import { StackParamList, FamilyNode } from './src/type';
import data from './data.json';

const tree: FamilyTree<FamilyNode> = createTree(data);

const Stack = createStackNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: '족보' }}>
          {(props) => <HomeScreen {...props} tree={tree} />}
        </Stack.Screen>
        <Stack.Screen name="Info">
          {(props) => <InfoScreen {...props} tree={tree} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
