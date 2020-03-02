import { NormalTooltip, Panel, PanelDescription } from '@lunit/opt-components';
import { Help } from '@material-ui/icons';
import React from 'react';
import { PanelExample } from '../../../components/examples/PanelExample';

export function MessageTypesExample({ width, height }: { width: number; height: number }) {
  return (
    <PanelExample width={width} height={height}>
      {() => {
        return {
          sidepanel: (
            <>
              <Panel title="MESSAGE PANEL">
                <PanelDescription>Panel 내에 이렇게 안내 메세지를 넣을 수 있습니다.</PanelDescription>
                <div>...</div>
              </Panel>
              <Panel title="TOOLTIP PANEL" icon={tooltip}>
                <div>...</div>
              </Panel>
            </>
          ),
        };
      }}
    </PanelExample>
  );
}

const tooltip = (
  <NormalTooltip
    placement="left"
    title={
      <p>
        사용자가 바로 읽을 필요없는 보조적 안내,
        <br />
        또는 Panel에 내용이 지나치게 많아서 메세지를 넣기 어려운 경우,
        <br />
        메세지들을 Tooltip으로 뺄 수 있습니다.
      </p>
    }
  >
    <Help />
  </NormalTooltip>
);
