import React, { useContext } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ResetButtonProps } from '../type';
import { LoadingContext } from '../context';

const ResetButton: React.FC<ResetButtonProps> = ({ isLoading }) => {
  const { setIsLoading } = useContext(LoadingContext);

  return (
    !isLoading && (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#000', true)}
        onPress={() => {
          setIsLoading(true);
        }}
      >
        <View style={[styles.container]}>
          <MaterialCommunityIcons
            name="image-filter-center-focus-weak"
            size={50}
            color="#919191"
          />
        </View>
      </TouchableNativeFeedback>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#919191',
  },
});

export default ResetButton;
