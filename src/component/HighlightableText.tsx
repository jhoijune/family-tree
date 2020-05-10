import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { HighlightableTextProps } from '../type';

const HighlightableText: React.FC<HighlightableTextProps> = ({
  text,
  keyword,
  style,
}) => {
  const createHighlightText = (text: string, keyword: string): JSX.Element => {
    let modified: string = text;
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
  };
  if (keyword) {
    if (text instanceof Array) {
      const [toShowText] = text;
      if (toShowText.includes(keyword)) {
        return createHighlightText(toShowText, keyword);
      } else {
        let len: number = keyword.length - 1;
        while (len > 0) {
          let startIndex: number = 0;
          while (startIndex + len <= keyword.length) {
            const slicedKeyword = keyword.slice(
              startIndex,
              startIndex + len + 1
            );
            if (toShowText.includes(slicedKeyword)) {
              return createHighlightText(toShowText, slicedKeyword);
            }
            startIndex += 1;
          }
          len -= 1;
        }
      }
    } else {
      const stringifyText: string = text.toString();
      return createHighlightText(stringifyText, keyword);
    }
  }
  if (text instanceof Array) {
    return <Text style={[styles.default, style]}>{text[0]}</Text>;
  }
  return <Text style={[styles.default, style]}>{text}</Text>;
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
