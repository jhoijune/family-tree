import { BasisObj, FamilyNode } from '../type';

/**
 * 노드의 정의된 element를 생성하는 함수
 * @param obj
 */
const createElement = (obj: BasisObj): FamilyNode => {
  const { children, isCenter, ...rest } = obj;
  if (children.length && typeof children[0] === 'string') {
    let modifiedChild = children as string[];
    return {
      ...rest,
      isCenter: typeof isCenter !== 'undefined' ? isCenter : false,
      children: modifiedChild,
    } as FamilyNode;
  }
  return {
    ...rest,
    isCenter: typeof isCenter !== 'undefined' ? isCenter : false,
  } as FamilyNode;
};

export default createElement;
