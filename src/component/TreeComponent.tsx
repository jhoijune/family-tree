import React, { useState, useEffect, useContext } from 'react';
import { G } from 'react-native-svg';

import SubtreeComponent from './SubtreeComponent';
import Node from './Node';
import { TreeContext, PressedContext } from '../context';
import { TreeComponentProps, Position, FamilyNode } from '../type';
import { treeSetting } from '../setting';

const TreeComponent: React.FC<TreeComponentProps> = ({
  setTreeElement,
  searchedPositions,
  presentRoot,
  rootX,
  navigation,
}) => {
  const [pressedPosition, setPressedPosition] = useState<Position<
    FamilyNode
  > | null>(null);
  const { treeObj } = useContext(TreeContext);
  const { padding, colors } = treeSetting;
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
          />
        </G>
      </PressedContext.Provider>
    );
  }, [searchedPositions, pressedPosition]);

  return null;
};

export default TreeComponent;
