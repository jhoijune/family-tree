import { FamilyTree } from '../DataStructure';
import { Position, FamilyNode, BasisObj } from '../type';
import createElement from './createElement';

/**
 * 가계도를 생성하고 초기화 함
 * @param obj
 */

const createTree = (obj: BasisObj): FamilyTree<FamilyNode> => {
  const tree: FamilyTree<FamilyNode> = new FamilyTree();
  const element: FamilyNode = createElement(obj);
  const root: Position<FamilyNode> = tree.addRoot(element);
  /**
   *  트리에서 넘겨주는 position에 children을 재귀적으로 초기화 함
   * @param parentPosition
   * @param children - position의 children
   */
  const initTree = (
    parentPosition: Position<FamilyNode>,
    children: BasisObj[]
  ) => {
    children.forEach((obj) => {
      const element: FamilyNode = createElement(obj);
      const position: Position<FamilyNode> = tree.addChildren(
        parentPosition,
        element
      );
      initTree(position, obj.children);
    });
  };
  initTree(root, obj.children);
  return tree;
};

export default createTree;
