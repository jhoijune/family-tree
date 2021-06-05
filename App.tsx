import React, { useRef, useEffect, MutableRefObject, useState } from 'react';
import {
  ToastAndroid,
  BackHandler,
  Dimensions,
  ScaledSize,
  DrawerLayoutAndroid,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { lastName } from './src/setting';
import { createTree } from './src/util';
import { HomeScreen, InfoScreen } from './src/screen';
import { Drawer } from './src/component';
import { FamilyTree } from './src/DataStructure';
import { StackParamList, FamilyNode, ID, Position } from './src/type';
import { TreeContext, DimensionsContext, StoreContext } from './src/context';
import data from './data.json';

const treeObj: FamilyTree<FamilyNode> = createTree(data, lastName);

const Stack = createStackNavigator<StackParamList>();

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#008ff8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const getActiveRouteIndex = (state: NavigationState): number => state.index;

const STORAGE_KEY = "JANG'S_FAMILY_TREE_FAVORITES";

const App: React.FC = () => {
  const [isDrawerClosed, setIsDrawerClosed] = useState(true);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [favoritesIDs, setFavoritesIDs] = useState<ID[]>([]);
  const isExitRef = useRef(false);
  const isDrawerClosedRef = useRef(isDrawerClosed);
  const timeOutIdRef = useRef<null | NodeJS.Timeout>(null);
  const routeIndexRef: MutableRefObject<number> = useRef(0);
  const navigationRef: MutableRefObject<NavigationContainerRef | null> =
    useRef(null);
  const drawerRef: MutableRefObject<DrawerLayoutAndroid | null> = useRef(null);
  isDrawerClosedRef.current = isDrawerClosed;

  const handleBackButton = () => {
    if (!isDrawerClosedRef.current) {
      drawerRef.current!.closeDrawer();
    } else if (routeIndexRef.current === 0) {
      if (!isExitRef.current) {
        ToastAndroid.showWithGravity(
          '한번 더 누르시면 종료됩니다.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        isExitRef.current = true;
        const id = setTimeout(() => {
          isExitRef.current = false;
        }, 2000);
        timeOutIdRef.current = id;
      } else {
        if (timeOutIdRef.current !== null) {
          clearTimeout(timeOutIdRef.current);
        }
        isExitRef.current = false;
        BackHandler.exitApp();
      }
    } else {
      navigationRef.current!.goBack();
    }
    return true;
  };

  const handleDimensionChange = ({ window }: { window: ScaledSize }) => {
    setDimensions(window);
  };

  useEffect(() => {
    const state = navigationRef.current!.getRootState();
    routeIndexRef.current = getActiveRouteIndex(state);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      isExitRef.current = false;
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      Dimensions.removeEventListener('change', handleDimensionChange);
    };
  }, []);

  const getIDs = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue !== null ? (JSON.parse(jsonValue) as ID[]) : null;
    } catch (error) {
      console.error(error);
    }
  };

  const isIDIncluded = (id: ID): boolean => {
    if (favoritesIDs.includes(id)) {
      return true;
    }
    return false;
  };

  const storeID = async (id: ID) => {
    try {
      const IDs = await getIDs();
      if (IDs != null) {
        if (!IDs.includes(id)) {
          IDs.push(id);
          const stringifiedIDs = JSON.stringify(IDs);
          await AsyncStorage.setItem(STORAGE_KEY, stringifiedIDs);
          setFavoritesIDs(IDs);
        }
      } else {
        const stringifiedIDs = JSON.stringify([id]);
        await AsyncStorage.setItem(STORAGE_KEY, stringifiedIDs);
        setFavoritesIDs([id]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteID = async (id: ID) => {
    try {
      const IDs = await getIDs();
      if (IDs != null) {
        const filteredIDs = IDs.filter((value) => value !== id);
        const stringifiedIDs = JSON.stringify(filteredIDs);
        await AsyncStorage.setItem(STORAGE_KEY, stringifiedIDs);
        setFavoritesIDs(filteredIDs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const findIDMatchedPositions = () => {
    const positions: Position<FamilyNode>[] = [];
    favoritesIDs.forEach((ID) => {
      for (const position of treeObj.breadthFirst()) {
        if (position.element !== null) {
          const {
            element: { id },
          } = position;
          if (ID === id) {
            positions.push(position);
          }
        }
      }
    });
    return positions;
  };

  useEffect(() => {
    (async () => {
      const IDs = await getIDs();
      if (IDs != null) {
        setFavoritesIDs(IDs);
      }
    })();
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="#008ff8" animated />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={(state) => {
          routeIndexRef.current = getActiveRouteIndex(state!);
        }}
      >
        <TreeContext.Provider value={{ treeObj }}>
          <DimensionsContext.Provider value={dimensions}>
            <StoreContext.Provider
              value={{ getIDs, isIDIncluded, storeID, deleteID }}
            >
              <DrawerLayoutAndroid
                ref={drawerRef}
                drawerWidth={200}
                onDrawerOpen={() => {
                  setIsDrawerClosed(false);
                }}
                onDrawerClose={() => {
                  setIsDrawerClosed(true);
                }}
                drawerPosition={'right'}
                drawerLockMode={isDrawerClosed ? 'locked-closed' : 'unlocked'}
                renderNavigationView={() => (
                  <Drawer
                    move={
                      navigationRef.current
                        ? navigationRef.current.navigate
                        : () => {}
                    }
                    closeDrawer={() => {
                      if (drawerRef.current) {
                        drawerRef.current.closeDrawer();
                      }
                    }}
                    positions={findIDMatchedPositions()}
                  />
                )}
                drawerBackgroundColor="transparent"
              >
                <Stack.Navigator
                  initialRouteName="Home"
                  screenOptions={screenOptions}
                >
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      headerTitle: '가계도',
                      headerTitleAlign: 'center',
                      headerRight: () => (
                        <TouchableNativeFeedback
                          onPress={() => {
                            if (drawerRef.current) {
                              drawerRef.current.openDrawer();
                            }
                          }}
                          background={TouchableNativeFeedback.Ripple(
                            '#888',
                            true
                          )}
                        >
                          <Ionicons name="ios-menu" size={40} color="#fff" />
                        </TouchableNativeFeedback>
                      ),
                      headerRightContainerStyle: { marginRight: 15 },
                    }}
                    initialParams={{ presentRoot: treeObj.root()! }}
                  />
                  <Stack.Screen name="Info" component={InfoScreen} />
                </Stack.Navigator>
              </DrawerLayoutAndroid>
            </StoreContext.Provider>
          </DimensionsContext.Provider>
        </TreeContext.Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
