import React, { useContext } from 'react';
import { View } from 'react-native';

import { TreeUtilContext } from '../../App';
import { removeProp, mapPropName } from '../util';
import { InfoHeader, InfoList } from '../component';
import {
  InfoScreenProps,
  InfoNode,
  Infos,
  Info,
  PositionAndName,
} from '../type';

const InfoScreen: React.FC<InfoScreenProps> = ({
  navigation: { push, navigate, popToTop },
  route: {
    params: { keyword, position },
  },
}) => {
  const { returnParentNamePosition, returnChildrenNamePosition } = useContext(
    TreeUtilContext
  );
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
    const father = returnParentNamePosition(position);
    const children = returnChildrenNamePosition(position);
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
