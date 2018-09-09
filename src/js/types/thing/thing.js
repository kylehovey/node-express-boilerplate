/**
 * Types are classes that represent a model with logic,
 *  but that have no view. An example would be a matrix,
 *  graph, algebra, or some other structure.
 */
export default class Thing {
  constructor(val = 42) { this.val = val; }
  getVal() { return this.val; }
}
