import React, { useEffect, useMemo, useContext } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native';

import { DimensionsContext } from '../context';
import { PopupProps } from '../type';

const X_MARGIN: number = 50;
const Y_MARGIN: number = 50;
const BOX_WIDTH: number = 75; // 팝업 메시지 길이 최대로 맞춰야함
const BOX_HEIGHT: number = 30; // 팝업 메시지 개수에 따라 변경해야 함
const DURATION: number = 250;

const Popup: React.FC<PopupProps> = ({
  x,
  y,
  visible,
  setInfo,
  items,
  cleanup,
}) => {
  const { width, height } = useContext(DimensionsContext);
  const scale = new Animated.Value(0.01);
  const { top, left } = useMemo(() => {
    const boxHeight: number = BOX_HEIGHT * items.length;
    let left: number = 0;
    let top: number = 0;
    if (x + X_MARGIN + BOX_WIDTH <= width) {
      left = x + X_MARGIN;
    } else {
      left = x - X_MARGIN;
    }
    if (y + boxHeight / 2 <= height) {
      top = y + boxHeight / 2;
    } else {
      top = y - boxHeight;
    }
    return { top, left };
  }, [x, y]);

  const openPopup = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    cleanup();
    Animated.timing(scale, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setInfo((value) => ({ ...value, visible: false }));
    }, DURATION);
  };

  useEffect(() => {
    if (visible) {
      openPopup();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={closePopup}>
      <TouchableWithoutFeedback onPress={closePopup}>
        <View style={{ width, height }}>
          <Animated.View
            style={[
              styles.container,
              { top, left, transform: [{ scale: scale }] },
            ]}>
            {items.map(({ text, action }, index) => (
              <TouchableNativeFeedback
                key={index}
                onPress={() => {
                  action();
                }}
                background={TouchableNativeFeedback.Ripple('#000', true)}>
                <View
                  style={[
                    styles.item,
                    { width: BOX_WIDTH, height: BOX_HEIGHT },
                  ]}>
                  <Text style={styles.text}>{text}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 2,
    backgroundColor: '#fff',
    elevation: 15,
  },
  text: {
    fontSize: 15,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Popup;
