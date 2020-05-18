import React, { useContext } from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  Alert,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MoveableView from './MoveableView';
import { convertName } from '../util';
import { DrawerProps, InfoScreenNavigationProp } from '../type';
import { StoreContext } from '../context';

type Args = Parameters<InfoScreenNavigationProp['push']>;

const Drawer: React.FC<DrawerProps> = ({ move, closeDrawer, positions }) => {
  const { deleteID } = useContext(StoreContext);
  const handleMove = (...args: Args) => {
    move(...args);
    closeDrawer();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>즐겨찾기</Text>
      </View>
      <View style={styles.list}>
        {positions.map((position, index) => (
          <MoveableView
            key={index}
            position={position}
            move={handleMove}
            style={[
              styles.item,
              { borderBottomWidth: positions.length - 1 === index ? 1 : 0 },
            ]}>
            <TouchableNativeFeedback
              onPress={() => {
                Alert.alert('삭제', '즐겨찾기에서 삭제하시겠습니끼?', [
                  {
                    text: '예',
                    onPress: () => {
                      deleteID(position.element!.id);
                      ToastAndroid.showWithGravity(
                        '즐겨찾기에 제거되었습니다',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                      );
                    },
                  },
                  {
                    text: '아니오',
                    style: 'cancel',
                  },
                ]);
              }}
              background={TouchableNativeFeedback.Ripple('#000', true)}>
              <Ionicons name="ios-star" size={30} color="#F8CC02" />
            </TouchableNativeFeedback>
            <Text style={[styles.defaultFont, { marginLeft: 15 }]}>
              {convertName(position.element!)}
            </Text>
          </MoveableView>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  header: {
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#333333',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingLeft: 10,
    borderColor: '#ddd',
    borderTopWidth: 1,
  },
  defaultFont: {
    fontSize: 15,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default Drawer;
