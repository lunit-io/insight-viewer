# Start development

- `npm test` Run unit test (Jest)
- `npm start` Run storybook test (Storybook)

# Source Import Sample

## Jest 
<!-- import src/__tests__/*.{js,jsx,ts,tsx} --title-tag h3 -->
<!-- importend -->

<!-- import src/**/*.test.{js,jsx,ts,tsx} --title-tag h3 -->

### src/\_packages/@lunit/heatmap/\_\_tests\_\_/heatmap.test.ts


```ts
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
    expect(getAlpha({threshold: 0, stop: 0})).toEqual(0);
    expect(getAlpha({threshold: 0, stop: 0.25})).toEqual(0.1875);
    expect(getAlpha({threshold: 0, stop: 0.5})).toEqual(0.375);
    expect(getAlpha({threshold: 0, stop: 0.75})).toEqual(0.5625);
    expect(getAlpha({threshold: 0, stop: 1})).toEqual(0.75);
    
    // threshold : 특정 stop 영역을 drop (alpha 0) 시키기 위한 값
    // stop < threshold -> alpha는 0이 된다
    expect(getAlpha({threshold: 0.5, stop: 0.49})).toEqual(0);
  });
  
  test('getRGBAArray', () => {
    expect(getRGBAArray({threshold: 0, stop: 0})).toEqual([0, 0, 0, 0]);
    expect(getRGBAArray({threshold: 0, stop: 0.25})).toEqual([0, 255, 255, 0.1875]);
    expect(getRGBAArray({threshold: 0, stop: 0.5})).toEqual([0, 255, 0, 0.375]);
    expect(getRGBAArray({threshold: 0, stop: 0.75})).toEqual([255, 255, 0, 0.5625]);
    expect(getRGBAArray({threshold: 0, stop: 1})).toEqual([255, 0, 0, 0.75]);
    
    // stop < threshold -> alpha는 0이 된다
    expect(getRGBAArray({threshold: 0.5, stop: 0.49})).toEqual([0, 0, 0, 0]);
  });
});
```


### src/\_packages/@lunit/is\-complex\-polygon/\_\_tests\_\_/isComplexPolygon.test.ts


```ts
import { isComplexPolygon } from '@lunit/is-complex-polygon';

describe('isComplexPolygon()', () => {
  test('Polygon은 Complex Polygon이다', () => {
    expect(isComplexPolygon([[267.52, 179.20000000000002], [266.24, 179.20000000000002], [261.12, 175.36], [254.72, 170.24], [249.6, 163.84], [243.20000000000002, 153.6], [234.24, 140.8], [229.12, 131.84], [216.32, 115.20000000000002], [204.8, 98.56], [195.84, 87.03999999999999], [181.76, 72.96000000000001], [175.36, 69.12], [166.4, 62.72], [161.28, 60.16], [154.88, 57.60000000000001], [149.76, 56.32000000000001], [144.64000000000001, 56.32000000000001], [139.52, 56.32000000000001], [134.4, 56.32000000000001], [130.56, 58.879999999999995], [125.44, 62.72], [121.60000000000001, 67.84], [115.2, 74.24000000000001], [111.36, 80.64000000000001], [107.52, 88.32], [101.12, 98.56], [98.56, 104.96000000000001], [94.72, 115.20000000000002], [92.16, 126.72], [90.88, 135.68], [90.88, 145.92000000000002], [90.88, 156.16], [92.16, 165.12], [97.28, 172.8], [102.4, 179.20000000000002], [110.08, 188.16], [116.48, 190.72], [122.88, 192], [129.28, 193.28000000000003], [136.96, 193.28000000000003], [142.08, 192], [148.48, 186.88], [158.72, 177.92000000000002], [166.4, 168.96], [171.52, 162.56], [176.64000000000001, 154.88], [181.76, 144.64000000000001], [186.88, 135.68], [192, 125.44], [195.84, 117.75999999999999], [202.24, 106.24000000000001], [207.36, 94.72], [213.76, 85.75999999999999], [221.44, 75.52000000000001], [230.4, 66.56], [240.64000000000001, 56.32000000000001], [249.6, 49.92], [262.4, 40.96000000000001], [271.36, 38.400000000000006], [280.32, 34.56], [294.40000000000003, 29.439999999999998], [302.08, 28.159999999999997], [311.04, 26.879999999999995], [320, 26.879999999999995], [327.68, 26.879999999999995], [334.08, 29.439999999999998], [339.2, 30.72], [344.32, 33.28], [349.44, 38.400000000000006], [354.56, 42.24000000000001], [358.40000000000003, 47.36], [362.24, 52.480000000000004], [366.08, 58.879999999999995], [369.92, 66.56], [372.48, 75.52000000000001], [376.32, 83.20000000000002], [377.6, 88.32], [377.6, 96], [378.88, 101.12], [378.88, 107.52000000000001], [378.88, 112.64000000000001], [377.6, 119.03999999999999], [373.76, 122.88], [369.92, 128]]))
      .toBeTruthy();
    
    expect(isComplexPolygon([[312.32, 107.52000000000001], [312.32, 106.24000000000001], [311.04, 102.4], [308.48, 97.28], [304.64, 88.32], [300.8, 81.92000000000002], [298.24, 74.24000000000001], [293.12, 67.84], [286.72, 57.60000000000001], [275.2, 44.8], [264.96, 37.120000000000005], [256, 32], [241.92000000000002, 21.760000000000005], [235.52, 19.200000000000003], [225.28, 16.64], [216.32, 15.36], [207.36, 14.079999999999998], [199.68, 14.079999999999998], [193.28, 14.079999999999998], [186.88, 15.36], [180.48, 16.64], [174.08, 19.200000000000003], [170.24, 21.760000000000005], [161.28, 28.159999999999997], [154.88, 32], [149.76, 38.400000000000006], [144.64000000000001, 44.8], [138.24, 51.2], [133.12, 58.879999999999995], [129.28, 65.28], [125.44, 72.96000000000001], [121.60000000000001, 80.64000000000001], [120.32000000000001, 88.32], [119.04, 97.28], [119.04, 106.24000000000001], [119.04, 116.47999999999999], [119.04, 125.44], [120.32000000000001, 134.4], [125.44, 144.64000000000001], [130.56, 151.04], [135.68, 158.72], [142.08, 163.84], [148.48, 168.96], [154.88, 171.52], [157.44, 171.52], [165.12, 172.8], [168.96, 174.08], [172.8, 174.08], [180.48, 170.24], [184.32, 166.4], [190.72, 158.72], [197.12, 148.48000000000002], [202.24, 140.8], [206.08, 133.12], [212.48000000000002, 119.03999999999999], [216.32, 110.08000000000001], [221.44, 98.56], [225.28, 85.75999999999999], [229.12, 75.52000000000001], [231.68, 66.56], [234.24, 56.32000000000001], [238.08, 46.08], [240.64000000000001, 38.400000000000006], [243.20000000000002, 34.56], [247.04, 26.879999999999995], [250.88, 21.760000000000005], [253.44, 16.64], [259.84000000000003, 11.519999999999996], [266.24, 8.960000000000008], [273.92, 6.400000000000006], [282.88, 2.5600000000000023], [293.12, 1.2800000000000011], [303.36, -1.2800000000000011], [316.16, -1.2800000000000011], [332.8, -2.5600000000000023], [343.04, -2.5600000000000023], [353.28000000000003, -1.2800000000000011], [362.24, 1.2800000000000011], [372.48, 3.8400000000000034], [381.44, 7.680000000000007], [389.12, 12.799999999999997], [396.8, 16.64], [403.2, 21.760000000000005], [409.6, 29.439999999999998], [414.72, 35.84], [419.84000000000003, 42.24000000000001], [423.68, 49.92], [427.52, 55.040000000000006], [430.08, 61.44], [431.36, 65.28], [432.64, 71.68], [435.2, 78.08000000000001], [435.2, 81.92000000000002], [435.2, 87.03999999999999], [435.2, 90.88], [433.92, 94.72], [431.36, 98.56], [428.8, 101.12], [423.68, 104.96000000000001], [419.84000000000003, 107.52000000000001], [409.6, 112.64000000000001], [401.92, 115.20000000000002], [399.36, 116.47999999999999], [395.52, 119.03999999999999]]))
      .toBeTruthy();
    
    expect(isComplexPolygon([[322.56, 332.8], [322.56, 332.8], [317.44, 330.24], [311.04, 326.40000000000003], [302.08, 322.56], [290.56, 316.16], [279.04, 309.76], [263.68, 302.08], [252.16, 295.68], [239.36, 286.72], [226.56, 279.04], [220.16, 275.2], [209.92000000000002, 268.8], [200.96, 262.40000000000003], [193.28, 256], [185.6, 249.60000000000002], [179.20000000000002, 243.2], [172.8, 238.07999999999998], [165.12, 231.68], [160, 225.28000000000003], [153.6, 218.88], [145.92000000000002, 208.64], [138.24, 200.95999999999998], [134.4, 195.84000000000003], [128, 189.44], [122.88, 183.04], [119.04, 175.36], [116.48, 168.96], [115.2, 162.56], [113.92, 156.16], [113.92, 151.04], [113.92, 140.8], [119.04, 133.12], [128, 122.88], [139.52, 112.64000000000001], [158.72, 98.56], [170.24, 90.88], [188.16, 80.64000000000001], [203.52, 71.68], [216.32, 66.56], [227.84, 61.44], [238.08, 57.60000000000001], [249.6, 53.760000000000005], [257.28000000000003, 53.760000000000005], [263.68, 53.760000000000005], [270.08, 55.040000000000006], [275.2, 57.60000000000001], [279.04, 62.72], [282.88, 69.12], [288, 78.08000000000001], [290.56, 85.75999999999999], [293.12, 94.72], [295.68, 102.4], [296.96, 111.36000000000001], [296.96, 120.32], [296.96, 130.56], [293.12, 138.24], [290.56, 144.64000000000001], [284.16, 154.88], [279.04, 161.28], [272.64, 168.96], [267.52, 175.36], [261.12, 180.48000000000002], [253.44, 186.88], [247.04, 192], [239.36, 197.12], [234.24, 202.24], [226.56, 206.07999999999998], [220.16, 211.2], [212.48000000000002, 215.04000000000002], [207.36, 220.16000000000003], [200.96, 224], [194.56, 227.84000000000003], [188.16, 232.95999999999998], [183.04, 238.07999999999998], [176.64000000000001, 241.92000000000002], [172.8, 247.04000000000002], [168.96, 252.16000000000003], [166.4, 254.72000000000003], [162.56, 259.84000000000003], [161.28, 262.40000000000003], [160, 266.24], [158.72, 268.8], [156.16, 276.48], [156.16, 279.04], [156.16, 282.88], [154.88, 286.72], [154.88, 289.28000000000003], [154.88, 294.40000000000003], [154.88, 296.96], [154.88, 299.52], [156.16, 303.36], [157.44, 307.2], [160, 311.04], [161.28, 314.88], [163.84, 318.72], [166.4, 322.56], [170.24, 326.40000000000003], [172.8, 330.24], [176.64000000000001, 334.08], [180.48, 337.92], [184.32, 341.76], [189.44, 344.32], [193.28, 348.16], [198.4, 349.44], [202.24, 352], [209.92000000000002, 353.28000000000003], [215.04, 355.84000000000003], [221.44, 357.12], [227.84, 357.12], [234.24, 358.40000000000003], [243.20000000000002, 359.68], [250.88, 359.68], [257.28000000000003, 359.68], [263.68, 359.68], [270.08, 358.40000000000003], [275.2, 355.84000000000003]]))
      .toBeTruthy();
  });
  
  test('Polygon은 Simple Polygon이다', () => {
    expect(isComplexPolygon([[179.20000000000002, -15.36], [179.20000000000002, -15.36], [174.08, -15.36], [168.96, -12.799999999999997], [161.28, -11.519999999999996], [153.6, -10.240000000000002], [145.92000000000002, -8.96], [134.4, -7.68], [119.04, -3.8399999999999963], [103.68, 1.2800000000000011], [89.60000000000001, 8.960000000000008], [83.2, 14.079999999999998], [72.96000000000001, 21.760000000000005], [66.56, 29.439999999999998], [61.44, 37.120000000000005], [57.6, 46.08], [56.32, 55.040000000000006], [56.32, 64], [57.6, 75.52000000000001], [61.44, 84.47999999999999], [70.4, 97.28], [80.64, 108.80000000000001], [93.44, 120.32], [110.08, 130.56], [125.44, 140.8], [143.36, 147.20000000000002], [160, 152.32], [177.92000000000002, 153.6], [194.56, 153.6], [208.64000000000001, 153.6], [218.88, 148.48000000000002], [230.4, 142.08], [241.92000000000002, 134.4], [250.88, 129.28], [259.84000000000003, 122.88], [267.52, 113.92000000000002], [271.36, 108.80000000000001], [279.04, 97.28], [282.88, 88.32], [285.44, 78.08000000000001], [285.44, 66.56], [285.44, 53.760000000000005], [282.88, 43.519999999999996], [279.04, 33.28], [275.2, 24.320000000000007], [272.64, 20.480000000000004], [268.8, 12.799999999999997], [264.96, 5.1200000000000045], [262.4, 0]]))
      .toBeFalsy();
    
    expect(isComplexPolygon([[253.44, 97.28], [252.16, 97.28], [247.04, 93.44], [239.36, 90.88], [231.68, 87.03999999999999], [225.28, 83.20000000000002], [217.6, 79.36000000000001], [211.20000000000002, 78.08000000000001], [200.96, 74.24000000000001], [186.88, 72.96000000000001], [177.92000000000002, 71.68], [168.96, 71.68], [156.16, 74.24000000000001], [148.48, 75.52000000000001], [140.8, 80.64000000000001], [133.12, 85.75999999999999], [126.72, 92.16], [120.32000000000001, 98.56], [111.36, 111.36000000000001], [107.52, 119.03999999999999], [102.4, 129.28], [97.28, 142.08], [94.72, 152.32], [92.16, 163.84], [88.32000000000001, 180.48000000000002], [87.04, 192], [87.04, 200.95999999999998], [87.04, 211.2], [87.04, 222.72000000000003], [88.32000000000001, 234.24], [90.88, 240.64], [96, 248.32], [101.12, 256], [108.8, 262.40000000000003], [117.76, 270.08], [126.72, 273.92], [139.52, 279.04], [152.32, 281.6], [166.4, 282.88], [184.32, 284.16], [209.92000000000002, 284.16], [224, 281.6], [244.48000000000002, 277.76], [266.24, 275.2], [281.6, 271.36], [298.24, 266.24], [308.48, 262.40000000000003], [321.28000000000003, 257.28000000000003], [331.52, 250.88], [340.48, 243.2], [346.88, 236.8], [352, 230.40000000000003], [355.84000000000003, 221.44], [357.12, 213.76], [358.40000000000003, 207.36], [358.40000000000003, 199.68], [359.68, 193.28000000000003], [359.68, 185.6], [359.68, 180.48000000000002], [359.68, 176.64000000000001], [358.40000000000003, 170.24], [358.40000000000003, 165.12], [357.12, 160], [354.56, 154.88], [352, 149.76], [348.16, 144.64000000000001], [344.32, 140.8], [340.48, 135.68], [335.36, 133.12]]))
      .toBeFalsy();
    
  });
});
```


