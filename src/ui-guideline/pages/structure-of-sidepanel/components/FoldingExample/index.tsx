import { useOPTControl } from '@lunit/use-opt-control';
import { ControlPanel } from 'ui-guideline/samples/annotation-cxr/components/sidebar/ControlPanel';
import { ReportPanel } from 'ui-guideline/samples/annotation-cxr/components/sidebar/ReportPanel';
import { UserContoursPanel } from 'ui-guideline/samples/opt-cxr/components/sidebar/UserContoursPanel';
import { Annotation } from 'ui-guideline/samples/opt-cxr/model/annotation';
import React, { ReactNode } from 'react';
import { PanelExample } from '../../../../components/examples/PanelExample';
import data from './contours.json';

const contours: Annotation[] = data as Annotation[];
const content: ReactNode = <p>{'텍스트 '.repeat(100)}</p>;

function mockFn() {
  // DO NOTHING
}

export function FoldingExample({ width, height }: { width: number; height: number }) {
  const { control, flip, invert, updateControl, resetControl, updateFlip, updateInvert } = useOPTControl({
    initialControl: 'pen',
  });

  return (
    <PanelExample width={width} height={height}>
      {() => {
        return {
          sidepanel: (
            <>
              <ReportPanel content={content} disabled={false} />
              <ControlPanel
                disabled={false}
                control={control}
                flip={flip}
                invert={invert}
                availablePen
                onControlChanged={updateControl}
                onFlipChanged={updateFlip}
                onInvertChanged={updateInvert}
                onResetControl={resetControl}
                onReset={mockFn}
              />
              <UserContoursPanel
                type="reader-test"
                onFocus={mockFn}
                focusedContour={null}
                onUpdate={mockFn}
                onRemove={mockFn}
                disabled={false}
                contours={contours}
              />
            </>
          ),
        };
      }}
    </PanelExample>
  );
}
