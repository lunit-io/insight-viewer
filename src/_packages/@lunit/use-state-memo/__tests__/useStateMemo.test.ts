import { renderHook } from '@testing-library/react-hooks';
import { useStateMemo } from '../';

//tslint:disable:react-hooks-nesting
describe('useStateMemo()', () => {
  const arr1: string[] = [];
  const arr2: string[] = [];
  
  test('memo가 변경되어야 한다', () => {
    const {result, rerender} = renderHook(({data}) => useStateMemo(data), {
      initialProps: {
        data: {
          a: 1,
          b: 2,
          c: 3,
        },
      },
    });
    
    const a = result.current;
    
    rerender({
      data: {
        a: 2,
        b: 2,
        c: 3,
      },
    });
    
    const b = result.current;
    
    expect(a).not.toBe(b);
  });
  
  test('memo가 변경되지 않아야 한다', () => {
    const {result, rerender} = renderHook(({data}) => useStateMemo(data), {
      initialProps: {
        data: {
          a: 1,
          b: 2,
          c: 3,
        },
      },
    });
    
    const a = result.current;
    
    rerender({
      data: {
        a: 1,
        b: 2,
        c: 3,
      },
    });
    
    const b = result.current;
    
    expect(a).toBe(b);
  });
  
  test('reference의 변경으로 memo가 변경되어야 한다', () => {
    const {result, rerender} = renderHook(({data}) => useStateMemo(data), {
      initialProps: {
        data: {
          a: arr1,
        },
      },
    });
    
    const a = result.current;
    
    rerender({
      data: {
        a: arr2,
      },
    });
    
    const b = result.current;
    
    expect(a).not.toBe(b);
  });
});