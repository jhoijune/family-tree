import Position from './Position';
import GeneralTree, { Node } from './GeneralTree';
import { SearchResult, SearchResultItem } from '../type';

class FamilyTree<
  T extends { isCenter: boolean; [key: string]: unknown }
> extends GeneralTree<T> {
  static DEFAULT_NODE_INTERVAL: number = 10;

  static DEFAULT_NODE_WIDTH = 100;

  private _interval: number;

  private _width: number;

  constructor(
    interval: number = FamilyTree.DEFAULT_NODE_INTERVAL,
    width: number = FamilyTree.DEFAULT_NODE_WIDTH
  ) {
    super();
    this._interval = interval;
    this._width = width;
  }

  /**
   * 특정 키워드로 검색했을 때 만족하는 위치들과 프로퍼티를 반환함
   * 키워드는  불리언 속성을 제외한 숫자,문자열만 가능함
   * @param keyword
   */
  searchKeyword(keyword: string): SearchResult<T> {
    const results: SearchResultItem<T>[] = [];
    for (const position of this.positions()) {
      const { element: object } = position;
      const props: string[] = Object.keys(object!);
      const filteredProps: string[] = [];
      props.forEach((prop) => {
        const value: unknown = object![prop];
        let modified: string | null;
        if (typeof value === 'number') {
          modified = value.toString();
        } else if (typeof value === 'string') {
          modified = value;
        } else {
          modified = null;
        }
        if (modified !== null && modified.includes(keyword)) {
          filteredProps.push(prop);
        }
      });
      if (filteredProps.length !== 0) {
        results.push({ properties: filteredProps, position });
      }
    }
    return { keyword, results };
  }

  /**
   * position을 서브 트리로 갖는 external  node 갯수 계산
   */
  sumExternalNode(p: Position<T>): number {
    if (this.isInternal(p)) {
      const node: Node<T> = this._validate(p);
      let result = 0;
      for (const children of node.children) {
        result += this.sumExternalNode(children);
      }
      return result;
    } else {
      return 1;
    }
  }

  /**
   * external node중에 center:true인 것이 왼쪽에서 몇번째에 있는지 파악
   * @throws {Error} if there is no center in external node.
   */
  locateExternalCenter(): number {
    let result: number = 0;
    for (const position of this.preorder()) {
      if (this.isExternal(position)) {
        result += 1;
        const { element } = position;
        if (element!.isCenter) {
          return result;
        }
      }
    }
    throw Error('No center in external node');
  }

  /**
   * root node의 x축 margin 계산
   * @param margin
   */
  calculateRootX(margin: number = 0): number {
    const count: number = this.locateExternalCenter();
    return margin + (count - 1) * (this._width + this._interval);
  }

  /**
   * position의 하위 서브트리의 너비 계산
   * @param position
   */
  calculateSubtreeWidth(position: Position<T>): number {
    const externalNodeCount: number = this.sumExternalNode(position);
    let result: number = externalNodeCount * this._width;
    if (externalNodeCount > 1) {
      result += (externalNodeCount - 1) * this._interval;
    }
    return result;
  }

  /**
   * 노드의 중심으로부터 계산한 서브트리 좌우의 너비
   * @param position
   */
  private _calculatePartOfSubtreeWidth(
    position: Position<T>
  ): { left: number; right: number } {
    const externalNodeCount: number = this.sumExternalNode(position);
    if (externalNodeCount <= 1) {
      return { left: this._width / 2, right: this._width / 2 };
    }
    const node: Node<T> = this._validate(position);
    if (!node.element!.isCenter) {
      const width: number = this.calculateSubtreeWidth(position);
      return { left: width / 2, right: width / 2 };
    } else {
      const len: number = node.children.length;
      let centerIndex: number;
      for (centerIndex = 0; centerIndex < len; centerIndex++) {
        const tempNode = node.children[centerIndex];
        if (tempNode.element!.isCenter) {
          break;
        }
      }
      const left: number =
        (this._width + this._interval) * centerIndex - this._correctX();
      const right: number =
        (this._width + this._interval) * (externalNodeCount - centerIndex - 1) +
        this._correctX();
      return { left, right };
    }
  }

  /**
   * position 하위의 가지 너비 계산
   * @param position
   */
  calculateBreanchWidth(position: Position<T>) {
    return this.calculateSubtreeWidth(position) - this._width;
  }

  /**
   *  같은 깊이의 좌우 노드에서  오른쪽 노드가 왼쪽 노드보다 x축에 얼마나 떨어져야 하는지 계산
   */
  calculateNodeInterval(
    leftPosition: Position<T>,
    rightPosition: Position<T>
  ): number {
    const { left } = this._calculatePartOfSubtreeWidth(leftPosition);
    const { right } = this._calculatePartOfSubtreeWidth(rightPosition);
    return this._interval + left + right;
  }

  /**
   *  서브트리의 루트다음의 노드의 x축 계산
   */
  calculateFirstNodeX(position: Position<T>, rootX: number): number {
    const subtreeWidth: number = this.calculateSubtreeWidth(position);
    if (subtreeWidth === this._width) {
      return rootX;
    }
    const node: Node<T> = this._validate(position);
    if (node.element!.isCenter) {
      const len: number = node.children.length;
      let centerIndex: number;
      for (centerIndex = 0; centerIndex < len; centerIndex++) {
        const tempNode = node.children[centerIndex];
        if (tempNode.element!.isCenter) {
          break;
        }
      }
      return rootX - (this._width + this._interval) * centerIndex;
    } else {
      // 이등변 삼각형
      return rootX - subtreeWidth / 2 + this._correctX();
    }
  }

  calculateBranchFirstX() {
    //  return this.calculateFirstNodeX() + this._correctX();
  }

  /**
   * 노드의 중심 위치로 계산한 뒤 보정할 때 사용하는 메소드
   */
  private _correctX() {
    return this._width / 2;
  }
}

export default FamilyTree;
export { SearchResult };
