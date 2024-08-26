import { Subscribable } from './Subscribable';

export abstract class ViewerCreator extends Subscribable {
  /** init is responsible for initial settings related to the constructor element */
  abstract init(...params: unknown[]): void | Promise<void>;
}
