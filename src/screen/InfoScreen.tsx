import React, {
  useLayoutEffect,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  Animated,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { removeProp, mapPropName, convertName } from '../util';
import { TreeContext, StoreContext } from '../context';
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
  ID,
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
  navigation: { push, setOptions },
  route: {
    params: { keyword, position },
  },
}) => {
  const [isFavorties, setIsFavorites] = useState(false);
  const scale = new Animated.Value(1);
  const { treeObj } = useContext(TreeContext);
  const { isIDIncluded, storeID, deleteID } = useContext(StoreContext);
  const { name, id, infos } = useMemo(() => {
    const { element } = position;
    const id: ID = element!.id;
    const infos: Infos = [];
    const filtered: InfoNode = removeProp(element!);
    const name = convertName(filtered);
    const father = returnParentNamePosition(treeObj, position);
    let children: string[] | PositionAndName[] | null;
    if (element!.children) {
      children = element!.children as string[];
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
    return { name, id, infos };
  }, []);

  const handleStarPress = () => {
    setIsFavorites((value) => !value);
    Animated.timing(scale, { toValue: 1.5, duration: 250 }).start();
    if (isFavorties) {
      ToastAndroid.showWithGravity(
        '즐겨찾기에 제거되었습니다',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      deleteID(id);
    } else {
      ToastAndroid.showWithGravity(
        '즐겨찾기에 추가되었습니다',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      storeID(id);
    }
  };

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
      headerRight: () => (
        <TouchableNativeFeedback
          onPress={handleStarPress}
          background={TouchableNativeFeedback.Ripple('#000', true)}>
          <Animated.View style={{ transform: [{ scale }] }}>
            {isFavorties ? (
              <Ionicons name="ios-star" size={30} color="#F8CC02" />
            ) : (
              <Ionicons name="ios-star" size={30} color="#fff" />
            )}
          </Animated.View>
        </TouchableNativeFeedback>
      ),
      headerRightContainerStyle: { marginRight: 15 },
    });
  }, [isFavorties]);

  useEffect(() => {
    setIsFavorites(isIDIncluded(id));
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
