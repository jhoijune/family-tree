import { FamilyTree } from '../DataStructure';
import { Position, FamilyNode, BasisObj } from '../type';
import createElement from './createElement';

/**
 * 가계도를 생성하고 초기화 함
 * @param obj
 * @param familyName 가족의 성
 */

const createTree = (
  obj: BasisObj,
  familyName: string
): FamilyTree<FamilyNode> => {
  const tree: FamilyTree<FamilyNode> = new FamilyTree(familyName);
  const element: FamilyNode = createElement(obj);
  const root: Position<FamilyNode> = tree.addRoot(element);
  /**
   *  트리에서 넘겨주는 position에 children을 재귀적으로 초기화 함
   * @param parentPosition
   * @param children - position의 children
   */
  const initTree = (
    parentPosition: Position<FamilyNode>,
    children: BasisObj[] | string[]
  ) => {
    if (children.length && typeof children[0] !== 'string') {
      const modifiedChild = children as BasisObj[];
      modifiedChild.forEach((obj) => {
        const element: FamilyNode = createElement(obj);
        const position: Position<FamilyNode> = tree.addChildren(
          parentPosition,
          element
        );
        initTree(position, obj.children);
      });
    }
  };
  initTree(root, obj.children);
  return tree;
};

export default createTree;
