import prettier from 'prettier';
import ts from 'typescript';
import { api } from '../transpile/api';

//@ts-ignore
global.ts = ts;

const source: string = `
/**
 * Foo....
 */
export interface X {
  a: string;
  b: number;
}

export interface Y {
  /** foo... */
  a: string;
  
  /** bar... */
  b: number;
}

interface Z {
}

/**
 * hello?
 */
export function x({ a, b }: { a: number, b: number }): number {
  console.log('hello world?');
  return a + b;
}

export function y() {
  console.log('hello world?');
}

/**
 * ????
 */
export const q = () => () => {
  console.log('xxx');
}

/**
 * hello?
 */
function z() {
  console.log('hello world?');
}

/** skjsksjk */
export const xx: string = 'aaaa';

export const yy: number = 12323;

const zz: string = 'sss';

/** kkdkdjdk */
export const nodes = <div>Hello?</div>;

/** fldjkjek */
export class Test {
  constructor(hello: string) {
  }
}
`;

function format(source: string): string {
  return prettier.format(source, { parser: 'typescript' });
}

describe('@handbook/source', () => {
  test('fileExports()()', () => {
    expect(format(api('X')(source).get('X')!)).toEqual(
      format(`
      /**
       * Foo....
       */
      export interface X {
        a: string;
        b: number;
      }
      `),
    );

    expect(format(api('x')(source).get('x')!)).toEqual(
      format(`
      /**
       * hello?
       */
      export function x({ a, b }: { a: number, b: number }): number {}
      `),
    );

    expect(format(api('q')(source).get('q')!)).toEqual(
      format(`
      /**
       * ????
       */
      export const q = () => () => {}
      `),
    );

    expect(format(api('Test')(source).get('Test')!)).toEqual(
      format(`
      /** fldjkjek */
      export class Test {}
      `),
    );

    expect(format(api('xx')(source).get('xx')!)).toEqual(
      format(`
      /** skjsksjk */
      export const xx: string = 'aaaa';
      `),
    );
  });
});
