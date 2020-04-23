import Position from './Position';
import GeneralTree, { Node } from './GeneralTree';
import { SearchResult, SearchResultItem, FamilyNode } from '../type';

class FamilyTree<
  T extends { isCenter: boolean; [key: string]: unknown }
> extends GeneralTree<T> {
  constructor() {
    super();
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
   * @param width 노드의 너비
   * @param interval  노드의 수평선상의 간격
   * @param margin  SVG의 마진
   */
  calculateRootX(width: number, interval: number, margin: number = 0): number {
    const count: number = this.locateExternalCenter();
    return margin + (count - 1) * (width + interval);
  }

  /**
   * position의 하위 서브트리의 너비 계산
   * @param position 노드의 포지션
   * @param width 노드의 너비
   * @param interval  노드의 수평선상의 간격
   */
  calculateSubtreeWidth(
    position: Position<T>,
    width: number,
    interval: number
  ): number {
    const externalNodeCount: number = this.sumExternalNode(position);
    let result: number = externalNodeCount * width;
    if (externalNodeCount > 1) {
      result += (externalNodeCount - 1) * interval;
    }
    return result;
  }

  /**
   * 노드의 중심으로부터 계산한 서브트리 좌우의 너비
   * @param position 노드의 포지션
   * @param width 노드의 너비
   * @param interval  노드의 수평선상의 간격
   */
  private _calculatePartOfSubtreeWidth(
    position: Position<T>,
    width: number,
    interval: number
  ): { left: number; right: number } {
    const externalNodeCount: number = this.sumExternalNode(position);
    if (externalNodeCount <= 1) {
      return { left: width / 2, right: width / 2 };
    }
    const node: Node<T> = this._validate(position);
    if (!node.element!.isCenter) {
      const wholeWidth: number = this.calculateSubtreeWidth(
        position,
        width,
        interval
      );
      return { left: wholeWidth / 2, right: wholeWidth / 2 };
    } else {
      // FIXME:
      let centerIndex = 0;
      for (const children of this._subtreePreorder(position)) {
        if (this.isExternal(children)) {
          centerIndex += 1;
          if (children.element!.isCenter) {
            break;
          }
        }
      }
      const left: number =
        (width + interval) * (centerIndex - 1) + this._correctX(width);
      const right: number =
        (width + interval) * (externalNodeCount - centerIndex) +
        this._correctX(width);
      return { left, right };
    }
  }

  /**
   * 같은 깊이의 좌우 노드에서  오른쪽 노드가 왼쪽 노드보다 x축에 얼마나 떨어져야 하는지 계산
   * @param leftPosition 노드 왼쪽 포지션
   * @param rightPosition 노드 오른쪽 포지션
   * @param width 노드의 너비
   * @param interval  노드의 수평선상의 간격
   */
  calculateNodeInterval(
    leftPosition: Position<T>,
    rightPosition: Position<T>,
    width: number,
    interval: number
  ): number {
    const { right } = this._calculatePartOfSubtreeWidth(
      leftPosition,
      width,
      interval
    );
    const { left } = this._calculatePartOfSubtreeWidth(
      rightPosition,
      width,
      interval
    );
    return right + interval + left;
  }

  /**
   * 서브트리의 루트다음의 노드의 x좌표 계산
   * @param position 루트 노드의 포지션
   * @param rootX 서브트리의 루트 노드의 x좌표
   * @param width 노드의 너비
   * @param interval 노드의 수평선상의 간격
   */
  calculateFirstNodeX(
    position: Position<T>,
    rootX: number,
    width: number,
    interval: number
  ): number {
    if (this.numChildren(position) > 1) {
      const subtreeWidth: number = this.calculateSubtreeWidth(
        position,
        width,
        interval
      );
      const node: Node<T> = this._validate(position);
      if (node.element!.isCenter) {
        const { children } = node;
        const len: number = children.length;
        let centerIndex: number;
        for (centerIndex = 0; centerIndex < len; centerIndex++) {
          const tempNode = children[centerIndex];
          if (tempNode.element!.isCenter) {
            break;
          }
        }
        let result = rootX;
        while (centerIndex !== 0) {
          result -= this.calculateNodeInterval(
            children[centerIndex - 1],
            children[centerIndex],
            width,
            interval
          );
          centerIndex -= 1;
        }
        return result;
      } else {
        const [firstChild] = node.children;
        if (this.numChildren(firstChild) > 1) {
          const childSubtreeWidth = this.calculateSubtreeWidth(
            firstChild,
            width,
            interval
          );
          return rootX + (childSubtreeWidth - subtreeWidth) / 2;
        } else {
          return rootX - subtreeWidth / 2 + this._correctX(width);
        }
      }
    }
    return rootX;
  }

  /**
   * 노드의 중심 위치로 계산한 뒤 보정할 때 사용하는 메소드
   * @param width 노드의 너비
   */
  private _correctX(width: number) {
    return width / 2;
  }
}

export default FamilyTree;
export { SearchResult };
