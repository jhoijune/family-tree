import Position from './Position';
import ArrayQueue from './ArrayQueue';

abstract class Tree<T> {
  /**
   * Return Position representing the tree's root (or null if empty)
   */
  abstract root(): Position<T> | null;

  /**
   * Return Position representing p's parent (or null if p is root)
   * @param p
   */
  abstract parent(p: Position<T>): Position<T> | null;

  /**
   * Generate an iteration of Positions representing p's children
   * @param p
   */
  abstract children(p: Position<T>): IterableIterator<Position<T>>;

  /**
   * Return the number of children that Position p has
   * @param p
   */
  abstract numChildren(p: Position<T>): number;

  /**
   * Return true if Position p have any children
   * @param p
   */
  isInternal(p: Position<T>): boolean {
    return this.numChildren(p) !== 0;
  }

  /**
   * Return true if Position p does not have any children
   * @param p
   */
  isExternal(p: Position<T>): boolean {
    return this.numChildren(p) === 0;
  }

  /**
   * Return true if Position p represents the root of the tree
   * @param p
   */
  isRoot(p: Position<T>): boolean {
    return this.root() === p;
  }

  /**
   * Return the total number of elements in the tree.
   */
  abstract size(): number;

  /**
   *
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Generate an iteration of all Positions
   */
  abstract positions(): IterableIterator<Position<T>>;

  /**
   * Generate an iteration of the tree's elements
   */
  *[Symbol.iterator](): IterableIterator<T> {
    for (const position of this.positions()) {
      yield position.element!;
    }
  }

  /**
   * Returns the number of levels separating Position p from the root
   * @param p
   */
  depth(p: Position<T>): number {
    const parent: Position<T> | null = this.parent(p);
    if (parent === null) {
      return 0;
    }
    return 1 + this.depth(parent);
  }

  /**
   * Return the height of the subtree rooted at Position p
   * @param p
   */
  protected _height(p: Position<T>): number {
    let height: number = 0;
    for (const children of this.children(p)) {
      height = Math.max(height, 1 + this.height(children));
    }
    return height;
  }

  /**
   * Return the height of the subtree rooted at Position p. If p is None, return the height of the entire tree.
   * @param p
   * @throws {Error} if The tree is empty
   */
  height(p?: Position<T>): number {
    let position: Position<T> | null;
    if (p === undefined) {
      position = this.root();
      if (position === null) {
        throw Error('Tree is empty so there is no height');
      }
    } else {
      position = p;
    }
    return this._height(position);
  }

  /**
   * Generate a preorder iteration of positions in the tree.
   */
  *preorder(): IterableIterator<Position<T>> {
    const root: Position<T> | null = this.root();
    if (root !== null) {
      for (const position of this._subtreePreorder(root)) {
        yield position;
      }
    }
  }

  /**
   * Generate a preorder iteration of positions in subtree rooted at p.
   * @param p
   */
  private *_subtreePreorder(p: Position<T>): IterableIterator<Position<T>> {
    yield p;
    for (const children of this.children(p)) {
      for (const descendant of this._subtreePreorder(children)) {
        yield descendant;
      }
    }
  }

  *postorder(): IterableIterator<Position<T>> {
    const root: Position<T> | null = this.root();
    if (root !== null) {
      for (const position of this._subtreePostorder(root)) {
        yield position;
      }
    }
  }

  private *_subtreePostorder(p: Position<T>): IterableIterator<Position<T>> {
    for (const children of this.children(p)) {
      for (const descendant of this._subtreePostorder(children)) {
        yield descendant;
      }
    }
    yield p;
  }

  *breadthfirst(): IterableIterator<Position<T>> {
    if (!this.isEmpty()) {
      const queue: ArrayQueue<Position<T>> = new ArrayQueue();
      queue.enqueue(this.root()!);
      while (!queue.isEmpty()) {
        const position: Position<T> = queue.dequeue()!;
        yield position;
        for (const children of this.children(position)) {
          queue.enqueue(children);
        }
      }
    }
  }
}

export default Tree;
