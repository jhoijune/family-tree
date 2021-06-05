import { ID, BasisObj, FamilyNode } from '../type';
import Crypto from 'crypto-js';

/**
 * 노드의 정의된 element를 생성하는 함수
 * @param obj
 */
const createElement = (obj: BasisObj, generation: number): FamilyNode => {
  const { children, isCenter, ...rest } = obj;
  const key = [rest.name, generation];
  const id: ID = Crypto.MD5(key.join()).toString() as ID;
  const result: FamilyNode = {
    id,
    generation,
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
