import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { HighlightableTextProps } from '../type';

const HighlightableText: React.FC<HighlightableTextProps> = ({
  children,
  keyword,
  style,
}) => {
  if (keyword) {
    let modified: string = children.toString();
    const splitText: { isHighlight: boolean; text: string }[] = [];
    const regExp: RegExp = new RegExp(keyword, 'g');
    const keywordLen: number = keyword.length;
    while (true) {
      const index: number = modified.search(regExp);
      if (index === -1) {
        splitText.push({ isHighlight: false, text: modified });
        break;
      } else {
        if (index !== 0) {
          splitText.push({
            isHighlight: false,
            text: modified.slice(0, index),
          });
        }
        splitText.push({
          isHighlight: true,
          text: modified.slice(index, index + keywordLen),
        });
        modified = modified.slice(index + keywordLen);
      }
    }

    return (
      <>
        <Text style={[styles.default, style]}>
          {splitText.map(({ isHighlight, text }, index) => {
            if (isHighlight) {
              return (
                <Text key={index} style={styles.highlight}>
                  {text}
                </Text>
              );
            }
            return <React.Fragment key={index}>{text}</React.Fragment>;
          })}
        </Text>
      </>
    );
  }
  return <Text style={[styles.default, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
  },
  highlight: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default HighlightableText;
