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
  const { addSnackbar, snackbarContainer } = useSnackbar();

  return (
    <Container>
      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <SnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Default
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <NormalSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Normal
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <InfoSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Info
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <WarningSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Warning
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <ErrorSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Error
      </button>

      <SnackbarContainer ref={snackbarContainer} />
    </Container>
  );
}

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(storyFn => <SnackbarProvider>{storyFn()}</SnackbarProvider>)
  .add('<Snackbar>', () => <Basic />);

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
