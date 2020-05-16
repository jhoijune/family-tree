import { ID, BasisObj, FamilyNode } from '../type';
import { essentialProps } from '../setting';
import Crypto from 'crypto-js';

/**
 * 노드의 정의된 element를 생성하는 함수
 * @param obj
 */
const createElement = (obj: BasisObj): FamilyNode => {
  const { children, isCenter, ...rest } = obj;
  const essentialValues = essentialProps.map((prop) => rest[prop]);
  const id: ID = Crypto.MD5(essentialValues.join()).toString() as ID;
  const result: FamilyNode = {
    id,
    ...rest,
    isCenter: typeof isCenter !== 'undefined' ? isCenter : false,
  };
  if (children && children.length && typeof children[0] === 'string') {
    let modifiedChild = children as string[];
    return {
      ...result,
      children: modifiedChild,
    };
  }
  return result;
};

export default createElement;
