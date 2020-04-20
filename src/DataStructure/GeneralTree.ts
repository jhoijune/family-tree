import Position from './Position';
import Tree from './Tree';

class Node<T> implements Position<T> {
  private _element: T | null;

  private _parent: Node<T> | null;

  private _children: Node<T>[];

  constructor(element: T, parent?: Node<T>, children?: Node<T>[]) {
    this._element = element;
    this._parent = parent || null;
    this._children = children || [];
  }

  // accessor methods
  get element(): T | null {
    return this._element;
  }

  get parent(): Node<T> | null {
    return this._parent;
  }

  get children(): Node<T>[] {
    return this._children;
  }

  // update methods

  set element(element: T | null) {
    this._element = element;
  }

  set parent(node: Node<T> | null) {
    this._parent = node;
  }

  set children(children: Node<T>[]) {
    this._children = children;
  }
}

class GeneralTree<T> extends Tree<T> {
  protected _root: Node<T> | null;

  private _size: number;

  constructor() {
    super();
    this._root = null;
    this._size = 0;
  }

  /**
   * Factory function to create a new node storing element
   * @param element
   * @param parent
   * @param children
   */
  protected _createNode(
    element: T,
    parent?: Node<T>,
    children?: Node<T>[]
  ): Node<T> {
    return new Node(element, parent, children);
  }

  /**
   *  Validates the position and returns it as a node.
   *  prevent direct use of nodes.
   * @param p
   * @throws {Error} if argument p is not Position type
   * @throws {Error} if Position p is no longer in the tree.
   */
  protected _validate(p: Position<T>): Node<T> {
    if (!(p instanceof Node)) {
      throw Error('Not valid position type');
    }
    const node: Node<T> = p as Node<T>;
    if (node.parent === node) {
      throw Error('p is no longer in the tree');
    }
    return node;
  }

  /**
   * Returns the number of nodes in the tree.
   */
  size(): number {
    return this._size;
  }

  /**
   * Returns the root Position of the tree
   */
  root(): Position<T> | null {
    return this._root;
  }

  /**
   * Returns the Position of p's parent (or null if p is root).
   * @param p
   */
  parent(p: Position<T>): Position<T> | null {
    const node: Node<T> = this._validate(p);
    const { parent } = node;
    return parent;
  }

  /**
   * Places element at the root of an empty tree and returns its new Position
   * @param element
   * @throws {Error} if tree is not empty.
   */
  addRoot(element: T): Position<T> {
    if (!this.isEmpty()) {
      throw Error('Tree is not empty');
    }
    this._root = this._createNode(element);
    this._size = 1;
    return this._root as Position<T>;
  }

  /**
   * Creates a new child of Position p storing element; returns its Position
   * @param parent
   * @param element
   */
  addChildren(parent: Position<T>, element: T): Position<T> {
    const node: Node<T> = this._validate(parent);
    const child: Node<T> = this._createNode(element, node);
    node.children.push(child);
    this._size += 1;
    return child as Position<T>;
  }

  /**
   * Replaces the element at Position p with e and returns the replaced element.
   * @param p
   * @param element
   */
  set(p: Position<T>, element: T): T | null {
    const node: Node<T> = this._validate(p);
    const exElement: T | null = node.element;
    node.element = element;
    return exElement;
  }

  /**
   * Attaches trees to position p
   * @param p
   * @param t
   */
  attach(p: Position<T>, ...trees: GeneralTree<T>[]): void {
    const node: Node<T> = this._validate(p);
    for (const tree of trees) {
      if (!tree.isEmpty()) {
        this._size += tree.size();
        tree._root!.parent = node;
        node.children.push(tree._root!);
        tree._root = null;
        tree._size = 0;
      }
    }
  }

  /**
   * Removes the node at Position p and replaces it with its child, if any.
   * @param p
   * @throws {Error} if position has more than one children
   */
  remove(p: Position<T>): T | null {
    if (this.numChildren(p) > 1) {
      throw Error('p has more than one children');
    }
    const node: Node<T> = this._validate(p);
    const { parent } = node;
    if (node.children.length === 0) {
      if (parent === null) {
        this._root = null;
      } else {
        const len: number = parent.children.length;
        let deleteIndex: number;
        for (deleteIndex = 0; deleteIndex < len; deleteIndex++) {
          if (parent.children[deleteIndex] === node) {
            break;
          }
        }
        parent.children.splice(deleteIndex, 1);
      }
    } else {
      const [child] = node.children;
      child.parent = parent;
      if (parent === null) {
        this._root = child;
      } else {
        const len: number = parent.children.length;
        for (let i = 0; i < len; i++) {
          if (parent.children[i] === node) {
            parent.children[i] = child;
            break;
          }
        }
      }
    }
    this._size -= 1;
    const exElement = node.element;
    node.element = null;
    node.children = [];
    node.parent = node;
    return exElement;
  }

  *children(p: Position<T>): IterableIterator<Position<T>> {
    const node: Node<T> = this._validate(p);
    for (const children of node.children) {
      yield children as Position<T>;
    }
  }

  numChildren(p: Position<T>): number {
    const node: Node<T> = this._validate(p);
    return node.children.length;
  }

  *positions(): IterableIterator<Position<T>> {
    for (const position of this.breadthfirst()) {
      yield position;
    }
  }
}

export default GeneralTree;
export { Node };
