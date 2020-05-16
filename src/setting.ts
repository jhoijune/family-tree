import { NodeFeature, EssentialObj } from './type';

export const featureProps: (keyof NodeFeature)[] = ['isCenter'];

export const essentialProps: (keyof EssentialObj)[] = [
  'name',
  'mother',
  'birth',
  'generation',
];

export const propsMappedName = {
  name: '이름',
  'genealogical name': '족보상 이름',
  father: '부',
  mother: '모',
  birth: '생년월일',
  generation: '항렬',
  children: '자녀',
  spouse: '배우자',
  deathday: '기일',
};

export const lastName = '장';

export const treeSetting = {
  padding: 10,
  nodeWidth: 30,
  nodeHeight: 15,
  verticalInterval: 10,
  horizontalInterval: 5,
  colors: ['#99CDFF', '#CCFF9A', '#FEFF99', '#99FFCD'],
};
