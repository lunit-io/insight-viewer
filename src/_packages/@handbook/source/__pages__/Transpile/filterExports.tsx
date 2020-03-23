import { CodeBlock } from '@handbook/code-block';
import { api } from '@handbook/source';
import React, { Fragment } from 'react';

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

export default () => {
  const codes = api('X', 'x', 'q', 'nodes')(source);

  return (
    <div>
      {Array.from(codes).map(([name, code]) => {
        return (
          <Fragment key={name}>
            <h2>{name}</h2>
            <CodeBlock language="typescript" children={code} />
          </Fragment>
        );
      })}
    </div>
  );
};
