export interface Log {
  time: number;
  command: string;
  value?: string | number | boolean;
}