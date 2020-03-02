import {
  Button,
  ButtonLayout,
  InfoSnackbarContent,
  NormalTooltip,
  Panel,
  PanelDescription,
  useAlert,
  useConfirm,
} from '@lunit/opt-components';
import { Button as MuiButton } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { Snackbar, useSnackbar } from '@ssen/snackbar';
import React from 'react';
import { PanelExample } from '../../../components/examples/PanelExample';

export function MessageTypesExample({ width, height }: { width: number; height: number }) {
  const { addSnackbar } = useSnackbar();
  const [openAlert, alertElement] = useAlert();
  const [openConfirm, confirmElement] = useConfirm();

  return (
    <PanelExample width={width} height={height}>
      {() => {
        return {
          viewer: (
            <div>
              <ButtonLayout
                direction="vertical"
                style={{
                  margin: 10,
                  width: 200,
                }}
              >
                <Button
                  label="Open Dialog (Alert)"
                  layout="left"
                  onClick={() => {
                    openAlert({
                      title: 'Alert 예제',
                      description: 'Dialog 방식의 경우 사용자에게 강제적인 집중을 요구하게 됩니다',
                      agree: '확인',
                    });
                  }}
                />
                <Button
                  label="Open Dialog (Confirm)"
                  layout="left"
                  onClick={() => {
                    openConfirm({
                      title: 'Confirm 예제',
                      description: 'Dialog는 이와같이 강제적인 사용자 확인을 요구할 때 사용할 때 효과적입니다',
                      agree: 'OK',
                      disagree: 'Cancel',
                    });
                  }}
                />
                <Button
                  label="Open Snackbar"
                  layout="left"
                  onClick={() => {
                    addSnackbar(
                      <Snackbar>
                        <InfoSnackbarContent message="Snackbar는 사용자에게 강제적인 집중을 요구하지 않습니다" />
                      </Snackbar>,
                    );
                  }}
                />
                <Button
                  label="Open Snackbar (Action)"
                  layout="left"
                  onClick={() => {
                    addSnackbar(
                      <Snackbar>
                        <InfoSnackbarContent
                          message={
                            <p>
                              Snackbar는 시스템에 의해 기본 실행 될 Action을
                              <br />
                              <u>사용자가 원하는 경우</u>에 거부할 수 있는 보조적 선택에 활용할 수 있습니다.
                              <br />
                              거부하지 않으면 시스템에 의해 기본적인 Action이 실행됩니다.
                            </p>
                          }
                          action={[
                            <MuiButton key="undo" color="inherit" size="small">
                              거부
                            </MuiButton>,
                          ]}
                        />
                      </Snackbar>,
                    );
                  }}
                />
              </ButtonLayout>

              {alertElement}
              {confirmElement}
            </div>
          ),
          sidepanel: (
            <>
              <Panel title="MESSAGE PANEL">
                <PanelDescription>
                  Panel을 사용하는데 있어서 중요하고, 꼭 보여져야 하는 메세지는 이렇게 표시할 수 있습니다.
                </PanelDescription>
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
