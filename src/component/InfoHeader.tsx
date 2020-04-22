import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InfoHeaderProps } from '../type';
import HighlightableText from './HighlightableText';

const InfoHeader: React.FC<InfoHeaderProps> = ({ children, keyword }) => (
  <View style={styles.container}>
    <HighlightableText keyword={keyword} style={styles.text}>
      {children}
    </HighlightableText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default InfoHeader;
