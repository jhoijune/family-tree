import React from 'react';
import { View } from 'react-native';

import { removeProp, mapPropName } from '../util';
import { InfoHeader, InfoList } from '../component';
import {
  Position,
  InfoScreenProps,
  InfoNode,
  Infos,
  Info,
  PositionAndName,
  FamilyNode,
} from '../type';
import { FamilyTree } from '../DataStructure';

/**
 * 현재 포지션의 parent의 이름과 포지션을 반환함
 * @param position
 */
const returnParentNamePosition = (
  tree: FamilyTree<FamilyNode>,
  position: Position<FamilyNode>
): PositionAndName | null => {
  const parent: Position<FamilyNode> | null = tree.parent(position);
  if (parent === null) {
    return null;
  }
  const { element } = parent;
  if (element === null) {
    return null;
  }
  return {
    name: element.name,
    position: parent,
  };
};

/**
 * 현재 포지션의 children의 이름과 position을 배열로 반환함
 * @param position
 */
const returnChildrenNamePosition = (
  tree: FamilyTree<FamilyNode>,
  position: Position<FamilyNode>
): PositionAndName[] | null => {
  const arr: PositionAndName[] = [];
  for (const children of tree.children(position)) {
    const { element } = children;
    if (element !== null) {
      arr.push({
        name: element.name,
        position: children,
      });
    }
  }
  if (arr.length === 0) {
    return null;
  }
  return arr;
};

const InfoScreen: React.FC<InfoScreenProps> = ({
  tree,
  navigation: { push },
  route: {
    params: { keyword, position },
  },
}) => {
  const { element } = position;
  let name: string = '';
  let infos: Infos = [];
  if (element) {
    const filtered: InfoNode = removeProp(element);
    if (filtered.name === filtered['genealogical name']) {
      name = filtered.name;
    } else {
      name = `${filtered.name} (${filtered['genealogical name']})`;
    }
    const father = returnParentNamePosition(tree, position);
    const children = returnChildrenNamePosition(tree, position);
    const combined: {
      name: string;
      father: PositionAndName | null;
      children: PositionAndName[] | null;
      [key: string]:
        | string
        | number
        | PositionAndName
        | PositionAndName[]
        | null;
    } = {
      ...filtered,
      father,
      children,
    };
    const propOrder = ['father', 'mother', 'birth', 'generation', 'children'];
    for (const prop of propOrder) {
      const mappedName = mapPropName(prop);
      infos.push({ header: mappedName!, value: combined[prop] });
    }
  }

  return (
    <View>
      <InfoHeader keyword={keyword}>{name}</InfoHeader>
      <InfoList infos={infos} keyword={keyword} push={push} />
    </View>
  );
};

export default InfoScreen;
