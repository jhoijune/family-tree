import React, { useState, useContext } from 'react';
import { View, StyleSheet, DrawerLayoutAndroid } from 'react-native';

import { HomeScreenProps, FamilyNode, Position, PopupInfo } from '../type';
import { SearchContainer, TreeContainer, Popup, Drawer } from '../component';
import { LoadingContext, PopupContext, DimensionsContext } from '../context';

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation: { navigate, push, setOptions },
  route: {
    params: { presentRoot },
  },
}) => {
  const [searchedPositions, setSearchedPositions] = useState<
    Position<FamilyNode>[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupInfo, setPopupInfo] = useState<PopupInfo>({
    visible: false,
    x: 0,
    y: 0,
    items: [],
    cleanup: () => {},
  });
  const { width, height } = useContext(DimensionsContext);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      <PopupContext.Provider
        value={{
          setInfo: setPopupInfo,
        }}>
        <View style={[styles.container, { width, height }]}>
          <TreeContainer
            navigation={{ navigate, push }}
            searchedPositions={searchedPositions}
            presentRoot={presentRoot}
          />
          <SearchContainer
            isLoading={isLoading}
            move={navigate}
            setSearchedPositions={setSearchedPositions}
            presentRoot={presentRoot}
          />
        </View>
        <Popup
          visible={popupInfo.visible}
          setInfo={setPopupInfo}
          x={popupInfo.x}
          y={popupInfo.y}
          items={popupInfo.items}
          cleanup={popupInfo.cleanup}
        />
      </PopupContext.Provider>
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default HomeScreen;
