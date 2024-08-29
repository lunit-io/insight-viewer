export abstract class ViewerSlot {
  /** Contains the logic that should be executed in each class at the time the DOM is mounted */
  abstract init(...params: unknown[]): void | Promise<void>;
  /** Functions that return elements to be exposed externally from their class */
  abstract getSnapshot(): unknown;
  /** method for freeing the target class from memory */
  abstract destroy(): void;
}
