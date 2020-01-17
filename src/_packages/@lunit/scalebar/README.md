# Install

```sh
npm install @lunit/scalebar
```

# API

```
<ColorScalebar width={number}
               steps={number}
               scaleImage={ReactElement<SVGProps<SVGImageElement>>}

               tickWidth?={number}
               tickHeight?={number}
               tickColor={string}
                 
               className?={string}>
    {children}
</ColorScalebar>

<GrayScalebar width={number}
              steps={number}

              backgroundColor={string}
              lines={{ lineWidth: number, step: number, color: string }[]}

              tickWidth?={number}
              tickHeight?={number}
              tickColor={string}
                
              className?={string}>
    {children}
</GrayScalebar>
```

# Sample Codes

<https://lunit-io.github.io/opt-tool-frontend>

## Stories

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->

### \_\_stories\_\_/Scalebar.stories.tsx


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

<!-- importend -->