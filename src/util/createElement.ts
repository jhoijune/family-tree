import { ID, BasisObj, FamilyNode } from '../type';
import Crypto from 'crypto-js';

/**
 * 노드의 정의된 element를 생성하는 함수
 * @param obj
 */

const createElement = (
  obj: BasisObj,
  info: {
    generation: number;
    mother?: string | string[];
    father?: string;
  }
): FamilyNode => {
  const { children, isCenter, mother: inputedMother, name, ...rest } = obj;
  const key = [name, info.generation];
  const id: ID = Crypto.MD5(key.join()).toString() as ID;
  const result: FamilyNode = {
    id,
    name,
    generation: info.generation,
    mother: inputedMother || info.mother,
    isCenter: !!isCenter,
    father: info.father,
    ...rest,
  };
  if (children && children.length && typeof children[0] === 'string') {
    return {
      ...result,
      children: children as string[],
    };
  } else if (children && children.length && typeof children[0] === 'object') {
    const childrenName: string[] = [];
    for (const obj of children as BasisObj[]) {
      childrenName.push(obj.name);
    }
    return {
      ...result,
      childrenName: childrenName,
    };
  }
  return result;
};

export default createElement;