### src/\_packages/@lunit/is\-intersection/\_\_tests\_\_/isIntersection.test.ts


```ts
import { isIntersection } from '@lunit/is-intersection';

describe('isIntersection()', () => {
  test('ab와 cd는 교차한다', () => {
    expect(isIntersection([0, 0], [10, 10], [10, 0], [0, 10])).toBeTruthy();
  });
  
  test('ab와 cd는 교차하지 않는다', () => {
    expect(isIntersection([0, 0], [10, 0], [0, 10], [10, 10])).toBeFalsy();
  });
});
```


### src/\_packages/@lunit/is\-polygon\-area\-greater\-than\-area/\_\_tests\_\_/isPolygonAreaGreaterThanArea.test.ts


```ts
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';

describe('isPolygonAreaGreaterThanArea()', () => {
  test('Polygon의 Area는 100보다 크다', () => {
    expect(isPolygonAreaGreaterThanArea([[293.12, 344.32], [293.12, 344.32], [290.56, 345.6], [288, 348.16], [285.44, 350.72], [282.88, 353.28000000000003], [280.32, 357.12], [273.92, 362.24], [270.08, 367.36], [264.96, 371.2], [262.4, 373.76], [257.28000000000003, 377.6], [254.72, 380.16], [252.16, 382.72], [250.88, 384], [249.6, 385.28000000000003], [248.32, 385.28000000000003], [248.32, 385.28000000000003], [247.04, 386.56], [245.76, 386.56], [243.20000000000002, 386.56], [240.64000000000001, 386.56], [235.52, 385.28000000000003], [231.68, 384], [227.84, 381.44], [224, 377.6], [218.88, 375.04], [217.6, 373.76], [215.04, 371.2], [212.48000000000002, 368.64], [211.20000000000002, 366.08], [209.92000000000002, 362.24], [209.92000000000002, 360.96000000000004], [209.92000000000002, 358.40000000000003], [209.92000000000002, 355.84000000000003], [209.92000000000002, 354.56], [211.20000000000002, 350.72], [212.48000000000002, 348.16], [213.76, 346.88], [213.76, 344.32], [215.04, 343.04], [216.32, 340.48], [216.32, 340.48], [217.6, 339.2], [217.6, 337.92], [218.88, 337.92], [218.88, 337.92], [220.16, 336.64], [221.44, 336.64], [224, 335.36], [226.56, 334.08], [234.24, 332.8], [239.36, 330.24], [247.04, 327.68], [253.44, 326.40000000000003], [259.84000000000003, 325.12], [263.68, 323.84000000000003], [267.52, 322.56], [271.36, 321.28000000000003], [273.92, 321.28000000000003], [276.48, 321.28000000000003], [276.48, 321.28000000000003], [277.76, 321.28000000000003], [280.32, 321.28000000000003], [282.88, 321.28000000000003]]))
      .toBeTruthy();
    
    expect(isPolygonAreaGreaterThanArea([[322.56, 71.68], [322.56, 71.68], [316.16, 74.24000000000001], [309.76, 75.52000000000001], [302.08, 78.08000000000001], [295.68, 80.64000000000001], [288, 84.47999999999999], [284.16, 87.03999999999999], [279.04, 90.88], [272.64, 96], [270.08, 99.84], [267.52, 102.4], [267.52, 107.52000000000001], [267.52, 110.08000000000001], [268.8, 112.64000000000001], [272.64, 116.47999999999999], [282.88, 121.6], [293.12, 125.44], [302.08, 128], [312.32, 129.28], [321.28000000000003, 129.28], [334.08, 129.28], [339.2, 130.56], [349.44, 129.28], [357.12, 128], [360.96, 126.72], [366.08, 125.44], [371.2, 124.16], [372.48, 122.88], [375.04, 120.32], [377.6, 117.75999999999999], [377.6, 115.20000000000002], [377.6, 112.64000000000001], [377.6, 107.52000000000001], [377.6, 104.96000000000001], [376.32, 101.12], [373.76, 98.56], [372.48, 94.72], [371.2, 92.16], [368.64, 89.6], [367.36, 88.32], [367.36, 87.03999999999999], [366.08, 85.75999999999999], [366.08, 85.75999999999999], [364.8, 84.47999999999999]]))
      .toBeTruthy();
    
    expect(isPolygonAreaGreaterThanArea([[408.32, 177.92000000000002], [408.32, 177.92000000000002], [407.04, 177.92000000000002], [405.76, 179.20000000000002], [404.48, 180.48000000000002], [401.92, 181.76], [400.64, 183.04], [399.36, 185.6], [396.8, 186.88], [396.8, 190.72], [395.52, 194.56], [395.52, 195.84000000000003], [395.52, 198.39999999999998], [395.52, 200.95999999999998], [396.8, 200.95999999999998], [398.08, 203.51999999999998], [399.36, 204.8], [401.92, 204.8], [404.48, 206.07999999999998], [405.76, 206.07999999999998], [409.6, 206.07999999999998], [413.44, 206.07999999999998], [416, 204.8], [417.28000000000003, 204.8], [421.12, 203.51999999999998], [422.40000000000003, 202.24], [423.68, 200.95999999999998], [424.96000000000004, 200.95999999999998], [426.24, 200.95999999999998], [426.24, 199.68], [426.24, 199.68], [427.52, 199.68], [427.52, 198.39999999999998], [427.52, 198.39999999999998], [427.52, 197.12], [427.52, 197.12], [427.52, 195.84000000000003], [427.52, 195.84000000000003], [427.52, 194.56], [427.52, 193.28000000000003], [427.52, 193.28000000000003], [427.52, 193.28000000000003], [427.52, 192], [427.52, 192], [427.52, 192], [427.52, 190.72], [427.52, 190.72], [427.52, 189.44], [427.52, 189.44], [427.52, 188.16], [427.52, 186.88], [427.52, 186.88], [427.52, 186.88], [427.52, 185.6], [427.52, 185.6], [427.52, 185.6], [427.52, 185.6], [427.52, 184.32], [427.52, 184.32], [426.24, 183.04]]))
      .toBeTruthy();
    
    expect(isPolygonAreaGreaterThanArea([[62.72, 371.2], [62.72, 371.2], [62.72, 371.2], [61.44, 371.2], [60.160000000000004, 371.2], [60.160000000000004, 371.2], [58.88, 371.2], [57.6, 372.48], [56.32, 373.76], [55.04, 375.04], [55.04, 376.32], [53.76, 376.32], [53.76, 377.6], [53.76, 378.88], [53.76, 380.16], [53.76, 381.44], [53.76, 381.44], [53.76, 382.72], [55.04, 382.72], [56.32, 384], [57.6, 384], [58.88, 384], [60.160000000000004, 384], [61.44, 384], [62.72, 384], [62.72, 384], [64, 384], [65.28, 384], [65.28, 384], [65.28, 384], [65.28, 384], [66.56, 384], [66.56, 382.72], [66.56, 382.72], [66.56, 382.72], [66.56, 382.72], [67.84, 382.72], [67.84, 382.72], [67.84, 381.44], [67.84, 381.44], [67.84, 380.16], [67.84, 378.88], [67.84, 378.88], [66.56, 377.6], [66.56, 376.32], [66.56, 376.32], [65.28, 375.04], [65.28, 375.04], [65.28, 375.04], [65.28, 375.04]]))
      .toBeTruthy();
  });
  
  test('Polygon의 Area는 100보다 작다', () => {
    expect(isPolygonAreaGreaterThanArea([[407.04, 336.64], [407.04, 336.64], [407.04, 337.92], [407.04, 339.2], [407.04, 339.2], [407.04, 340.48], [407.04, 340.48], [407.04, 341.76], [407.04, 341.76], [407.04, 341.76], [408.32, 341.76], [409.6, 343.04], [410.88, 343.04], [410.88, 343.04], [412.16, 343.04], [412.16, 343.04], [413.44, 343.04], [413.44, 343.04], [413.44, 343.04], [413.44, 343.04], [414.72, 343.04]]))
      .toBeFalsy();
    
    expect(isPolygonAreaGreaterThanArea([[404.48, 350.72], [404.48, 352], [404.48, 352], [404.48, 352], [404.48, 352], [404.48, 353.28000000000003], [404.48, 353.28000000000003], [404.48, 353.28000000000003], [404.48, 353.28000000000003], [404.48, 353.28000000000003], [405.76, 354.56], [405.76, 354.56], [405.76, 354.56], [405.76, 354.56], [405.76, 354.56], [405.76, 354.56], [407.04, 354.56]]))
      .toBeFalsy();
    
    expect(isPolygonAreaGreaterThanArea([[180.48, 453.12], [179.20000000000002, 453.12], [179.20000000000002, 453.12], [177.92000000000002, 453.12], [176.64000000000001, 453.12], [176.64000000000001, 453.12], [175.36, 453.12], [175.36, 454.4], [175.36, 454.4], [175.36, 455.68000000000006], [175.36, 455.68000000000006], [175.36, 456.96000000000004], [175.36, 456.96000000000004], [175.36, 456.96000000000004], [175.36, 458.24], [175.36, 458.24], [175.36, 458.24], [175.36, 459.52], [175.36, 459.52], [175.36, 459.52], [176.64000000000001, 459.52], [176.64000000000001, 459.52], [176.64000000000001, 459.52], [176.64000000000001, 458.24]]))
      .toBeFalsy();
  });
});
```


