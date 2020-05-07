import { Button } from '@material-ui/core';
import { ComponentProps } from 'react';

describe('eschOptions', () => {
  test('test core logic', () => {
    function eachOptions<T extends {}>(options: { [K in keyof T]: T[K][] }): Partial<T>[] {
      const names = Object.keys(options) as (keyof T)[];
      const result: Partial<T>[] = [];

      function search(fixed: Partial<T>, index: number) {
        if (index < names.length - 1) {
          for (const v of options[names[index]]) {
            search({ ...fixed, [names[index]]: v }, index + 1);
          }
        } else {
          for (const v of options[names[index]]) {
            result.push({ ...fixed, [names[index]]: v });
          }
        }
      }

      search({}, 0);

      return result;
    }

    eachOptions<ComponentProps<typeof Button>>({
      size: ['small', 'medium', 'large'],
      variant: ['text', 'contained', 'outlined'],
    }).forEach((props) => {
      console.log('eachOptions.test.ts..()', props);
    });
  });

  test('test search logic', () => {
    const array = [
      ['a', 'b', 'c'],
      [1, 2],
      ['x', 'y', 'z'],
    ];

    const result: (string | number)[][] = [];

    function search(fixed: (string | number)[], index: number) {
      if (index < array.length - 1) {
        for (const v of array[index]) {
          search([...fixed, v], index + 1);
        }
      } else {
        for (const v of array[index]) {
          result.push([...fixed, v]);
        }
      }
    }

    search([], 0);

    console.log(result.map((sub) => sub.join(',')).join('\n'));
  });
});
