import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FamilyTree } from './DataStructure';

export interface Position<T> {
  element: T | null;
}

export type BasisObj = {
  name: string;
  children: BasisObj[];
  isCenter?: boolean;
  [key: string]: unknown;
};

export type InfoNode = {
  name: string;
  [key: string]: string | number;
};

export type NodeFeature = {
  isCenter: boolean;
};

export type FamilyNode = NodeFeature & InfoNode;

export type SearchResultItem<T> = {
  properties: string[];
  position: Position<T>;
};

export type SearchResult<T> = {
  keyword: string;
  results: SearchResultItem<T>[];
};

export type PositionAndName = { name: string; position: Position<FamilyNode> };

export type Info = {
  header: string;
  value: string | number | PositionAndName | PositionAndName[] | null;
};

export type Infos = Info[];

export type StackParamList = {
  Home: undefined;
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

export type InfoScreenRouteProp = RouteProp<StackParamList, 'Info'>;

export type HomeScreenNavigationParameter = Parameters<
  HomeScreenNavigationProp['navigate']
>;

export type HomeScreenProps = {
  tree: FamilyTree<FamilyNode>;
  navigation: HomeScreenNavigationProp;
};

export type InfoScreenProps = {
  tree: FamilyTree<FamilyNode>;
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
  children: string | number;
  keyword: string | undefined;
  style?: {};
};

export type MoveableViewProps = {
  children: React.ReactChild;
  position: Position<FamilyNode>;
  move: InfoScreenNavigationProp['push'];
  keyword?: string;
  style?: {};
};

export type SearchContainerProps = {
  tree: FamilyTree<FamilyNode>;
  move: HomeScreenNavigationProp['navigate'];
  setSelectedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
};

export type SearchboxProps = {
  tree: FamilyTree<FamilyNode>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  move: HomeScreenNavigationProp['navigate'];
  setSelectedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
};

export type SearchResultProps = {
  position: Position<FamilyNode>;
  properties: string[];
  move: HomeScreenNavigationProp['navigate'];
  keyword: string;
};

export type TreeContainerProps = {
  tree: FamilyTree<FamilyNode>;
  move: HomeScreenNavigationProp['navigate'];
  selectedPositions: Position<FamilyNode>[];
};

export type TreeViewProps = {
  tree: JSX.Element | null;
  rootX: number;
  generationNodes: JSX.Element;
  generationDottedLines: (width?: number) => JSX.Element;
};

export type TreeProps = {
  tree: FamilyTree<FamilyNode>;
  setTree: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  selectedPositions: Position<FamilyNode>[];
  root: Position<FamilyNode>;
  rootX: number;
  padding: number;
  nodeWidth: number;
  nodeHeight: number;
  colors: readonly string[];
  move: HomeScreenNavigationProp['navigate'];
  verticalInterval: number;
  horizontalInterval: number;
};

export type SubtreeProps = {
  tree: FamilyTree<FamilyNode>;
  position: Position<FamilyNode>;
  move: HomeScreenNavigationProp['navigate'];
  x: number;
  y: number;
  nodeWidth: number;
  nodeHeight: number;
  verticalInterval: number;
  horizontalInterval: number;
  colors: readonly string[];
  selectedPositions: Position<FamilyNode>[];
};

export type NodeProps = {
  position: Position<FamilyNode>;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  move: HomeScreenNavigationProp['navigate'];
  selectedPositions: Position<FamilyNode>[];
};

export type BranchProps = {
  x: number;
  y: number;
  branchHeight: number;
  branchXs: number[];
};

export type GenerationNodeProps = {
  children: React.ReactChild;
  y: number;
  width: number;
  height: number;
};
