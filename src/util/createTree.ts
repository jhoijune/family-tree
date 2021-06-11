import { FamilyTree } from '../DataStructure';
import { Position, FamilyNode, BasisObj } from '../type';
import createElement from './createElement';

/**
 * 가계도를 생성하고 초기화 함
 * @param obj
 * @param lastName 가족의 성
 */

const createTree = (
  obj: BasisObj,
  lastName: string,
  startGeneration: number
): FamilyTree<FamilyNode> => {
  const tree: FamilyTree<FamilyNode> = new FamilyTree(lastName);
  const element: FamilyNode = createElement(obj, {
    generation: startGeneration,
  });
  const root: Position<FamilyNode> = tree.addRoot(element);
  /**
   *  트리에서 넘겨주는 position에 children을 재귀적으로 초기화 함
   * @param parentPosition
   * @param children - position의 children
   */
  const initTree = (
    parentPosition: Position<FamilyNode>,
    children: BasisObj[] | string[] | undefined,
    info: {
      generation: number;
      father: string;
      mother?: string | string[];
    }
  ) => {
    if (children && children.length && typeof children[0] !== 'string') {
      const modifiedChild = children as BasisObj[];
      modifiedChild.forEach((obj) => {
        const element: FamilyNode = createElement(obj, {
          generation: info.generation,
          mother: info.mother,
          father: info.father,
        });
        const position: Position<FamilyNode> = tree.addChildren(
          parentPosition,
          element
        );
        initTree(position, obj.children, {
          father: element.name,
          generation: info.generation + 1,
          mother: element.spouse as string | string[] | undefined,
        });
      });
    }
  };
  initTree(root, obj.children, {
    father: obj.name,
    generation: startGeneration + 1,
    mother: obj.spouse,
  });
  return tree;
};

export default createTree;
