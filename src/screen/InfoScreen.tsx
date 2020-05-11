import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { removeProp, mapPropName } from '../util';
import { InfoList, HighlightableText } from '../component';
import {
  Position,
  InfoScreenProps,
  InfoNode,
  Infos,
  PositionAndName,
  FamilyNode,
  Info,
  Properties,
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
  treeObj,
  navigation: { push, setOptions },
  route: {
    params: { keyword, position },
  },
}) => {
  const { element } = position;
  let name: string = '';
  let infos: Infos = [];
  if (element) {
    const filtered: InfoNode = removeProp(element);
    if (typeof filtered['genealogical name'] !== 'undefined') {
      if (filtered.name === filtered['genealogical name']) {
        name = filtered.name;
      } else {
        name = `${filtered.name} (${filtered['genealogical name']})`;
      }
    } else {
      name = filtered.name;
    }
    const father = returnParentNamePosition(treeObj, position);
    let children: string[] | PositionAndName[] | null;
    if (element.children) {
      children = element.children as string[];
    } else {
      children = returnChildrenNamePosition(treeObj, position);
    }
    const combined: {
      name: string;
      father: PositionAndName | null;
      children: string[] | PositionAndName[] | null;
      [key: string]: Info['value'];
    } = {
      ...filtered,
      father,
      children,
    };
    const propOrder: Properties[] = [
      'birth',
      'deathday',
      'father',
      'mother',
      'spouse',
      'generation',
      'children',
    ];
    for (const prop of propOrder) {
      const mappedName = mapPropName(prop);
      infos.push({ header: mappedName, value: combined[prop] });
    }
  }

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <HighlightableText
          text={name}
          keyword={keyword}
          style={styles.header}
        />
      ),
      headerTitleAlign: 'center',
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <InfoList infos={infos} keyword={keyword} push={push} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EEF2F5',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default InfoScreen;
