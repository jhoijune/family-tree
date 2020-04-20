import { NodeFeature } from './type';

const featureProps: (keyof NodeFeature)[] = [
  'isCenter',
  'isHighlight',
  'color',
];

const infoProps: { [key: string]: string } = {
  name: '이름',
  'genealogical name': '족보상 이름',
  father: '부',
  mother: '모',
  birth: '생년월일',
  generation: '세대',
  children: '자식',
};

export default { featureProps, infoProps };
export { featureProps, infoProps };
