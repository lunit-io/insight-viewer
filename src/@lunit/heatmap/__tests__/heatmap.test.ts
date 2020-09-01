import { getAlpha, getRGBAArray, getRGBArray } from '@lunit/heatmap';

describe('@lunit/heatmap', () => {
  test('getRGBArray', () => {
    expect(getRGBArray(0)).toEqual([0, 0, 255]);
    expect(getRGBArray(0.25)).toEqual([0, 255, 255]);
    expect(getRGBArray(0.5)).toEqual([0, 255, 0]);
    expect(getRGBArray(0.75)).toEqual([255, 255, 0]);
    expect(getRGBArray(1)).toEqual([255, 0, 0]);
  });

  test('getAlpha', () => {
    expect(getAlpha({ threshold: 0, stop: 0 })).toEqual(0);
    expect(getAlpha({ threshold: 0, stop: 0.25 })).toEqual(0.1875);
    expect(getAlpha({ threshold: 0, stop: 0.5 })).toEqual(0.375);
    expect(getAlpha({ threshold: 0, stop: 0.75 })).toEqual(0.5625);
    expect(getAlpha({ threshold: 0, stop: 1 })).toEqual(0.75);

    // threshold : 특정 stop 영역을 drop (alpha 0) 시키기 위한 값
    // stop < threshold -> alpha는 0이 된다
    expect(getAlpha({ threshold: 0.5, stop: 0.49 })).toEqual(0);
  });

  test('getRGBAArray', () => {
    expect(getRGBAArray({ threshold: 0, stop: 0 })).toEqual([0, 0, 0, 0]);
    expect(getRGBAArray({ threshold: 0, stop: 0.25 })).toEqual([
      0,
      255,
      255,
      0.1875,
    ]);
    expect(getRGBAArray({ threshold: 0, stop: 0.5 })).toEqual([
      0,
      255,
      0,
      0.375,
    ]);
    expect(getRGBAArray({ threshold: 0, stop: 0.75 })).toEqual([
      255,
      255,
      0,
      0.5625,
    ]);
    expect(getRGBAArray({ threshold: 0, stop: 1 })).toEqual([255, 0, 0, 0.75]);

    // stop < threshold -> alpha는 0이 된다
    expect(getRGBAArray({ threshold: 0.5, stop: 0.49 })).toEqual([0, 0, 0, 0]);
  });
});
