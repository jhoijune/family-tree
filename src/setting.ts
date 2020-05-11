import { NodeFeature } from './type';

const featureProps: (keyof NodeFeature)[] = ['isCenter'];

const infoProps = {
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

export default { featureProps, infoProps };
export { featureProps, infoProps };
