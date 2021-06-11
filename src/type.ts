import { RouteProp, NavigationContainerRef } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { PROPS_MAPPED_NAME } from './setting';

export interface Position<T> {
  element: T | null;
}

// data.json의 형태
export type BasisObj = {
  name: string;
  mother?: string | string[];
  spouse?: string | string[];
  birth?: string;
  children?: BasisObj[] | string[];
  isCenter?: boolean;
  [key: string]: unknown;
};

export type Properties = keyof typeof PROPS_MAPPED_NAME;

export type EssentialObj = { name: string; generation: number };

export type OptionalProp = Exclude<Properties, keyof EssentialObj>;

// 노드에서 갖는 기술적 정보
export type InfoNode = EssentialObj &
  {
    [key in OptionalProp]?: string | string[] | number;
  };

export type ID = string & { readonly brand: unique symbol };

// 노드에서 갖는 특징적 정보
export type NodeFeature = {
  id: ID;
  isCenter: boolean;
};
// 노드가 갖는 전체 정보
export type FamilyNode = NodeFeature & InfoNode;

export type SearchResultItem<T extends {}> = {
  properties: Exclude<keyof T, keyof NodeFeature>[];
  position: Position<T>;
};

export type SearchResult<T> = {
  keyword: string;
  results: SearchResultItem<T>[];
};

export type PositionAndName = { name: string; position: Position<FamilyNode> };

export type Info = {
  header: string;
  value:
    | string
    | string[]
    | number
    | PositionAndName
    | PositionAndName[]
    | null
    | undefined;
};

export type Infos = Info[];

export type StackParamList = {
  Home: { presentRoot: Position<FamilyNode> };
  Info: { position: Position<FamilyNode>; keyword?: string };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Home'
>;

export type InfoScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Info'
>;

export type HomeScreenRouteProp = RouteProp<StackParamList, 'Home'>;

export type InfoScreenRouteProp = RouteProp<StackParamList, 'Info'>;

export type HomeScreenNavigationParameter = Parameters<
  HomeScreenNavigationProp['navigate']
>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type InfoScreenProps = {
  navigation: InfoScreenNavigationProp;
  route: InfoScreenRouteProp;
};

export type HeaderProps = {
  children: string;
  keyword?: string;
};

export type InfoListProps = {
  infos: Infos;
  keyword: string | undefined;
  push: InfoScreenNavigationProp['push'];
};

export type HighlightableTextProps = {
  text: string | string[] | number;
  keyword: string | undefined;
  style?: {};
};

export type MoveableViewProps = {
  children: React.ReactNode;
  position: Position<FamilyNode>;
  move: InfoScreenNavigationProp['push'];
  keyword?: string;
  style?: {};
};

type foo = Parameters<HomeScreenNavigationProp['navigate']>;

export type SearchContainerProps = {
  isLoading: boolean;
  move: HomeScreenNavigationProp['navigate'];
  setSearchedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
  presentRoot: Position<FamilyNode>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

export type SearchboxProps = {
  move: HomeScreenNavigationProp['navigate'];
  setSearchedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
  presentRoot: Position<FamilyNode>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

export type SearchResultProps = {
  position: Position<FamilyNode>;
  properties: Properties[];
  move: HomeScreenNavigationProp['navigate'];
  keyword: string;
};

export type TreeContainerProps = {
  navigation: {
    navigate: HomeScreenNavigationProp['navigate'];
    push: HomeScreenNavigationProp['push'];
  };
  searchedPositions: Position<FamilyNode>[];
  presentRoot: Position<FamilyNode>;
  keyword: string;
};

export type TreeViewProps = {
  treeElement: JSX.Element | null;
  rootX: number;
  generationNodes: JSX.Element;
  generationDottedLines: (width?: number) => JSX.Element;
};

export type TreeComponentProps = {
  setTreeElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  searchedPositions: Position<FamilyNode>[];
  presentRoot: Position<FamilyNode>;
  rootX: number;
  navigation: {
    navigate: HomeScreenNavigationProp['navigate'];
    push: HomeScreenNavigationProp['push'];
  };
  keyword: string;
};

export type SubtreeComponentProps = {
  position: Position<FamilyNode>;
  navigation: {
    navigate: HomeScreenNavigationProp['navigate'];
    push: HomeScreenNavigationProp['push'];
  };
  x: number;
  y: number;
  searchedPositions: Position<FamilyNode>[];
  pressedPosition: Position<FamilyNode> | null;
  keyword: string;
};

export type NodeProps = {
  position: Position<FamilyNode>;
  x: number;
  y: number;
  color: string;
  navigation: {
    navigate: HomeScreenNavigationProp['navigate'];
    push: HomeScreenNavigationProp['push'];
  };
  searchedPositions: Position<FamilyNode>[];
  isBlur: boolean;
  keyword: string;
};

export type BranchProps = {
  x: number;
  y: number;
  branchHeight: number;
  branchXs: number[];
  isBlur: boolean;
};

export type GenerationNodeProps = {
  children: React.ReactChild;
  y: number;
};

export type PopupItems = { text: string; action: Function }[];

export type PopupProps = {
  visible: boolean;
  setInfo: React.Dispatch<React.SetStateAction<PopupInfo>>;
  x: number;
  y: number;
  items: PopupItems;
  cleanup: () => void;
};

export type PopupInfo = {
  visible: boolean;
  x: number;
  y: number;
  items: PopupItems;
  cleanup: () => void;
};

export type DrawerProps = {
  move: NavigationContainerRef['navigate'];
  closeDrawer: () => void;
  positions: Position<FamilyNode>[];
};
