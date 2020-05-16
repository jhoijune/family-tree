import React, { useEffect, useMemo, useContext } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { DimensionsContext } from '../context';
import { PopupProps } from '../type';

const X_MARGIN: number = 10;
const BOX_WIDTH: number = 60; // 팝업 메시지 길이 최대로 맞춰야함
const BOX_HEIGHT: number = 20; // 팝업 메시지 개수에 따라 변경해야 함
const DURATION: number = 250;

const Popup: React.FC<PopupProps> = ({
  x,
  y,
  visible,
  setInfo,
  items,
  cleanup,
}) => {
  // FIXME: 처음 열 때 2번 열리고 스타일 깔끔하게
  const { width, height } = useContext(DimensionsContext);
  const scale = new Animated.Value(0);
  const { top, left } = useMemo(() => {
    const boxHeight: number = BOX_HEIGHT * items.length;
    let top: number = y + boxHeight / 2 + 40;
    let left: number = x + X_MARGIN + BOX_WIDTH;
    if (left > width) {
      left = x - X_MARGIN - BOX_WIDTH;
    }
    if (top > height) {
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
              <TouchableOpacity
                key={index}
                onPress={() => {
                  action();
                }}>
                <View style={[{ width: BOX_WIDTH, height: BOX_HEIGHT }]}>
                  <Text style={styles.text}>{text}</Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: 'white',
    elevation: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default Popup;
