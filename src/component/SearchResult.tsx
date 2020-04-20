import React from 'react';
import { Text } from 'react-native';

import MoveableView from './MoveableView';
import HighlightableText from './HighlightableText';
import { SearchResultProps, FamilyNode } from '../type';
import { mapPropName } from '../util';

const SearchResult: React.FC<SearchResultProps<FamilyNode>> = ({
  position,
  property,
  move,
  keyword,
}) => {
  return (
    <MoveableView position={position} move={move}>
      <Text>{mapPropName(property)}</Text>
      <HighlightableText keyword={keyword}>
        {position.element !== null ? position.element[property] : ''}
      </HighlightableText>
    </MoveableView>
  );
};

export default SearchResult;
