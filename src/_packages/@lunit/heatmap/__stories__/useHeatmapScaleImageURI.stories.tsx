import { useHeatmapScaleImageURI } from '@lunit/heatmap';
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
  .addDecorator(withKnobs)
  .add('useHeatmapScaleImageURI()', () => {
    const width: number = number('Width', 300, {range: true, step: 10, min: 100, max: 600});
    const height: number = number('Height', 100, {range: true, step: 10, min: 60, max: 300});
    const threshold: number = number('Threshold', 0, {range: true, step: 0.1, min: 0, max: 1});
    
    return (
      <Image width={width} height={height} threshold={threshold}/>
    );
  });