import React from 'react';
import { View, Text } from 'react-native';

import { InfoHeaderProps } from '../type';
import HighlightableText from './HighlightableText';

const InfoHeader: React.FC<InfoHeaderProps> = ({ children, keyword }) => (
  <View>
    <HighlightableText keyword={keyword}>{children}</HighlightableText>
  </View>
);

export default InfoHeader;
