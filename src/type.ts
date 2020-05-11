import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FamilyTree } from './DataStructure';
import { infoProps } from './setting';

export interface Position<T> {
  element: T | null;
}

export type BasisObj = {
  name: string;
  children: BasisObj[] | string[];
  isCenter?: boolean;
  [key: string]: unknown;
};

export type Properties = keyof typeof infoProps;

export type EssensitalObj = { name: string; generation: number };

export type OptionalProp = Exclude<Properties, keyof EssensitalObj>;

export type InfoNode = EssensitalObj &
  { [key in OptionalProp]?: string | string[] | number };

export type NodeFeature = {
  isCenter: boolean;
};

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
  treeObj: FamilyTree<FamilyNode>;
  navigation: HomeScreenNavigationProp;
};

export type InfoScreenProps = {
  treeObj: FamilyTree<FamilyNode>;
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

export type SearchContainerProps = {
  treeObj: FamilyTree<FamilyNode>;
  isLoading: boolean;
  move: HomeScreenNavigationProp['navigate'];
  setSelectedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
};

export type SearchboxProps = {
  treeObj: FamilyTree<FamilyNode>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  move: HomeScreenNavigationProp['navigate'];
  setSelectedPositions: React.Dispatch<
    React.SetStateAction<Position<FamilyNode>[]>
  >;
};

export type SearchResultProps = {
  position: Position<FamilyNode>;
  properties: Properties[];
  move: HomeScreenNavigationProp['navigate'];
  keyword: string;
  lastName: string;
};

export type TreeContainerProps = {
  treeObj: FamilyTree<FamilyNode>;
  move: HomeScreenNavigationProp['navigate'];
  selectedPositions: Position<FamilyNode>[];
};

export type TreeViewProps = {
  treeElement: JSX.Element | null;
  rootX: number;
  generationNodes: JSX.Element;
  generationDottedLines: (width?: number) => JSX.Element;
};

export type TreeComponentProps = {
  treeObj: FamilyTree<FamilyNode>;
  setTreeElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
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

export type SubtreeComponentProps = {
  treeObj: FamilyTree<FamilyNode>;
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