### src/\_packages/@lunit/use\-opt\-control/\_\_tests\_\_/useOPTControl.test.ts


```ts
import { act, renderHook } from '@testing-library/react-hooks';
import { useOPTControl } from '../useOPTControl';

//tslint:disable:react-hooks-nesting
describe('useOPTControl()', () => {
  test('basic', () => {
    const {result} = renderHook(() => useOPTControl());
    
    expect(result.current.control).toBe('pan');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();
    
    act(() => {
      result.current.updateControl('pen');
      result.current.updateFlip(true);
    });
    
    expect(result.current.control).toBe('pen');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeTruthy();
    
    act(() => {
      result.current.updateControl('adjust');
      result.current.updateInvert(true);
    });
    
    expect(result.current.control).toBe('adjust');
    expect(result.current.invert).toBeTruthy();
    expect(result.current.flip).toBeTruthy();
    
    act(() => {
      result.current.resetControl();
    });
    
    expect(result.current.control).toBe('pan');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();
  });
});
```


### src/\_packages/@lunit/use\-state\-memo/\_\_tests\_\_/useStateMemo.test.ts


```ts
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
```

<!-- importend -->

## Storybook
<!-- import src/**/*.stories.{js,jsx,ts,tsx} --title-tag h3 -->

### src/\_packages/@lunit/heatmap/\_\_stories\_\_/HeatmapScaleSVGImage.stories.tsx


```tsx
import { HeatmapScaleSVGImage } from '@lunit/heatmap';
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

/**
 * Heatmap이 그려진 SVG <image>를 만든다
 * <svg>를 사용해서 별도의 디자인을 구현하려고 할때 사용할 수 있다
 */
storiesOf('heatmap', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withKnobs)
  .add('<HeatmapScaleSVGImage>', () => {
    const width: number = number('Width', 300, {range: true, step: 10, min: 100, max: 600});
    const height: number = number('Height', 100, {range: true, step: 10, min: 60, max: 300});
    const threshold: number = number('Threshold', 0, {range: true, step: 0.1, min: 0, max: 1});
    
    return (
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="#000000"/>
        <HeatmapScaleSVGImage width={width} height={height} threshold={threshold}/>
      </svg>
    );
  });
```


### src/\_packages/@lunit/heatmap/\_\_stories\_\_/posMapToImageData.stories.tsx


```tsx
import { posMapToImageData } from '@lunit/heatmap';
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import data from './posMap.sample.json';

const {engine_result: {engine_result: {pos_map: posMap}}} = data;

/**
 * Heatmap이 그려진 ImageData를 만든다
 * <canvas>를 사용해서 별도의 디자인을 구현하려고 할 때 사용할 수 있다
 */
function Sample() {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement | null>(null);
  
  // AI에서 나온 posMap 결과를 ImageData로 변환한다
  const imageData = useMemo<ImageData>(() => {
    return posMapToImageData(posMap, 0.1);
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current) throw new Error('<canvas> is null');
    const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');
    if (!ctx) throw new Error('ctx is null');
    
    // ImageData를 Canvas Context에 그린다
    ctx.putImageData(imageData, 0, 0);
  }, [imageData]);
  
  return <canvas ref={canvasRef}
                 width={imageData.width}
                 height={imageData.height}
                 style={{
                   width: imageData.width,
                   height: imageData.height,
                 }}/>;
}

storiesOf('heatmap', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('posMapToImageData()', () => <Sample/>);
```


### src/\_packages/@lunit/heatmap/\_\_stories\_\_/useHeatmapScaleImageURI.stories.tsx


