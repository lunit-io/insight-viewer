import {
  ErrorTooltip,
  InfoTooltip,
  NormalTooltip,
  Panel,
  PanelDescription,
  PanelDescriptionColors,
  WarningTooltip,
} from '@lunit/opt-components';
import { Help } from '@material-ui/icons';
import React from 'react';
import { PanelExample } from '../../../components/examples/PanelExample';

export function MessageLevelExample({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <PanelExample width={width} height={height}>
      {() => {
        return {
          sidepanel: (
            <>
              <Panel
                title="NORMAL"
                icon={
                  <NormalTooltip
                    placement="left"
                    title={<p>기본적으로 이렇게 표현됩니다.</p>}
                  >
                    <Help />
                  </NormalTooltip>
                }
              >
                <PanelDescription>
                  기본적으로 이렇게 표현됩니다.
                </PanelDescription>
              </Panel>
              <Panel
                title="INFO"
                icon={
                  <InfoTooltip
                    placement="left"
                    title={<p>좀 더 집중이 필요한 경우 사용할 수 있습니다.</p>}
                  >
                    <Help />
                  </InfoTooltip>
                }
              >
                <PanelDescription
                  style={{ color: PanelDescriptionColors.INFO }}
                >
                  좀 더 집중이 필요한 경우 사용할 수 있습니다.
                </PanelDescription>
              </Panel>
              <Panel
                title="WARNING"
                icon={
                  <WarningTooltip
                    placement="left"
                    title={
                      <p>경고해야 할 사항이 있는 경우 사용할 수 있습니다.</p>
                    }
                  >
                    <Help />
                  </WarningTooltip>
                }
              >
                <PanelDescription
                  style={{ color: PanelDescriptionColors.WARNING }}
                >
                  경고해야 할 사항이 있는 경우 사용할 수 있습니다.
                </PanelDescription>
              </Panel>
              <Panel
                title="ERROR"
                icon={
                  <ErrorTooltip
                    placement="left"
                    title={
                      <p>
                        경고보다 높은 수준의 위험을 알릴 때 사용할 수 있습니다.
                      </p>
                    }
                  >
                    <Help />
                  </ErrorTooltip>
                }
              >
                <PanelDescription
                  style={{ color: PanelDescriptionColors.ERROR }}
                >
                  경고보다 높은 수준의 위험을 알릴 때 사용할 수 있습니다.
                </PanelDescription>
              </Panel>
            </>
          ),
        };
      }}
    </PanelExample>
  );
}
