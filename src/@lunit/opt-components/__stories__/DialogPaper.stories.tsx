import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import {
  DialogPaper,
  Button,
  withOPTComponentsStorybookGlobalStyle,
} from '@lunit/opt-components';
import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';

export default {
  title: 'opt-components',
  component: DialogPaper,
  decorators: [
    withOPTComponentsStorybookGlobalStyle,
    withInsightViewerStorybookGlobalStyle,
  ],
};

export const DialogPaperSample = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  return (
    <>
      <CenterModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogPaper>
          <p>Hello World</p>

          <div style={{ marginTop: 17 }}>
            <Button
              onClick={() => setModalOpen(false)}
              style={{ width: 130 }}
              layout="center"
              label="CLOSE"
            />
          </div>
        </DialogPaper>
      </CenterModal>
      {!modalOpen && (
        <Button
          onClick={() => setModalOpen(true)}
          style={{ width: 100 }}
          layout="center"
          label="show"
        />
      )}
    </>
  );
};

const CenterModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

DialogPaperSample.story = {
  name: 'DialogPaper',
};
