import { Removable } from './Removable';

export abstract class ViewerSlot extends Removable {
  /** Contains the logic that should be executed in each class at the time the DOM is mounted */
  abstract init(...params: unknown[]): void | Promise<void>;
  /** Functions that return elements to be exposed externally from their class */
  abstract getSnapshot(): unknown;
}
