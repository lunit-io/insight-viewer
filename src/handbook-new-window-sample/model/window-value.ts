export interface WindowValue {
  a: number;
  b: number;
  updateA: (nextA: number) => void;
  updateB: (nextB: number) => void;
}
