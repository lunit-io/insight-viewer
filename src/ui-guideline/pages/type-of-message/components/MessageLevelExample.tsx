import {
  Button,
  ButtonLayout,
  ErrorSnackbarContent,
  ErrorTooltip,
  InfoSnackbarContent,
  InfoTooltip,
  NormalSnackbarContent,
  NormalTooltip,
  Panel,
  PanelDescription,
  PanelDescriptionColors,
  useAlert,
  WarningSnackbarContent,
  WarningTooltip,
} from '@lunit/opt-components';
import { Help } from '@material-ui/icons';
import { Snackbar, useSnackbar } from '@ssen/snackbar';
import React from 'react';
import { PanelExample } from '../../../components/examples/PanelExample';

export function MessageLevelExample({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { addSnackbar } = useSnackbar();
  const [openAlert, alertElement] = useAlert();

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
                  label="Dialog"
                  layout="left"
                  onClick={() => {
                    openAlert({
                      title: 'Dialog',
                      description: (
                        <p>
                          Dialog는 아직 특별한 Level 표현이 없습니다.
                          <br />
                          Dialog 자체가 강제성을 지니기 때문에 기본적으로
                          Warning 이상으로 판단할 수 있습니다.
                        </p>
                      ),
                      agree: '확인',
                    });
                  }}
                />
                <Button
                  label="Snackbar [Normal]"
                  layout="left"
                  onClick={() => {
                    addSnackbar(
                      <Snackbar>
                        <NormalSnackbarContent message="[Normal] 기본 메세지" />
                      </Snackbar>,
                    );
                  }}
                />
                <Button
                  label="Snackbar [Info]"
                  layout="left"
                  onClick={() => {
                    addSnackbar(
                      <Snackbar>
                        <InfoSnackbarContent message="[Info] 좀 더 집중이 필요한 경우" />
                      </Snackbar>,
                    );
                  }}
                />
                <Button
                  label="Snackbar [Warning]"
                  layout="left"
                  onClick={() => {
                    addSnackbar(
                      <Snackbar>
                        <WarningSnackbarContent message="[Warning] 경고해야 할 사항이 있는 경우" />
                      </Snackbar>,
                    );
                  }}
                />
                <Button
                  label="Snackbar [Error]"
                  layout="left"
                  onClick={() => {
                    addSnackbar(
                      <Snackbar>
                        <ErrorSnackbarContent message="[Error] 경고보다 높은 수준의 위험을 알릴 때" />
                      </Snackbar>,
                    );
                  }}
                />
              </ButtonLayout>

              {alertElement}
            </div>
          ),
          sidepanel: (
            <>
              <Panel
                title="NORMAL"
                icon={
                  <NormalTooltip
                    placement="left"
                    title={<p>[Normal] 기본 메세지</p>}
                  >
                    <Help />
                  </NormalTooltip>
                }
              >
                <PanelDescription>[Normal] 기본 메세지</PanelDescription>
              </Panel>
              <Panel
                title="INFO"
                icon={
                  <InfoTooltip
                    placement="left"
                    title={<p>[Info] 좀 더 집중이 필요한 경우</p>}
                  >
                    <Help />
                  </InfoTooltip>
                }
              >
                <PanelDescription
                  style={{ color: PanelDescriptionColors.INFO }}
                >
                  [Info] 좀 더 집중이 필요한 경우
                </PanelDescription>
              </Panel>
              <Panel
                title="WARNING"
                icon={
                  <WarningTooltip
                    placement="left"
                    title={<p>[Warning] 경고해야 할 사항이 있는 경우</p>}
                  >
                    <Help />
                  </WarningTooltip>
                }
              >
                <PanelDescription
                  style={{ color: PanelDescriptionColors.WARNING }}
                >
                  [Warning] 경고해야 할 사항이 있는 경우
                </PanelDescription>
              </Panel>
              <Panel
                title="ERROR"
                icon={
                  <ErrorTooltip
                    placement="left"
                    title={<p>[Error] 경고보다 높은 수준의 위험을 알릴 때</p>}
                  >
                    <Help />
                  </ErrorTooltip>
                }
              >
                <PanelDescription
                  style={{ color: PanelDescriptionColors.ERROR }}
                >
                  [Error] 경고보다 높은 수준의 위험을 알릴 때
                </PanelDescription>
              </Panel>
            </>
          ),
        };
      }}
    </PanelExample>
  );
}
