interface Queue<T> {
  /**
   * Returns the number of elements in the queue.
   */
  size(): number;
  /**
   * Tests whether the queue is empty.
   */
  isEmpty(): boolean;
  /**
   * Inserts an element at the rear of the queue.
   * @param element
   */
  enqueue(element: T): this;
  /**
   * Returns, but does not remove, the first element of the queue (null if empty).
   */
  first(): T | null;
  /**
   * Removes and returns the first element of the queue (null if empty).
   */
  dequeue(): T | null;
}

export default Queue;