```tsx
import { useHeatmapScaleImageURI } from '@lunit/heatmap';
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

/**
 * Heatmap이 그려진 Data URI를 만든다
 * <img>를 비롯한 여러 Element를 사용해서 별도의 디자인을 구현하려 할 때 사용할 수 있다
 */
function Image({width, height, threshold}: {width: number, height: number, threshold: number}) {
  const dataUri: string | null = useHeatmapScaleImageURI({width, height, threshold});
  return dataUri ? (
    <img src={dataUri}
         style={{width, height, backgroundColor: '#000000'}}
         alt="test"/>
  ) : null;
}

storiesOf('heatmap', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withKnobs)
  .add('useHeatmapScaleImageURI()', () => {
    const width: number = number('Width', 300, {range: true, step: 10, min: 100, max: 600});
    const height: number = number('Height', 100, {range: true, step: 10, min: 60, max: 300});
    const threshold: number = number('Threshold', 0, {range: true, step: 0.1, min: 0, max: 1});
    
    return (
      <Image width={width} height={height} threshold={threshold}/>
    );
  });
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/CircleViewer.stories.tsx


```tsx
import {
  CircleDrawer,
  CircleViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  // pan, adjust, zoom은
  // pan={true}로 설정하면 내부 Element를 사용해서 MouseEvent를 처리하게 되고,
  // pan={HTMLElement}로 설정하면 해당 Element를 사용해서 MouseEvent를 처리하게 된다.
  // MouseEvent를 처리하는 Layer가 여러개 중첩될 때, 하위 Layer의 MouseEvent가 막히는 현상을 해결해준다.
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  // <InsightViewer> 내부의 Canvas Render를 외부의 다른 Component들에 동기화 시키기 위한 Hook
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // Annotation (사용자 Contour)를 다루기 위한 Hook
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour({
    mode: 'circle',
  });
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {
        // 사용자가 그린 Annotation을 보여준다
        // contours가 있는 경우에만 출력
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        <CircleViewer width={width}
                      height={height}
                      contours={contours}
                      focusedContour={focusedContour}
                      cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        // Annotation을 그리고, 지우게 해준다
        // control === 'pen' 인 경우에만 출력
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        <CircleDrawer width={width}
                      height={height}
                      contours={contours}
                      draw={control === 'pen' && interactionElement}
                      onFocus={focusContour}
                      onAdd={contour => addContour(contour)}
                      onRemove={removeContour}
                      cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<CircleViewer>', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/ContourViewer.stories.tsx


```tsx
import {
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  // pan, adjust, zoom은
  // pan={true}로 설정하면 내부 Element를 사용해서 MouseEvent를 처리하게 되고,
  // pan={HTMLElement}로 설정하면 해당 Element를 사용해서 MouseEvent를 처리하게 된다.
  // MouseEvent를 처리하는 Layer가 여러개 중첩될 때, 하위 Layer의 MouseEvent가 막히는 현상을 해결해준다.
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  // <InsightViewer> 내부의 Canvas Render를 외부의 다른 Component들에 동기화 시키기 위한 Hook
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // Annotation (사용자 Contour)를 다루기 위한 Hook
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {
        // 사용자가 그린 Annotation을 보여준다
        // contours가 있는 경우에만 출력
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        <ContourViewer width={width}
                       height={height}
                       contours={contours}
                       focusedContour={focusedContour}
                       cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        // Annotation을 그리고, 지우게 해준다
        // control === 'pen' 인 경우에만 출력
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        <ContourDrawer width={width}
                       height={height}
                       contours={contours}
                       draw={control === 'pen' && interactionElement}
                       onFocus={focusContour}
                       onAdd={contour => addContour(contour)}
                       onRemove={removeContour}
                       cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<ContourViewer>', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/ContourViewerCategoryColors.stories.tsx


```tsx
import {
  Contour,
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import { color as d3color } from 'd3-color';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function labelFunction(contour: Contour): string {
  console.log('UserContourViewerColors2.stories.tsx..labelFunction()', contour.dataAttrs);
  return `[${contour.id}] ${contour.dataAttrs?.['data-category']}`;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    polygon: [[365.2266666666667, 40.959999999999994], [360.96000000000004, 43.519999999999996], [356.6933333333333, 46.93333333333334], [353.28000000000003, 50.346666666666664], [349.8666666666667, 53.760000000000005], [348.16, 58.879999999999995], [346.4533333333334, 64.85333333333334], [345.6, 70.82666666666667], [345.6, 77.65333333333334], [349.0133333333334, 85.33333333333333], [358.40000000000003, 93.01333333333334], [371.20000000000005, 98.13333333333334], [390.8266666666667, 102.39999999999999], [412.16, 103.25333333333334], [432.64000000000004, 101.54666666666667], [444.5866666666667, 98.13333333333334], [453.12, 94.72000000000001], [458.24, 91.30666666666666], [460.8, 86.18666666666668], [461.65333333333336, 82.77333333333334], [457.3866666666667, 77.65333333333334], [452.2666666666667, 70.82666666666667], [446.29333333333335, 63.146666666666675], [443.73333333333335, 58.02666666666667], [441.17333333333335, 52.906666666666666], [439.4666666666667, 49.49333333333334], [437.76000000000005, 47.78666666666666]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[260.2666666666667, 180.9066666666667], [260.2666666666667, 181.76], [256, 186.0266666666667], [253.44000000000003, 188.5866666666667], [250.88000000000002, 192], [248.32000000000002, 197.97333333333336], [245.76000000000002, 204.8], [244.9066666666667, 212.48000000000002], [244.9066666666667, 224.42666666666668], [248.32000000000002, 235.51999999999998], [257.7066666666667, 246.61333333333334], [271.36, 256.85333333333335], [298.6666666666667, 265.38666666666666], [308.9066666666667, 266.24], [331.9466666666667, 264.53333333333336], [343.04, 258.56], [349.8666666666667, 253.44], [354.1333333333334, 248.32], [356.6933333333333, 242.3466666666667], [357.5466666666667, 236.37333333333333], [357.5466666666667, 228.69333333333333], [357.5466666666667, 220.16000000000003], [354.9866666666667, 211.62666666666667], [349.8666666666667, 201.38666666666666], [343.8933333333334, 193.70666666666665], [337.06666666666666, 189.44], [328.53333333333336, 186.0266666666667], [320.85333333333335, 186.0266666666667], [313.17333333333335, 186.88]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
  {
    polygon: [[157.01333333333335, 369.49333333333334], [157.01333333333335, 369.49333333333334], [151.89333333333335, 376.32], [148.48000000000002, 382.29333333333335], [144.21333333333334, 389.97333333333336], [138.24, 405.33333333333337], [134.82666666666668, 416.4266666666667], [133.12, 431.7866666666667], [132.26666666666668, 444.5866666666667], [133.12, 454.82666666666665], [136.53333333333333, 462.50666666666666], [145.06666666666666, 470.18666666666667], [155.30666666666667, 474.4533333333333], [169.81333333333333, 477.0133333333334], [184.32000000000002, 476.16], [195.41333333333336, 472.7466666666667], [205.65333333333334, 467.62666666666667], [211.6266666666667, 463.36], [219.30666666666667, 456.53333333333336], [221.86666666666667, 451.41333333333336], [222.72000000000003, 446.29333333333335], [222.72000000000003, 439.4666666666667], [221.01333333333335, 430.08], [216.74666666666667, 418.9866666666667], [212.48000000000002, 409.6], [207.36, 401.06666666666666], [200.53333333333336, 394.24], [193.70666666666668, 389.12], [187.73333333333335, 385.70666666666665]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[104.96000000000001, 89.60000000000001], [104.10666666666667, 89.60000000000001], [97.28, 91.30666666666666], [91.30666666666667, 93.01333333333334], [86.18666666666667, 94.72000000000001], [79.36, 98.13333333333334], [71.68, 103.25333333333334], [65.70666666666668, 109.22666666666667], [61.440000000000005, 113.49333333333333], [58.88, 121.17333333333333], [58.02666666666667, 129.70666666666665], [60.58666666666667, 145.06666666666666], [64, 151.04000000000002], [73.38666666666667, 162.98666666666668], [96.42666666666668, 179.2], [115.2, 186.88], [134.82666666666668, 191.1466666666667], [155.30666666666667, 191.1466666666667], [168.10666666666668, 188.5866666666667], [178.34666666666666, 186.0266666666667], [186.88000000000002, 180.9066666666667], [191.14666666666668, 175.7866666666667], [193.70666666666668, 169.81333333333333], [194.56, 163.84000000000003], [194.56, 158.72000000000003], [194.56, 151.89333333333332], [193.70666666666668, 146.77333333333337], [192, 140.8], [192, 139.09333333333336], [190.29333333333335, 133.97333333333336]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[249.17333333333335, -17.06666666666667], [246.61333333333334, -17.06666666666667], [232.10666666666668, -12.800000000000004], [221.01333333333335, -9.38666666666667], [208.21333333333334, -5.1200000000000045], [198.82666666666668, 0], [192, 5.119999999999997], [187.73333333333335, 10.240000000000002], [185.17333333333335, 15.36], [183.46666666666667, 23.040000000000006], [183.46666666666667, 34.13333333333334], [183.46666666666667, 46.93333333333334], [186.02666666666667, 64.85333333333334], [190.29333333333335, 76.8], [197.97333333333336, 86.18666666666668], [207.36, 93.01333333333334], [221.86666666666667, 97.28000000000002], [238.08, 98.98666666666666], [256.85333333333335, 98.13333333333334], [271.36, 93.86666666666666], [284.16, 87.89333333333333], [296.96000000000004, 80.21333333333334], [306.3466666666667, 72.53333333333333], [310.61333333333334, 67.41333333333334], [313.17333333333335, 60.58666666666667], [314.0266666666667, 54.61333333333333], [314.0266666666667, 44.373333333333335], [312.32, 35.84], [308.9066666666667, 25.599999999999994], [306.3466666666667, 17.066666666666663], [304.64000000000004, 7.68], [303.7866666666667, 1.7066666666666634], [302.93333333333334, -2.5600000000000023], [302.08000000000004, -5.973333333333336]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
  {
    polygon: [[320, 363.52], [318.29333333333335, 363.52], [314.0266666666667, 365.2266666666667], [308.05333333333334, 367.7866666666667], [300.37333333333333, 374.61333333333334], [291.84000000000003, 381.44], [287.5733333333333, 389.12], [285.0133333333334, 395.94666666666666], [284.16, 401.92], [284.16, 407.04], [287.5733333333333, 414.72], [295.25333333333333, 423.25333333333333], [305.49333333333334, 432.64], [318.29333333333335, 441.17333333333335], [329.3866666666667, 446.29333333333335], [344.74666666666667, 449.7066666666667], [353.28000000000003, 450.56], [360.96000000000004, 450.56], [366.93333333333334, 448], [374.61333333333334, 444.5866666666667], [380.5866666666667, 441.17333333333335], [384.85333333333335, 437.76], [389.12, 433.49333333333334], [391.68, 426.6666666666667], [392.53333333333336, 416.4266666666667], [393.3866666666667, 401.92], [393.3866666666667, 391.68], [390.8266666666667, 382.29333333333335], [388.2666666666667, 377.17333333333335], [384.85333333333335, 372.9066666666667], [379.73333333333335, 371.2], [374.61333333333334, 370.3466666666667], [367.7866666666667, 370.3466666666667], [358.40000000000003, 370.3466666666667], [354.9866666666667, 370.3466666666667]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[410.4533333333334, 273.06666666666666], [407.04, 273.92], [401.92, 275.62666666666667], [397.65333333333336, 276.48], [395.09333333333336, 278.18666666666667], [392.53333333333336, 279.04], [389.97333333333336, 281.6], [388.2666666666667, 284.16], [386.56, 289.28000000000003], [384.85333333333335, 296.1066666666667], [383.1466666666667, 306.3466666666667], [381.44, 318.29333333333335], [380.5866666666667, 327.68], [381.44, 333.65333333333336], [385.7066666666667, 337.92], [392.53333333333336, 342.18666666666667], [401.92, 345.6], [414.72, 349.0133333333333], [427.52000000000004, 349.8666666666667], [438.61333333333334, 349.8666666666667], [446.29333333333335, 347.3066666666667], [453.12, 344.74666666666667], [456.53333333333336, 341.3333333333333], [459.9466666666667, 337.06666666666666], [461.65333333333336, 332.8], [463.36, 327.68], [464.21333333333337, 321.70666666666665], [465.0666666666667, 314.88], [465.92, 307.2], [465.92, 302.08], [465.92, 296.96], [465.92, 292.6933333333333], [465.0666666666667, 289.28000000000003], [463.36, 285.0133333333333], [461.65333333333336, 281.6], [458.24, 277.3333333333333], [454.8266666666667, 274.7733333333333], [450.56, 271.36], [447.1466666666667, 269.6533333333333], [444.5866666666667, 267.94666666666666], [442.88000000000005, 267.09333333333336], [440.32000000000005, 267.09333333333336]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
  {
    polygon: [[95.57333333333334, 251.73333333333335], [89.60000000000001, 255.14666666666665], [82.77333333333334, 261.12], [75.94666666666667, 267.94666666666666], [72.53333333333333, 273.92], [69.97333333333334, 279.8933333333333], [69.12, 285.0133333333333], [69.12, 290.9866666666667], [69.97333333333334, 298.6666666666667], [75.94666666666667, 308.05333333333334], [82.77333333333334, 315.73333333333335], [93.01333333333334, 323.41333333333336], [106.66666666666667, 330.24], [120.32000000000001, 332.8], [134.82666666666668, 333.65333333333336], [157.86666666666667, 330.24], [174.08, 323.41333333333336], [183.46666666666667, 317.44], [193.70666666666668, 310.61333333333334], [201.38666666666668, 303.7866666666667], [205.65333333333334, 297.81333333333333], [207.36, 291.84], [208.21333333333334, 283.3066666666667], [205.65333333333334, 273.92], [197.97333333333336, 262.82666666666665], [188.58666666666667, 251.73333333333335], [180.05333333333334, 244.90666666666664], [169.81333333333333, 238.07999999999998], [161.28, 233.81333333333333], [154.45333333333335, 231.25333333333333], [149.33333333333334, 230.39999999999998], [145.06666666666666, 230.39999999999998]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[31.573333333333334, 365.2266666666667], [30.720000000000002, 365.2266666666667], [27.30666666666667, 368.64], [24.74666666666667, 372.9066666666667], [19.62666666666667, 380.5866666666667], [15.360000000000001, 387.41333333333336], [11.946666666666667, 395.09333333333336], [10.24, 403.62666666666667], [9.386666666666667, 410.4533333333333], [9.386666666666667, 417.28000000000003], [11.093333333333334, 422.40000000000003], [17.92, 427.52000000000004], [30.720000000000002, 433.49333333333334], [45.22666666666667, 435.2], [55.46666666666667, 435.2], [65.70666666666668, 434.3466666666667], [74.24000000000001, 430.08], [81.92, 424.96000000000004], [87.04, 419.84000000000003], [90.45333333333333, 414.72], [92.16000000000001, 409.6], [93.01333333333334, 403.62666666666667], [93.01333333333334, 395.94666666666666], [90.45333333333333, 388.26666666666665], [86.18666666666667, 381.44], [81.92, 375.4666666666667], [75.09333333333333, 370.3466666666667], [63.14666666666667, 364.37333333333333], [53.760000000000005, 362.6666666666667], [48.64, 362.6666666666667], [42.66666666666667, 363.52], [40.96, 364.37333333333333], [36.693333333333335, 366.08]],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
];

const colors = {
  normal: '#3366cc',
  abnormal: '#dc3912',
};

const contourStyle = (value: string, color: string) => css`
  > [data-category="${value}"] {
    --contour-viewer-color: ${color};
    --contour-viewer-focused-color: ${d3color(color)?.brighter(3).toString() || color};
    --contour-viewer-fill-color: ${color};
  }
`;

const Viewer = styled(ContourViewer)`
  polygon {
    fill-opacity: 0.3;
  }

  ${Object.keys(colors).map(value => contourStyle(value, colors[value]))};
`;

const Drawer = styled(ContourDrawer)`
  --contour-drawer-color: #99f4ac;
  --contour-drawer-fill-color: rgba(255, 255, 255, 0.4);
  --contour-drawer-stroke-width: 7px;
`;

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour({initialContours});
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <Viewer width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <Drawer width={width}
                height={height}
                contours={contours}
                draw={control === 'pen' && interactionElement}
                onFocus={focusContour}
                onAdd={contour => addContour(contour, {
                  dataAttrs: {'data-category': Math.random() > 0.5 ? 'normal' : 'abnormal'},
                  label: labelFunction,
                })}
                onRemove={removeContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<ContourViewer className={categoryColors}>', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/ContourViewerColors.stories.tsx


```tsx
import {
  Contour,
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import { color as d3color } from 'd3-color';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function labelFunction(contour: Contour): string {
  return `CONTOUR(${contour.id})`;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    polygon: [[365.2266666666667, 40.959999999999994], [360.96000000000004, 43.519999999999996], [356.6933333333333, 46.93333333333334], [353.28000000000003, 50.346666666666664], [349.8666666666667, 53.760000000000005], [348.16, 58.879999999999995], [346.4533333333334, 64.85333333333334], [345.6, 70.82666666666667], [345.6, 77.65333333333334], [349.0133333333334, 85.33333333333333], [358.40000000000003, 93.01333333333334], [371.20000000000005, 98.13333333333334], [390.8266666666667, 102.39999999999999], [412.16, 103.25333333333334], [432.64000000000004, 101.54666666666667], [444.5866666666667, 98.13333333333334], [453.12, 94.72000000000001], [458.24, 91.30666666666666], [460.8, 86.18666666666668], [461.65333333333336, 82.77333333333334], [457.3866666666667, 77.65333333333334], [452.2666666666667, 70.82666666666667], [446.29333333333335, 63.146666666666675], [443.73333333333335, 58.02666666666667], [441.17333333333335, 52.906666666666666], [439.4666666666667, 49.49333333333334], [437.76000000000005, 47.78666666666666]],
    label: labelFunction,
  },
  {
    polygon: [[260.2666666666667, 180.9066666666667], [260.2666666666667, 181.76], [256, 186.0266666666667], [253.44000000000003, 188.5866666666667], [250.88000000000002, 192], [248.32000000000002, 197.97333333333336], [245.76000000000002, 204.8], [244.9066666666667, 212.48000000000002], [244.9066666666667, 224.42666666666668], [248.32000000000002, 235.51999999999998], [257.7066666666667, 246.61333333333334], [271.36, 256.85333333333335], [298.6666666666667, 265.38666666666666], [308.9066666666667, 266.24], [331.9466666666667, 264.53333333333336], [343.04, 258.56], [349.8666666666667, 253.44], [354.1333333333334, 248.32], [356.6933333333333, 242.3466666666667], [357.5466666666667, 236.37333333333333], [357.5466666666667, 228.69333333333333], [357.5466666666667, 220.16000000000003], [354.9866666666667, 211.62666666666667], [349.8666666666667, 201.38666666666666], [343.8933333333334, 193.70666666666665], [337.06666666666666, 189.44], [328.53333333333336, 186.0266666666667], [320.85333333333335, 186.0266666666667], [313.17333333333335, 186.88]],
    label: labelFunction,
  },
  {
    polygon: [[157.01333333333335, 369.49333333333334], [157.01333333333335, 369.49333333333334], [151.89333333333335, 376.32], [148.48000000000002, 382.29333333333335], [144.21333333333334, 389.97333333333336], [138.24, 405.33333333333337], [134.82666666666668, 416.4266666666667], [133.12, 431.7866666666667], [132.26666666666668, 444.5866666666667], [133.12, 454.82666666666665], [136.53333333333333, 462.50666666666666], [145.06666666666666, 470.18666666666667], [155.30666666666667, 474.4533333333333], [169.81333333333333, 477.0133333333334], [184.32000000000002, 476.16], [195.41333333333336, 472.7466666666667], [205.65333333333334, 467.62666666666667], [211.6266666666667, 463.36], [219.30666666666667, 456.53333333333336], [221.86666666666667, 451.41333333333336], [222.72000000000003, 446.29333333333335], [222.72000000000003, 439.4666666666667], [221.01333333333335, 430.08], [216.74666666666667, 418.9866666666667], [212.48000000000002, 409.6], [207.36, 401.06666666666666], [200.53333333333336, 394.24], [193.70666666666668, 389.12], [187.73333333333335, 385.70666666666665]],
    label: labelFunction,
  },
  {
    polygon: [[104.96000000000001, 89.60000000000001], [104.10666666666667, 89.60000000000001], [97.28, 91.30666666666666], [91.30666666666667, 93.01333333333334], [86.18666666666667, 94.72000000000001], [79.36, 98.13333333333334], [71.68, 103.25333333333334], [65.70666666666668, 109.22666666666667], [61.440000000000005, 113.49333333333333], [58.88, 121.17333333333333], [58.02666666666667, 129.70666666666665], [60.58666666666667, 145.06666666666666], [64, 151.04000000000002], [73.38666666666667, 162.98666666666668], [96.42666666666668, 179.2], [115.2, 186.88], [134.82666666666668, 191.1466666666667], [155.30666666666667, 191.1466666666667], [168.10666666666668, 188.5866666666667], [178.34666666666666, 186.0266666666667], [186.88000000000002, 180.9066666666667], [191.14666666666668, 175.7866666666667], [193.70666666666668, 169.81333333333333], [194.56, 163.84000000000003], [194.56, 158.72000000000003], [194.56, 151.89333333333332], [193.70666666666668, 146.77333333333337], [192, 140.8], [192, 139.09333333333336], [190.29333333333335, 133.97333333333336]],
    label: labelFunction,
  },
  {
    polygon: [[249.17333333333335, -17.06666666666667], [246.61333333333334, -17.06666666666667], [232.10666666666668, -12.800000000000004], [221.01333333333335, -9.38666666666667], [208.21333333333334, -5.1200000000000045], [198.82666666666668, 0], [192, 5.119999999999997], [187.73333333333335, 10.240000000000002], [185.17333333333335, 15.36], [183.46666666666667, 23.040000000000006], [183.46666666666667, 34.13333333333334], [183.46666666666667, 46.93333333333334], [186.02666666666667, 64.85333333333334], [190.29333333333335, 76.8], [197.97333333333336, 86.18666666666668], [207.36, 93.01333333333334], [221.86666666666667, 97.28000000000002], [238.08, 98.98666666666666], [256.85333333333335, 98.13333333333334], [271.36, 93.86666666666666], [284.16, 87.89333333333333], [296.96000000000004, 80.21333333333334], [306.3466666666667, 72.53333333333333], [310.61333333333334, 67.41333333333334], [313.17333333333335, 60.58666666666667], [314.0266666666667, 54.61333333333333], [314.0266666666667, 44.373333333333335], [312.32, 35.84], [308.9066666666667, 25.599999999999994], [306.3466666666667, 17.066666666666663], [304.64000000000004, 7.68], [303.7866666666667, 1.7066666666666634], [302.93333333333334, -2.5600000000000023], [302.08000000000004, -5.973333333333336]],
    label: labelFunction,
  },
  {
    polygon: [[320, 363.52], [318.29333333333335, 363.52], [314.0266666666667, 365.2266666666667], [308.05333333333334, 367.7866666666667], [300.37333333333333, 374.61333333333334], [291.84000000000003, 381.44], [287.5733333333333, 389.12], [285.0133333333334, 395.94666666666666], [284.16, 401.92], [284.16, 407.04], [287.5733333333333, 414.72], [295.25333333333333, 423.25333333333333], [305.49333333333334, 432.64], [318.29333333333335, 441.17333333333335], [329.3866666666667, 446.29333333333335], [344.74666666666667, 449.7066666666667], [353.28000000000003, 450.56], [360.96000000000004, 450.56], [366.93333333333334, 448], [374.61333333333334, 444.5866666666667], [380.5866666666667, 441.17333333333335], [384.85333333333335, 437.76], [389.12, 433.49333333333334], [391.68, 426.6666666666667], [392.53333333333336, 416.4266666666667], [393.3866666666667, 401.92], [393.3866666666667, 391.68], [390.8266666666667, 382.29333333333335], [388.2666666666667, 377.17333333333335], [384.85333333333335, 372.9066666666667], [379.73333333333335, 371.2], [374.61333333333334, 370.3466666666667], [367.7866666666667, 370.3466666666667], [358.40000000000003, 370.3466666666667], [354.9866666666667, 370.3466666666667]],
    label: labelFunction,
  },
  {
    polygon: [[410.4533333333334, 273.06666666666666], [407.04, 273.92], [401.92, 275.62666666666667], [397.65333333333336, 276.48], [395.09333333333336, 278.18666666666667], [392.53333333333336, 279.04], [389.97333333333336, 281.6], [388.2666666666667, 284.16], [386.56, 289.28000000000003], [384.85333333333335, 296.1066666666667], [383.1466666666667, 306.3466666666667], [381.44, 318.29333333333335], [380.5866666666667, 327.68], [381.44, 333.65333333333336], [385.7066666666667, 337.92], [392.53333333333336, 342.18666666666667], [401.92, 345.6], [414.72, 349.0133333333333], [427.52000000000004, 349.8666666666667], [438.61333333333334, 349.8666666666667], [446.29333333333335, 347.3066666666667], [453.12, 344.74666666666667], [456.53333333333336, 341.3333333333333], [459.9466666666667, 337.06666666666666], [461.65333333333336, 332.8], [463.36, 327.68], [464.21333333333337, 321.70666666666665], [465.0666666666667, 314.88], [465.92, 307.2], [465.92, 302.08], [465.92, 296.96], [465.92, 292.6933333333333], [465.0666666666667, 289.28000000000003], [463.36, 285.0133333333333], [461.65333333333336, 281.6], [458.24, 277.3333333333333], [454.8266666666667, 274.7733333333333], [450.56, 271.36], [447.1466666666667, 269.6533333333333], [444.5866666666667, 267.94666666666666], [442.88000000000005, 267.09333333333336], [440.32000000000005, 267.09333333333336]],
    label: labelFunction,
  },
  {
    polygon: [[95.57333333333334, 251.73333333333335], [89.60000000000001, 255.14666666666665], [82.77333333333334, 261.12], [75.94666666666667, 267.94666666666666], [72.53333333333333, 273.92], [69.97333333333334, 279.8933333333333], [69.12, 285.0133333333333], [69.12, 290.9866666666667], [69.97333333333334, 298.6666666666667], [75.94666666666667, 308.05333333333334], [82.77333333333334, 315.73333333333335], [93.01333333333334, 323.41333333333336], [106.66666666666667, 330.24], [120.32000000000001, 332.8], [134.82666666666668, 333.65333333333336], [157.86666666666667, 330.24], [174.08, 323.41333333333336], [183.46666666666667, 317.44], [193.70666666666668, 310.61333333333334], [201.38666666666668, 303.7866666666667], [205.65333333333334, 297.81333333333333], [207.36, 291.84], [208.21333333333334, 283.3066666666667], [205.65333333333334, 273.92], [197.97333333333336, 262.82666666666665], [188.58666666666667, 251.73333333333335], [180.05333333333334, 244.90666666666664], [169.81333333333333, 238.07999999999998], [161.28, 233.81333333333333], [154.45333333333335, 231.25333333333333], [149.33333333333334, 230.39999999999998], [145.06666666666666, 230.39999999999998]],
    label: labelFunction,
  },
  {
    polygon: [[31.573333333333334, 365.2266666666667], [30.720000000000002, 365.2266666666667], [27.30666666666667, 368.64], [24.74666666666667, 372.9066666666667], [19.62666666666667, 380.5866666666667], [15.360000000000001, 387.41333333333336], [11.946666666666667, 395.09333333333336], [10.24, 403.62666666666667], [9.386666666666667, 410.4533333333333], [9.386666666666667, 417.28000000000003], [11.093333333333334, 422.40000000000003], [17.92, 427.52000000000004], [30.720000000000002, 433.49333333333334], [45.22666666666667, 435.2], [55.46666666666667, 435.2], [65.70666666666668, 434.3466666666667], [74.24000000000001, 430.08], [81.92, 424.96000000000004], [87.04, 419.84000000000003], [90.45333333333333, 414.72], [92.16000000000001, 409.6], [93.01333333333334, 403.62666666666667], [93.01333333333334, 395.94666666666666], [90.45333333333333, 388.26666666666665], [86.18666666666667, 381.44], [81.92, 375.4666666666667], [75.09333333333333, 370.3466666666667], [63.14666666666667, 364.37333333333333], [53.760000000000005, 362.6666666666667], [48.64, 362.6666666666667], [42.66666666666667, 363.52], [40.96, 364.37333333333333], [36.693333333333335, 366.08]],
    label: labelFunction,
  },
];

const colors = [
  '#3366cc',
  '#dc3912',
  '#ff9900',
  '#109618',
  '#990099',
  '#0099c6',
  '#dd4477',
  '#66aa00',
  '#b82e2e',
  '#316395',
  '#994499',
  '#22aa99',
  '#aaaa11',
  '#6633cc',
  '#e67300',
  '#8b0707',
  '#651067',
  '#329262',
  '#5574a6',
  '#3b3eac',
];

const contourStyle = (id: number, color: string) => css`
  > [data-id="${id}"] {
    --contour-viewer-color: ${color};
    --contour-viewer-focused-color: ${d3color(color)?.brighter(3).toString() || color};
    --contour-viewer-fill-color: ${color};
  }
`;

const Viewer = styled(ContourViewer)`
  polygon {
    fill-opacity: 0.2;
  }

  ${colors.map((color, i) => contourStyle(i, color))}
`;

const Drawer = styled(ContourDrawer)`
  --contour-drawer-color: #99f4ac;
  --contour-drawer-fill-color: rgba(255, 255, 255, 0.4);
  --contour-drawer-stroke-width: 7px;
`;

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour({initialContours});
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <Viewer width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <Drawer width={width}
                height={height}
                contours={contours}
                draw={control === 'pen' && interactionElement}
                onFocus={focusContour}
                onAdd={contour => addContour(contour, {label: labelFunction})}
                onRemove={removeContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<ContourViewer className={colors}>', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/ContourViewerStyle.stories.tsx


```tsx
import {
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

const Viewer = styled(ContourViewer)`
  --contour-viewer-stroke-width: 10px;
  --contour-viewer-focused-stroke-width: 20px;
  
  --contour-viewer-color: blue;
  --contour-viewer-focused-color: red;
  --contour-viewer-fill-color: rgba(0, 0, 255, 0.3);
  --contour-viewer-focused-fill-color: rgba(255, 0, 0, 0.3);
`;

const Drawer = styled(ContourDrawer)`
  --contour-drawer-color: #99f4ac;
  --contour-drawer-fill-color: rgba(255, 255, 255, 0.4);
  --contour-drawer-stroke-width: 8px;
`;

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <Viewer width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <Drawer width={width}
                height={height}
                contours={contours}
                draw={control === 'pen' && interactionElement}
                onFocus={focusContour}
                onAdd={contour => addContour(contour)}
                onRemove={removeContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<ContourViewer className="">', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/CornerstoneImageMulticat.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  return (
    <div>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('CornerstoneImage Multicast', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/DCMViewer.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  DCMImage,
  installWADOImageLoader,
  unloadWADOImage,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';

installWADOImageLoader();

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<DCMImage>', () => {
    //tslint:disable:react-hooks-nesting
    const image1: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
    const image2: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000011.dcm`, {unload: unloadWADOImage}), []);
    const image3: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000012.dcm`, {unload: unloadWADOImage}), []);
    const image4: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000013.dcm`, {unload: unloadWADOImage}), []);
    
    return (
      <ul>
        {
          [image1, image2, image3, image4].map((image, i) => (
            <li key={'image' + i}>
              <DCMImage cornerstoneImage={image} width={120} height={150}/>
            </li>
          ))
        }
      </ul>
    );
  });
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/HeatmapViewer.stories.tsx


```tsx
import {
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  HeatmapViewer,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import data from './posMap.sample.json';

const {engine_result: {engine_result: {pos_map: posMap}}} = data;

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {/*
      engineResult.posMap을 그리는 Layer
      현재 Heatmap Spec (number[][])에 맞춰서 개발되었기 때문에
      Spec이 다르다면 새로운 Viewer를 만들어야 한다
      */}
      <HeatmapViewer width={width}
                     height={height}
                     posMap={posMap}
                     threshold={0.1}
                     cornerstoneRenderData={cornerstoneRenderData}/>
      {
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        <ContourViewer width={width}
                       height={height}
                       contours={contours}
                       focusedContour={focusedContour}
                       cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        <ContourDrawer width={width}
                       height={height}
                       contours={contours}
                       draw={control === 'pen' && interactionElement}
                       onFocus={focusContour}
                       onAdd={contour => addContour(contour)}
                       onRemove={removeContour}
                       cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<HeatmapViewer>', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/InsightViewer.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import { useController, withTestController } from './decorators/withTestController';

// cornerstoneWADOImageLoader 초기화
installWADOImageLoader();

function Sample() {
  // <InsightViewer resetTime={}>을 변경하면 Viewport 등 cornerstone-core 관련 속성들이 초기화 된다
  const resetTime: number = useMemo(() => Date.now(), []);
  
  // unload 옵션은 위에 선언된 installWADOImageLoader()와 함께 동작한다
  // CornerstoneImage 객체를 unload 할때 wado image loader의 unload 동작을 하게 된다
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  // addDecorator(withTestController())의 값을 받는다
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  return (
    <InsightViewer width={width}
                   height={height}
                   invert={invert}
                   flip={flip}
                   pan={control === 'pan'}
                   adjust={control === 'adjust'}
                   zoom={wheel === 'zoom'}
                   resetTime={resetTime}
                   image={image}
                   updateCornerstoneRenderData={updateCornerstoneRenderData}/>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<InsightViewer>', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/PointViewer.stories.tsx


```tsx
import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  PointViewer,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function labelFunction({id}: Contour): string {
  return 'p' + id;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    label: labelFunction,
    polygon: [[100, 200]],
  },
  {
    label: labelFunction,
    polygon: [[200, 200]],
  },
];

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  // <InsightViewer> 내부의 Canvas Render를 외부의 다른 Component들에 동기화 시키기 위한 Hook
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // Annotation (사용자 Contour)를 다루기 위한 Hook
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour({
    mode: 'point',
    initialContours,
  });
  
  return (
    <Div>
      <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={control === 'pan' && interactionElement}
                       adjust={control === 'adjust' && interactionElement}
                       zoom={wheel === 'zoom' && interactionElement}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          contours &&
          cornerstoneRenderData &&
          <PointViewer width={width}
                       height={height}
                       contours={contours}
                       interact={control === 'pen'}
                       focusedContour={focusedContour}
                       onFocus={focusContour}
                       onAdd={polygon => addContour(polygon, {label: labelFunction})}
                       onRemove={removeContour}
                       cornerstoneRenderData={cornerstoneRenderData}/>
        }
        <ProgressViewer image={image}
                        width={width}
                        height={height}/>
      </InsightViewerContainer>
      
      <div>
        <pre>
          {JSON.stringify(focusedContour, null, 2)}
        </pre>
      </div>
    </Div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<UserPointViewer>', () => <Sample/>);

const Div = styled.div`
  display: flex;
`;

```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/ProgressCollector.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSeriesImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressCollector,
  ProgressViewer,
  unloadWADOImage,
  useContainerStyleOfProgressViewersInactivity,
  useInsightViewerSync,
  useProgressViewersActivity, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties, useMemo } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

function Sample() {
  // <ProgressCollector>는 하위의 <ProgressViewer>들의 상태를 수집한다
  return (
    <ProgressCollector>
      <Container/>
    </ProgressCollector>
  );
}

function Container() {
  const image1: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  const image2: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000020.dcm`, {unload: unloadWADOImage}), []);
  const image3: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000030.dcm`, {unload: unloadWADOImage}), []);
  const image4: CornerstoneImage = useMemo(() => new CornerstoneSeriesImage(series.map(p => `wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/${p}`), {unload: unloadWADOImage}), []);
  
  // <ProgressCollector>에서 수집한 정보를 얻을 수 있다
  const progressActivity: boolean = useProgressViewersActivity();
  // 혹은 <ProgressViewer>가 동작중일때 비활성을 처리할 Style을 만들 수 있다
  const containerDisabledStyle: CSSProperties = useContainerStyleOfProgressViewersInactivity({pointerEvents: 'none'});
  
  return (
    <div style={containerDisabledStyle}>
      <div style={{display: 'flex'}}>
        <Component image={image1}/>
        <Component image={image2}/>
        <Component image={image3}/>
        <Component image={image4}/>
      </div>
      <p>
        {
          progressActivity
            ? '<ProgressViewer>가 하나 이상 작동 중입니다!!!'
            : '동작중인 <ProgressViewer>가 없습니다!!!'
        }
      </p>
    </div>
  );
}

function Component({image}: {image: CornerstoneImage}) {
  const resetTime: number = useMemo(() => Date.now(), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const {updateCornerstoneRenderData} = useInsightViewerSync();
  
  return (
    <InsightViewerContainer width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {/* 이 <ProgressViewer>가 <ProgressCollector>에 수집된다 */}
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [300, 200, 500],
    height: [400, 300, 600],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<ProgressCollector>', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/SeriesImage.stories.tsx


```tsx
import {
  ContourDrawer,
  ContourViewer,
  CornerstoneBulkImage,
  CornerstoneSeriesImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useBulkImageScroll,
  useImageProgress,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

function Component() {
  const resetTime: number = useMemo(() => Date.now(), []);
  // CornerstoneSeriesImage는 여러장의 dcm 이미지를 받는다
  const image: CornerstoneBulkImage = useMemo(() => new CornerstoneSeriesImage(series.map(p => `wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/${p}`), {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  // CornerstoneBulkImage를 Wheel과 연결 시킨다
  useBulkImageScroll({
    image,
    element: interactionElement,
    enabled: wheel === 'scroll',
  });
  
  const imageProgress = useImageProgress(image);
  
  return (
    <div>
      <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={control === 'pan' && interactionElement}
                       adjust={control === 'adjust' && interactionElement}
                       zoom={wheel === 'zoom' && interactionElement}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          contours &&
          contours.length > 0 &&
          cornerstoneRenderData &&
          <ContourViewer width={width}
                         height={height}
                         contours={contours}
                         focusedContour={focusedContour}
                         cornerstoneRenderData={cornerstoneRenderData}/>
        }
        {
          contours &&
          cornerstoneRenderData &&
          control === 'pen' &&
          <ContourDrawer width={width}
                         height={height}
                         contours={contours}
                         draw={control === 'pen' && interactionElement}
                         onFocus={focusContour}
                         onAdd={contour => addContour(contour)}
                         onRemove={removeContour}
                         cornerstoneRenderData={cornerstoneRenderData}/>
        }
        <ProgressViewer image={image}
                        width={width}
                        height={height}/>
      </InsightViewerContainer>
      
      {
        typeof imageProgress === 'number' &&
        <button onClick={() => image.destroy()}>
          Destroy Image (= Cancel Loading)
        </button>
      }
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['scroll', ['none', 'zoom', 'scroll']],
    flip: false,
    invert: false,
  }))
  //.addDecorator(withSeriesImageController(image))
  .add('Series Image', () => <Component/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/useImageStore.stories.tsx


```tsx
import {
  CornerstoneImage,
  ImageStoreProvider,
  InsightViewer,
  installWADOImageLoader,
  useImageProgress,
  useImageStore,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  
  const {fetch} = useImageStore();
  
  const image1: CornerstoneImage = fetch(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`);
  const image2: CornerstoneImage = fetch(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000011.dcm`);
  const image3: CornerstoneImage = fetch(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000012.dcm`);
  const image4: CornerstoneImage = fetch(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000013.dcm`);
  
  const progress1 = useImageProgress(image2);
  const progress2 = useImageProgress(image1);
  const progress3 = useImageProgress(image3);
  const progress4 = useImageProgress(image4);
  
  const [image, setImage] = useState<CornerstoneImage>(() => image1);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  return (
    <div style={{display: 'flex'}}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      <div>
        <ul>
          <li>
            1: {progress1 || 'loaded'}
            {
              image !== image1 &&
              <button onClick={() => setImage(image1)}>show</button>
            }
          </li>
          <li>
            2: {progress2 || 'loaded'}
            {
              image !== image2 &&
              <button onClick={() => setImage(image2)}>show</button>
            }
          </li>
          <li>
            3: {progress3 || 'loaded'}
            {
              image !== image3 &&
              <button onClick={() => setImage(image3)}>show</button>
            }
          </li>
          <li>
            4: {progress4 || 'loaded'}
            {
              image !== image4 &&
              <button onClick={() => setImage(image4)}>show</button>
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(storyFn => (
    <ImageStoreProvider>
      {storyFn()}
    </ImageStoreProvider>
  ))
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('useImageStore', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/UserContourViewerCanvasStyle.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourCanvasDrawer,
  UserContourCanvasViewer,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <UserContourCanvasViewer width={width}
                                 height={height}
                                 contours={contours}
                                 focusedContour={focusedContour}
                                 cornerstoneRenderData={cornerstoneRenderData}
        
                                 canvasStrokeLineWidth={10}
                                 canvasStrokeStyle="blue"
                                 canvasFillStyle="rgba(0, 0, 255, 0.3)"
                                 canvasFontStyle="normal normal 600 40px proximanova"
                                 canvasFocusedStrokeLineWidth={20}
                                 canvasFocusedStrokeStyle="red"
                                 canvasFocusedFillStyle="rgba(255, 0, 0, 0.3)"
                                 canvasFocusedFontStyle="normal normal 600 50px proximanova"/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <UserContourCanvasDrawer width={width}
                                 height={height}
                                 contours={contours}
                                 draw={control === 'pen' && interactionElement}
                                 onFocus={focusContour}
                                 onAdd={contour => addContour(contour)}
                                 onRemove={removeContour}
                                 cornerstoneRenderData={cornerstoneRenderData}
        
                                 canvasStokeLineWidth={8}
                                 canvasStokeStyle="purple"
                                 canvasFillStyle="rgba(255, 255, 255, 0.4)"/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<UserContourCanvasViewer canvasStokeStyle="{}">', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/useResizeObserver.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import useResizeObserver from 'use-resize-observer';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // 특정 Element의 width, height를 지속적으로 감지한다
  // flex 등 layout으로 처리된 <div> Element의 width, height를 useResizeObserver()로 받아서
  // <InsightViewer width={width} height={height}> 로 넘길 수 있다
  const {ref: resizeRef, width, height} = useResizeObserver<HTMLDivElement>({
    useDefaults: true,
    defaultWidth: 500,
    defaultHeight: 500,
  });
  
  return (
    <div ref={resizeRef} style={{width: '50vw', height: '80vh'}}>
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={false}
                       flip={false}
                       pan
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      </InsightViewerContainer>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('useResizeObserver', () => <Sample/>);
```


### src/\_packages/@lunit/insight\-viewer/\_\_stories\_\_/useViewportMirroring.stories.tsx


```tsx
import {
  CornerstoneBulkImage,
  CornerstoneImage,
  CornerstoneSeriesImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadWADOImage,
  useBulkImageScroll,
  useInsightViewerSync,
  ContourDrawer,
  ContourViewer,
  useUserContour,
  useViewportMirroring, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { RefObject, useMemo, useRef, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image1: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  const image2: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000020.dcm`, {unload: unloadWADOImage}), []);
  const image3: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000030.dcm`, {unload: unloadWADOImage}), []);
  const image4: CornerstoneBulkImage = useMemo(() => new CornerstoneSeriesImage(series.map(p => `wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/${p}`), {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    invert,
    flip,
  } = useController();
  
  // Viewport Mirroring의 대상에게 부여할 RefObject 들을 만든다
  const viewer2: RefObject<InsightViewer> = useRef(null);
  const viewer3: RefObject<InsightViewer> = useRef(null);
  const viewer4: RefObject<InsightViewer> = useRef(null);
  
  // updateMasterRenderData()가 실행되면 viewer2, viewer3, viewer4에 Viewport가 Mirroring 된다
  const {updateMasterRenderData} = useViewportMirroring(viewer2, viewer3, viewer4);
  
  // 3번째 화면을 위한 처리
  const [interactionElement3, setInteractionElement3] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  // 4번째 화면을 위한 처리
  const [interactionElement4, setInteractionElement4] = useState<HTMLElement | null>(null);
  
  useBulkImageScroll({
    image: image4,
    element: interactionElement4,
    enabled: true,
  });
  
  return (
    <div style={{display: 'flex'}}>
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan
                       adjust={false}
                       zoom
                       resetTime={resetTime}
                       image={image1}
                       updateCornerstoneRenderData={updateMasterRenderData}/>
      </InsightViewerContainer>
      
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer ref={viewer2}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust
                       zoom={false}
                       resetTime={resetTime}
                       image={image2}
                       updateCornerstoneRenderData={renderData => console.log('#2', renderData)}/>
      </InsightViewerContainer>
      
      <InsightViewerContainer ref={setInteractionElement3} width={width} height={height}>
        <InsightViewer ref={viewer3}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image3}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          contours &&
          contours.length > 0 &&
          cornerstoneRenderData &&
          <ContourViewer width={width}
                             height={height}
                             contours={contours}
                             focusedContour={focusedContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
        {
          contours &&
          cornerstoneRenderData &&
          <ContourDrawer width={width}
                             height={height}
                             contours={contours}
                             draw={interactionElement3}
                             onFocus={focusContour}
                             onAdd={contour => addContour(contour)}
                             onRemove={removeContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
      </InsightViewerContainer>
      
      <InsightViewerContainer ref={setInteractionElement4} width={width} height={height}>
        <InsightViewer ref={viewer4}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image4}
                       updateCornerstoneRenderData={renderData => console.log('#4', renderData)}/>
      </InsightViewerContainer>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [300, 200, 500],
    height: [400, 300, 600],
    control: ['none', ['none']],
    wheel: ['none', ['none']],
    flip: false,
    invert: false,
  }))
  .add('useViewportMirroring()', () => <Sample/>);
```


### src/\_packages/@lunit/is\-complex\-polygon/\_\_stories\_\_/isComplexPolygon.stories.tsx


```tsx
import {
  ContourDrawer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  Point,
  unloadWADOImage,
  useInsightViewerSync,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { isComplexPolygon } from '@lunit/is-complex-polygon';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, useCallback, useState } from 'react';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function doNothing() {
  // DO NOTHING
}

function Sample() {
  const width: number = 400;
  const height: number = 500;
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const [checkResult, setCheckResult] = useState<ReactNode>(null);
  
  const check = useCallback((polygon: Point[]) => {
    const result: boolean = isComplexPolygon(polygon);
    
    setCheckResult((
      <div>
        <h3><span role="img" aria-label="polygon">🧬</span> POLYGON</h3>
        <pre><code>{JSON.stringify(polygon)}</code></pre>
        <p><span role="img" aria-label="question">🤷‍♂️</span> IS COMPLEX POLYGON? → {result ? 'YES' : 'NO'}</p>
      </div>
    ));
  }, []);
  
  return (
    <div>
      <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={false}
                       flip={false}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          cornerstoneRenderData &&
          <ContourDrawer width={width}
                         height={height}
                         contours={[]}
                         draw={interactionElement}
                         onFocus={doNothing}
                         onAdd={check}
                         onRemove={doNothing}
                         cornerstoneRenderData={cornerstoneRenderData}/>
        }
      </InsightViewerContainer>
      <div>
        <pre><code>{checkResult}</code></pre>
      </div>
    </div>
  );
}

storiesOf('in-complex-polygon', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('isComplexPolygon()', () => <Sample/>);
```


### src/\_packages/@lunit/is\-polygon\-area\-greater\-than\-area/\_\_stories\_\_/isPolygonAreaGreaterThenArea.stories.tsx


```tsx
import {
  ContourDrawer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  Point,
  unloadWADOImage,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, useCallback, useState } from 'react';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function doNothing() {
  // DO NOTHING
}

function Sample() {
  const width: number = 400;
  const height: number = 500;
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const [checkResult, setCheckResult] = useState<ReactNode>(null);
  
  const check = useCallback((polygon: Point[]) => {
    const result: boolean = isPolygonAreaGreaterThanArea(polygon);
    
    setCheckResult((
      <div>
        <h3><span role="img" aria-label="polygon">🧬</span> POLYGON</h3>
        <pre><code>{JSON.stringify(polygon)}</code></pre>
        <p><span role="img" aria-label="question">🤷‍♂️</span> IS GREATER THAN AREA({100})? → {result ? 'YES' : 'NO'}
        </p>
      </div>
    ));
  }, []);
  
  return (
    <div>
      <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={false}
                       flip={false}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          cornerstoneRenderData &&
          <ContourDrawer width={width}
                         height={height}
                         contours={[]}
                         draw={interactionElement}
                         onFocus={doNothing}
                         onAdd={check}
                         onRemove={doNothing}
                         cornerstoneRenderData={cornerstoneRenderData}/>
        }
      </InsightViewerContainer>
      <div>
        <pre><code>{checkResult}</code></pre>
      </div>
    </div>
  );
}

storiesOf('in-polygon-area-greater-than-area', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('isPolygonAreaGreaterThanArea()', () => <Sample/>);
```


### src/\_packages/@lunit/opt\-components/\_\_stories\_\_/Button.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { Button, ButtonLayout, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { AdjustIcon, MagnifyIcon, PanIcon, PenIcon } from '@lunit/opt-control-icons';
import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import styled from 'styled-components';

const directions = ['vertical', 'horizontal'] as const;

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Button', () => (
    <Container>
      {
        directions.map(direction => (
          <Fragment key={direction}>
            <div style={{width: direction === 'vertical' ? 200 : 500}}>
              <ButtonLayout direction={direction}>
                <Button layout="left"
                        label="PEN"
                        icon={<PenIcon/>}/>
                <Button layout="left"
                        label="PAN"
                        icon={<PanIcon/>}
                        selected/>
                <Button layout="left"
                        label="ADJUST"
                        icon={<AdjustIcon/>}/>
                <Button layout="left"
                        label="MAGNIFY"
                        icon={<MagnifyIcon/>}
                        disabled/>
              </ButtonLayout>
            </div>
            
            <div style={{width: direction === 'vertical' ? 200 : 330}}>
              <ButtonLayout direction={direction}>
                <Button layout="center"
                        label="PEN"/>
                <Button layout="center"
                        label="PAN"
                        selected/>
                <Button layout="center"
                        label="ADJUST"/>
                <Button layout="center"
                        label="MAGNIFY"
                        disabled/>
              </ButtonLayout>
            </div>
            
            <div style={{width: 200}}>
              <ButtonLayout direction={direction}>
                <Button layout="center"
                        icon={<PenIcon/>}/>
                <Button layout="center"
                        icon={<PanIcon/>}
                        selected/>
                <Button layout="center"
                        icon={<AdjustIcon/>}/>
                <Button layout="center"
                        icon={<MagnifyIcon/>}
                        disabled/>
              </ButtonLayout>
            </div>
            
            <div style={{width: direction === 'vertical' ? 200 : 500}}>
              <ButtonLayout direction={direction}>
                <Button layout="left"
                        label="PEN"/>
                <Button layout="left"
                        label="PAN"
                        selected/>
                <Button layout="left"
                        label="ADJUST"/>
                <Button layout="left"
                        label="MAGNIFY"
                        disabled/>
              </ButtonLayout>
            </div>
            
            <BlueButtonDiv style={{width: direction === 'vertical' ? 200 : 500}}>
              <ButtonLayout direction={direction}>
                <Button layout="left"
                        label="PEN"
                        icon={<PenIcon/>}/>
                <Button layout="left"
                        label="PAN"
                        icon={<PanIcon/>}
                        selected/>
                <Button layout="left"
                        label="ADJUST"
                        icon={<AdjustIcon/>}/>
                <Button layout="left"
                        label="MAGNIFY"
                        icon={<MagnifyIcon/>}
                        disabled/>
              </ButtonLayout>
            </BlueButtonDiv>
          </Fragment>
        ))
      }
    </Container>
  ));

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  > div {
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-flow: column;
    width: 200px;
    padding: 10px;
    background-color: #1e2d47;
  }
`;

const BlueButtonDiv = styled.div`
  --button-background-color: #a892ff;
  --button-label-color: rgba(255, 255, 255, 0.8);
  --button-background-color-hover: #907ae5;
  --button-label-color-hover: rgba(255, 255, 255, 1);
  --button-background-color-selected: #7763bf;
  --button-label-color-selected: rgba(255, 255, 255, 1);
  --button-background-color-disabled: #8b75ca;
  --button-label-color-disabled: rgba(255, 255, 255, 0.2);
`;
```


### src/\_packages/@lunit/opt\-components/\_\_stories\_\_/Panel.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import {
  Button,
  ButtonLayout,
  Panel,
  SessionPanel,
  withOPTComponentsStorybookGlobalStyle,
} from '@lunit/opt-components';
import { AdjustIcon, MagnifyIcon, PanIcon, PenIcon } from '@lunit/opt-control-icons';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, SVGProps } from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Panel', () => (
    <Container>
      {
        [200, 250, 300].map(width => (
          <div key={'width-' + width} style={{width}}>
            <SessionPanel title="TEST"
                          style={{marginBottom: 6}}
                          sessionId={'session-panel-' + width}>
              {
                expanded => (
                  <ButtonLayout direction={expanded ? 'vertical' : 'horizontal'}>
                    <Button layout={expanded ? 'left' : 'center'}
                            label={expanded ? 'PEN' : undefined}
                            icon={<PenIcon/>}/>
                    <Button layout={expanded ? 'left' : 'center'}
                            label={expanded ? 'PAN' : undefined}
                            icon={<PanIcon/>}
                            selected/>
                    <Button layout={expanded ? 'left' : 'center'}
                            label={expanded ? 'ADJUST' : undefined}
                            icon={<AdjustIcon/>}/>
                    <Button layout={expanded ? 'left' : 'center'}
                            label={expanded ? 'MAGNIFY' : undefined}
                            icon={<MagnifyIcon/>}
                            disabled/>
                  </ButtonLayout>
                )
              }
            </SessionPanel>
            
            <Panel title="TEST" style={{backgroundColor: '#294723'}}>
              <ButtonLayout direction="vertical">
                <Button layout="left"
                        label="PEN"
                        icon={<PenIcon/>}/>
                <Button layout="left"
                        label="PAN"
                        icon={<PanIcon/>}
                        selected/>
                <Button layout="left"
                        label="ADJUST"
                        icon={<AdjustIcon/>}/>
                <Button layout="left"
                        label="MAGNIFY"
                        icon={<MagnifyIcon/>}
                        disabled/>
              </ButtonLayout>
            </Panel>
          </div>
        ))
      }
      
      <LineText x={600}
                y={15}
                width={600}
                height={20}
                textAnchor="end"
                stroke="#000000"
                fill="#ffffff">
        <tspan fill="blue">Hello</tspan>
        {' '}
        World?
        {' '}
        <tspan fill="red">Hello</tspan>
        {' '}
        World?
      </LineText>
    </Container>
  ));

function LineText({children, width, height, stroke, fill, ...props}: {children: ReactNode} & SVGProps<SVGTextElement>) {
  return (
    <svg width={width} height={height} style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
      <text {...props}
            width={width}
            height={height}
            stroke={stroke}
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round">
        {children}
      </text>
      <text {...props}
            width={width}
            height={height}
            fill={fill}>
        {children}
      </text>
    </svg>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #040a17;
    padding: 10px 0;
    display: flex;
    flex-flow: column;
  }
`;

```


### src/\_packages/@lunit/opt\-components/\_\_stories\_\_/Slider.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { Slider, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Slider', () => (
    <div style={{width: 300, margin: 20}}>
      <div style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '10px 30px'}}>
        <Slider defaultValue={50}/>
      </div>
      
      <div style={{backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px 30px'}}>
        <BlueSlider defaultValue={50}/>
      </div>
    </div>
  ));

export const BlueSlider = styled(Slider)`
  --slider-rail-color: rgba(86, 81, 136, 0.4);
  --slider-thumb-color: #6B6B9B;
  --slider-track-color: rgba(86, 81, 136, 0.6);
  --slider-value-label-color: #ffffff;
`;
```


### src/\_packages/@lunit/opt\-components/\_\_stories\_\_/Snackbar.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import {
  ErrorSnackbarContent,
  InfoSnackbarContent,
  NormalSnackbarContent,
  SnackbarContent,
  WarningSnackbarContent,
  withOPTComponentsStorybookGlobalStyle,
} from '@lunit/opt-components';
import { Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Snackbar, SnackbarProvider, useSnackbar } from '@ssen/snackbar';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

let count: number = 0;

function Basic() {
  const {addSnackbar, snackbarContainer} = useSnackbar();
  
  return (
    <Container>
      <button onClick={() => {
        count++;
        
        addSnackbar(
          <Snackbar autoClose={false}>
            <SnackbarContent message={`${count} HELLO SNACKBAR!`}
                             action={[
                               <Button key="undo" color="inherit" size="small">
                                 UNDO
                               </Button>,
                               <IconButton key="close" aria-label="close" color="inherit">
                                 <Close/>
                               </IconButton>,
                             ]}/>
          </Snackbar>,
        );
      }}>
        Default
      </button>
      
      <button onClick={() => {
        count++;
        
        addSnackbar(
          <Snackbar autoClose={false}>
            <NormalSnackbarContent message={`${count} HELLO SNACKBAR!`}
                                   action={[
                                     <Button key="undo" color="inherit" size="small">
                                       UNDO
                                     </Button>,
                                     <IconButton key="close" aria-label="close" color="inherit">
                                       <Close/>
                                     </IconButton>,
                                   ]}/>
          </Snackbar>,
        );
      }}>
        Normal
      </button>
      
      <button onClick={() => {
        count++;
        
        addSnackbar(
          <Snackbar autoClose={false}>
            <InfoSnackbarContent message={`${count} HELLO SNACKBAR!`}
                                 action={[
                                   <Button key="undo" color="inherit" size="small">
                                     UNDO
                                   </Button>,
                                   <IconButton key="close" aria-label="close" color="inherit">
                                     <Close/>
                                   </IconButton>,
                                 ]}/>
          </Snackbar>,
        );
      }}>
        Info
      </button>
      
      <button onClick={() => {
        count++;
        
        addSnackbar(
          <Snackbar autoClose={false}>
            <WarningSnackbarContent message={`${count} HELLO SNACKBAR!`}
                                    action={[
                                      <Button key="undo" color="inherit" size="small">
                                        UNDO
                                      </Button>,
                                      <IconButton key="close" aria-label="close" color="inherit">
                                        <Close/>
                                      </IconButton>,
                                    ]}/>
          </Snackbar>,
        );
      }}>
        Warning
      </button>
      
      <button onClick={() => {
        count++;
        
        addSnackbar(
          <Snackbar autoClose={false}>
            <ErrorSnackbarContent message={`${count} HELLO SNACKBAR!`}
                                  action={[
                                    <Button key="undo" color="inherit" size="small">
                                      UNDO
                                    </Button>,
                                    <IconButton key="close" aria-label="close" color="inherit">
                                      <Close/>
                                    </IconButton>,
                                  ]}/>
          </Snackbar>,
        );
      }}>
        Error
      </button>
      
      <SnackbarContainer ref={snackbarContainer}/>
    </Container>
  );
}

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(storyFn => (
    <SnackbarProvider>
      {storyFn()}
    </SnackbarProvider>
  ))
  .add('<Snackbar>', () => <Basic/>);

const Container = styled.div`
  position: relative;
  width: 700px;
  height: 400px;
  border: 1px solid white;
`;

const SnackbarContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: right;
  align-items: flex-end;
  
  > * {
    margin-top: 10px;
  }
`;
```


### src/\_packages/@lunit/opt\-components/\_\_stories\_\_/Tooltip.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { Tooltip, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { Error } from '@material-ui/icons';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Tooltip', () => {
    const title = (
      <div>
        <h1>Hello</h1>
        <p>World!!! World!!!</p>
      </div>
    );
    
    return (
      <>
        <Grid style={{marginLeft: 170, marginTop: 150}}>
          <Tooltip title={title}
                   placement="top"
                   open>
            <Error/>
          </Tooltip>
          
          <Tooltip title={title}
                   placement="right"
                   open>
            <Error/>
          </Tooltip>
          
          <Tooltip title={title}
                   placement="left"
                   open>
            <Error/>
          </Tooltip>
          
          <Tooltip title={title}
                   placement="bottom"
                   open>
            <Error/>
          </Tooltip>
        </Grid>
        
        <Grid style={{marginLeft: 570, marginTop: 150}}>
          <WarningTooltip title={title}
                          placement="top"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
          
          <WarningTooltip title={title}
                          placement="right"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
          
          <WarningTooltip title={title}
                          placement="left"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
          
          <WarningTooltip title={title}
                          placement="bottom"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
        </Grid>
      </>
    );
  });

const WarningTooltip = styled(Tooltip)`
  --tooltip-background-color: red;
  --tooltip-color: yellow;
`;

const Grid = styled.div`
  position: fixed;
  
  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: 100px 100px;
`;

```


### src/\_packages/@lunit/opt\-control\-icons/\_\_stories\_\_/opt\-control\-icons.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { AdjustIcon, CircleIcon, FlipIcon, InvertIcon, MagnifyIcon, PanIcon, PenIcon, ResetIcon, LunitIcon } from '../';

storiesOf('opt-contol-icons', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Icons', () => (
    <Typography>
      <AdjustIcon/>
      <FlipIcon/>
      <InvertIcon/>
      <MagnifyIcon/>
      <PanIcon/>
      <PenIcon/>
      <ResetIcon/>
      <CircleIcon/>
      <LunitIcon/>
    </Typography>
  ));
```


### src/\_packages/@lunit/opt\-login\-components/\_\_stories\_\_/Button.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { Progress } from '@lunit/opt-login-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { Button } from '../components/Button';
import { SubmitContainer } from '../components/SubmitContainer';

const style: CSSProperties = {width: 300};

storiesOf('opt-login-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<Button>', () => (
    <Button style={style}
            variant="outlined"
            size="large">
      Submit
    </Button>
  ))
  .add('<Button disabled>', () => (
    <Button style={style}
            variant="outlined"
            size="large"
            disabled>
      Submit
    </Button>
  ))
  .add('<Button> + <Progress>', () => (
    <SubmitContainer style={style}>
      <Button style={style}
              variant="outlined"
              size="large"
              disabled>
        Submit
      </Button>
      
      <Progress size={24}/>
    </SubmitContainer>
  ));
  
```


### src/\_packages/@lunit/opt\-login\-components/\_\_stories\_\_/TextInput.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { TextInput } from '../components/TextInput';

const style: CSSProperties = {width: 300};

storiesOf('opt-login-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<TextInput>', () => (
    <TextInput style={style}
               placeholder="PLACEHOLDER"
               margin="dense"
               variant="outlined"/>
  ))
  .add('<TextInput disabled>', () => (
    <TextInput style={style}
               placeholder="PLACEHOLDER"
               margin="dense"
               variant="outlined"
               disabled/>
  ));
  
```


### src/\_packages/@lunit/scalebar/\_\_stories\_\_/Scalebar.stories.tsx


```tsx
import { HeatmapScaleSVGImage } from '@lunit/heatmap';
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { number, radios, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ColorScalebar } from '../components/ColorScalebar';
import { GrayScalebar } from '../components/GrayScalebar';
import { scalebarHeight } from '../env';

const ScalebarTopLabel = styled.span`
  font-size: 11px;
  font-weight: 200;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 2px;
  color: #ffffff;

  position: absolute;
  text-align: justify;
  text-align-last: justify;
  text-justify: inter-word;
  top: -20px;
  left: 0;

  &:after {
    content: "";
    display: inline-block;
    width: 100%;
  }
`;

const ScalebarLeftLabel = styled.span`
  font-size: 11px;
  font-weight: 200;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 2px;
  color: #ffffff;

  position: absolute;
  text-align: right;
  top: 0;
  width: 400px;
  left: -410px;
`;

const scalebarDecorator = (story: () => ReactNode) => (
  <div style={{marginLeft: 250, marginTop: 100}}>
    {story()}
  </div>
);

storiesOf('scalebar', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(scalebarDecorator)
  .addDecorator(withKnobs)
  .add('<GrayScalebar>', () => {
    const width: number = number('Width', 200, {range: true, step: 10, min: 100, max: 600});
    const label: string = radios<string>('Label', {
      None: 'none',
      Top: 'top',
      Left: 'left',
    }, 'none');
    
    return (
      <GrayScalebar width={width}
                    steps={10}
                    backgroundColor="#333333"
                    lines={[
                      {step: 1, lineWidth: 2, color: '#ffffff'},
                      {step: 5, lineWidth: 4, color: '#ffffff'},
                      {step: 9, lineWidth: 6, color: '#ffffff'},
                    ]}>
        {
          label === 'top'
            ? (
              <ScalebarTopLabel style={{width}}>
                STROKE WEIGHT INDICATOR
              </ScalebarTopLabel>
            )
            : label === 'left'
            ? (
              <ScalebarLeftLabel>
                STROKE WEIGHT INDICATOR
              </ScalebarLeftLabel>
            )
            : null
        }
      </GrayScalebar>
    );
  })
  .add('<ColorScalebar>', () => {
    const width: number = number('Width', 200, {range: true, step: 10, min: 100, max: 600});
    const label: string = radios<string>('Label', {
      None: 'none',
      Top: 'top',
      Left: 'left',
    }, 'none');
    
    return (
      <ColorScalebar width={width}
                     steps={10}
                     scaleImage={<HeatmapScaleSVGImage width={width} height={scalebarHeight} threshold={0.1}/>}
                     tickColor="#333333">
        {
          label === 'top'
            ? (
              <ScalebarTopLabel style={{width}}>
                HEATMAP COLOR INDICATOR
              </ScalebarTopLabel>
            )
            : label === 'left'
            ? (
              <ScalebarLeftLabel>
                HEATMAP COLOR INDICATOR
              </ScalebarLeftLabel>
            )
            : null
        }
      </ColorScalebar>
    );
  });
```


### src/\_packages/@lunit/use\-dialog/\_\_stories\_\_/useDialog.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { DialogTemplate, useDialog } from '@lunit/use-dialog';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, useCallback, useState } from 'react';

interface ConfirmParams {
  title: string;
  description: string;
  agree?: string;
  disagree?: string;
}

const ConfirmDialogTemplate: DialogTemplate<ConfirmParams, boolean> = ({closeDialog, title, description, agree = 'Agree', disagree = 'Disagree'}) => {
  return (
    <Dialog
      open
      onClose={() => closeDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => closeDialog(false)}>
          {disagree}
        </Button>
        <Button color="primary" autoFocus onClick={() => closeDialog(true)}>
          {agree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function Sample() {
  const [confirmResult, setConfirmResult] = useState<ReactNode>(null);
  const [openConfirm, confirmElement] = useDialog(ConfirmDialogTemplate);
  
  const callback = useCallback(async () => {
    const confirm: boolean = await openConfirm({title: 'TITLE', description: 'DESCRIPTION'});
    
    setConfirmResult(<p>Confirm result is {confirm.toString()}</p>);
  }, [openConfirm]);
  
  return (
    <div>
      <button onClick={callback}>
        Open Confirm
      </button>
      
      {confirmResult}
      {confirmElement}
    </div>
  );
}

storiesOf('use-dialog', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('useDialog()', () => <Sample/>);

```


### src/\_packages/@lunit/use\-shortcut/\_\_stories\_\_/useShortcut.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { useShortcut } from '@lunit/use-shortcut';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, useState } from 'react';

function Sample() {
  const [result, setResult] = useState<ReactNode>(null);
  
  useShortcut({
    test: event => event.key.toLowerCase() === 'a',
    callback: () => setResult('🍏'),
  });
  
  useShortcut({
    test: event => event.key.toLowerCase() === 'b',
    callback: () => setResult('🍌'),
  });
  
  useShortcut({
    test: event => event.key.toLowerCase() === 'c',
    callback: () => setResult('🍒'),
  });
  
  return (
    <div>
      <p>Key down "a", "b", "c"</p>
      {result}
    </div>
  );
}

storiesOf('use-shortcut', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('useShortcut()', () => <Sample/>);

```

<!-- importend -->