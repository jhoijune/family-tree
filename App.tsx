import React, { useRef, useEffect, MutableRefObject } from 'react';
import { ToastAndroid, BackHandler } from 'react-native';
import {
  NavigationContainer,
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createTree } from './src/util';
import { HomeScreen, InfoScreen } from './src/screen';
import { FamilyTree } from './src/DataStructure';
import { StackParamList, FamilyNode } from './src/type';
import data from './data.json';

const treeObj: FamilyTree<FamilyNode> = createTree(data, '장');

const Stack = createStackNavigator<StackParamList>();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#008ff8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const getActiveRouteIndex = (state: NavigationState): number => state.index;

const App: React.FC = () => {
  const isExitRef = useRef(false);
  const timeOutIdRef = useRef(0);
  const routeIndexRef: MutableRefObject<number> = useRef(0);
  const navigationRef: MutableRefObject<NavigationContainerRef | null> = useRef(
    null
  );

  const handleBackButton = () => {
    if (routeIndexRef.current === 0) {
      if (!isExitRef.current) {
        ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
        isExitRef.current = true;
        const id = setTimeout(() => {
          isExitRef.current = false;
        }, 2000);
        timeOutIdRef.current = id;
      } else {
        clearTimeout(timeOutIdRef.current);
        isExitRef.current = false;
        BackHandler.exitApp();
      }
    } else {
      navigationRef.current!.goBack();
    }
    return true;
  };

  useEffect(() => {
    const state = navigationRef.current!.getRootState();
    routeIndexRef.current = getActiveRouteIndex(state);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      isExitRef.current = false;
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        routeIndexRef.current = getActiveRouteIndex(state!);
      }}>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: '가계도',
            headerTitleAlign: 'center',
          }}>
          {(props) => <HomeScreen {...props} treeObj={treeObj} />}
        </Stack.Screen>
        <Stack.Screen name="Info">
          {(props) => <InfoScreen {...props} treeObj={treeObj} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
