import { SessionPanel, Tooltip } from '@lunit/opt-components';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

export interface ReportPanelProps {
  content: ReactElement;
  disabled: boolean;
}

export function ReportPanel({ content, disabled }: ReportPanelProps) {
  return (
    <SessionPanel
      title="REPORT"
      sessionId="report"
      disabled={disabled}
      defaultExpanded
    >
      {(expanded) => {
        return expanded ? (
          <Full>{content}</Full>
        ) : (
          <ContentTooltip placement="left" title={content}>
            <Truncated>{content}</Truncated>
          </ContentTooltip>
        );
      }}
    </SessionPanel>
  );
}

const Full = styled.div`
  font-size: 12px;
`;

const Truncated = styled.div`
  user-select: none;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentTooltip = styled(Tooltip)`
  --tooltip-background-color: #8aad7b;
  --tooltip-color: #ffffff;
`;
