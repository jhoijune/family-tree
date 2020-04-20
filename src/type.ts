import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Position<T> {
  element: T | null;
}

type SearchResultItem<T> = {
  properties: string[];
  position: Position<T>;
};

type SearchResult<T> = {
  keyword: string;
  results: SearchResultItem<T>[];
};

type PositionAndName = { name: string; position: Position<FamilyNode> };

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

type Info = {
  header: string;
  value: string | number | PositionAndName | PositionAndName[] | null;
};

type Infos = Info[];

type StackParamList<T> = {
  Home: undefined;
  Info: { position: Position<T>; keyword?: string };
};

type HomeScreenNavigationProp = StackNavigationProp<
  StackParamList<FamilyNode>,
  'Home'
>;

type InfoScreenNavigationProp = StackNavigationProp<
  StackParamList<FamilyNode>,
  'Info'
>;

type InfoScreenRouteProp = RouteProp<StackParamList<FamilyNode>, 'Info'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

type InfoScreenProps = {
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
};

type SearchboxProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  move: Function;
};

type SearchResultProps<T> = {
  position: Position<T>;
  property: string;
  move: Function;
  keyword: string;
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
};
