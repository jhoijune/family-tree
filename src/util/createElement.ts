import { BasisObj, FamilyNode } from '../type';

/**
 * 노드의 정의된 element를 생성하는 함수
 * @param obj
 */
const createElement = (obj: BasisObj): FamilyNode => {
  const objBasis = { isHighlight: false, color: null };
  const { children, isCenter, ...rest } = obj;
  return {
    isCenter: typeof isCenter !== 'undefined' ? isCenter : false,
    ...objBasis,
    ...rest,
  } as FamilyNode;
};

export default createElement;
