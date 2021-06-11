import React, { useState, useEffect, useContext } from 'react';
import { G } from 'react-native-svg';

import SubtreeComponent from './SubtreeComponent';
import Node from './Node';
import { TreeContext, PressedContext } from '../context';
import { TreeComponentProps, Position, FamilyNode } from '../type';
import { TREE_SETTING } from '../setting';

const TreeComponent: React.FC<TreeComponentProps> = ({
  setTreeElement,
  searchedPositions,
  presentRoot,
  rootX,
  navigation,
  keyword,
}) => {
  const [pressedPosition, setPressedPosition] =
    useState<Position<FamilyNode> | null>(null);
  const { treeObj } = useContext(TreeContext);
  const { padding, colors } = TREE_SETTING;
  const depth = treeObj.depth(presentRoot);
  const colorInd = depth % colors.length;

  useEffect(() => {
    setTreeElement(
      <PressedContext.Provider value={{ setPressedPosition }}>
        <G>
          <Node
            position={presentRoot}
            x={rootX}
            y={padding}
            color={colors[colorInd]}
            navigation={navigation}
            searchedPositions={searchedPositions}
            isBlur={!!pressedPosition && pressedPosition !== presentRoot}
            keyword={keyword}
          />
          <SubtreeComponent
            position={presentRoot}
            navigation={navigation}
            x={rootX}
            y={padding}
            searchedPositions={searchedPositions}
            pressedPosition={
              pressedPosition && pressedPosition === presentRoot
                ? null
                : pressedPosition
            }
            keyword={keyword}
          />
        </G>
      </PressedContext.Provider>
    );
  }, [searchedPositions, pressedPosition]);

  return null;
};

export default TreeComponent;
