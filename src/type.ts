import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FamilyTree } from './DataStructure';

interface Position<T> {
  element: T | null;
}

type BasisObj = {
  name: string;
  children: BasisObj[];
  isCenter?: boolean;
  [key: string]: unknown;
};

type InfoNode = {
  name: string;
  [key: string]: string | number;
};

type NodeFeature = {
  isCenter: boolean;
};

type FamilyNode = NodeFeature & InfoNode;

type SearchResultItem<T> = {
  properties: string[];
  position: Position<T>;
};

type SearchResult<T> = {
  keyword: string;
  results: SearchResultItem<T>[];
};

type PositionAndName = { name: string; position: Position<FamilyNode> };

type Info = {
  header: string;
  value: string | number | PositionAndName | PositionAndName[] | null;
};

type Infos = Info[];

type StackParamList = {
  Home: undefined;
  Info: { position: Position<FamilyNode>; keyword?: string };
};

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

type InfoScreenNavigationProp = StackNavigationProp<StackParamList, 'Info'>;

type InfoScreenRouteProp = RouteProp<StackParamList, 'Info'>;

type HomeScreenNavigationParameter = Parameters<
  HomeScreenNavigationProp['navigate']
>;

type HomeScreenProps = {
  tree: FamilyTree<FamilyNode>;
  navigation: HomeScreenNavigationProp;
};

type InfoScreenProps = {
  tree: FamilyTree<FamilyNode>;
  navigation: InfoScreenNavigationProp;
  route: InfoScreenRouteProp;
};

type HeaderProps = {
  children: string;
  keyword?: string;
};

type InfoListProps = {
  infos: Infos;
  keyword: string | undefined;
  push: InfoScreenNavigationProp['push'];
};

type HighlightableTextProps = {
  children: string | number;
  keyword: string | undefined;
  style?: {};
};

type MoveableViewProps = {
  children: React.ReactNode;
  position: Position<FamilyNode>;
  move: InfoScreenNavigationProp['push'];
  keyword?: string;
  style?: {};
};

type SearchContainerProps = {
  tree: FamilyTree<FamilyNode>;
  move: HomeScreenNavigationProp['navigate'];
  setSelectedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
};

type SearchboxProps = {
  tree: FamilyTree<FamilyNode>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  move: HomeScreenNavigationProp['navigate'];
  setSelectedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
};

type SearchResultProps = {
  position: Position<FamilyNode>;
  properties: string[];
  move: HomeScreenNavigationProp['navigate'];
  keyword: string;
};

type TreeContainerProps = {
  tree: FamilyTree<FamilyNode>;
  move: HomeScreenNavigationProp['navigate'];
  selectedPositions: Position<FamilyNode>[];
};

type TreeViewProps = {
  tree: JSX.Element;
  rootX: number;
};

type TreeProps = {
  tree: FamilyTree<FamilyNode>;
  setTree: React.Dispatch<React.SetStateAction<JSX.Element>>;
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

type SubtreeProps = {
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

type NodeProps = {
  position: Position<FamilyNode>;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  move: HomeScreenNavigationProp['navigate'];
  selectedPositions: Position<FamilyNode>[];
};

type BranchProps = {
  x: number;
  y: number;
  branchHeight: number;
  branchXs: number[];
};

export {
  Position,
  PositionAndName,
  SearchResult,
  SearchResultItem,
  BasisObj,
  NodeFeature,
  InfoNode,
  FamilyNode,
  Info,
  Infos,
  StackParamList,
  HomeScreenNavigationParameter,
  HomeScreenProps,
  InfoScreenProps,
  HeaderProps,
  InfoListProps,
  HighlightableTextProps,
  MoveableViewProps,
  SearchContainerProps,
  SearchboxProps,
  SearchResultProps,
  TreeContainerProps,
  TreeViewProps,
  TreeProps,
  SubtreeProps,
  NodeProps,
  BranchProps,
};
