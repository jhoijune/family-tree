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
  isHighlight: boolean;
  color: string | null;
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

type HomeScreenProps = {
  tree: FamilyTree<FamilyNode>;
  navigation: HomeScreenNavigationProp;
};

type InfoScreenProps = {
  tree: FamilyTree<FamilyNode>;
  navigation: InfoScreenNavigationProp;
  route: InfoScreenRouteProp;
};

type InfoHeaderProps = {
  children: string;
  keyword: string | undefined;
};

type InfoListProps = {
  infos: Infos;
  keyword: string | undefined;
  push: Function;
};

type HighlightableTextProps = {
  children: string | number;
  keyword: string | undefined;
  style?: {};
};

// TODO: move 파라미터 지정

type MoveableViewProps = {
  children: React.ReactNode;
  position: Position<FamilyNode>;
  move: Function;
  style?: {};
};

type SearchboxProps = {
  tree: FamilyTree<FamilyNode>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  move: Function;
};

type SearchResultProps = {
  position: Position<FamilyNode>;
  property: string;
  move: Function;
  keyword: string;
};

type TreeProps = {
  tree: FamilyTree<FamilyNode>;
  move: Function;
};

type SubtreeProps = {
  tree: FamilyTree<FamilyNode>;
  position: Position<FamilyNode>;
  move: Function;
  x: number;
  y: number;
  nodeWidth: number;
  nodeHeight: number;
  verticalInterval: number;
  horizontalInterval: number;
  colors: readonly string[];
};

type NodeProps = {
  position: Position<FamilyNode>;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  move: Function;
};

type BranchProps = {
  x: number;
  y: number;
  branchHeight: number;
  branchWidth: number;
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
  HomeScreenProps,
  InfoScreenProps,
  InfoHeaderProps,
  InfoListProps,
  HighlightableTextProps,
  MoveableViewProps,
  SearchboxProps,
  SearchResultProps,
  TreeProps,
  SubtreeProps,
  NodeProps,
  BranchProps,
};
