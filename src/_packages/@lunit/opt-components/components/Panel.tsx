import { KeyboardArrowDown } from '@material-ui/icons';
import React, { CSSProperties, ReactNode, useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

export interface PanelProps {
  children: ReactNode | ((expanded: boolean) => ReactNode);
  expanded?: boolean;
  onChange?: (nextExapnded: boolean) => void;
  title: ReactNode | ((expanded: boolean) => ReactNode);
  icon?: ReactNode | ((expanded: boolean) => ReactNode);
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

export const panelClasses = {
  header: 'LunitPanel-header',
  icon: 'LunitPanel-icon',
  title: 'LunitPanel-title',
  content: 'LunitPanel-content',
} as const;

function getIcon(value: ReactNode | ((expanded: boolean) => ReactNode), expanded: boolean | undefined) {
  const icon: ReactNode | undefined = typeof value === 'function'
    ? value(expanded === true)
    : value;
  
  if (icon) return icon;
  
  return typeof expanded !== 'boolean'
    ? null
    : expanded
      ? <Arrow/>
      : <Arrow style={{transform: 'rotate(180deg)'}}/>;
}

export function PanelBase({
                            className = '',
                            expanded,
                            onChange,
                            style = {},
                            title,
                            icon,
                            children,
                            disabled,
                          }: PanelProps) {
  const expand = useCallback(() => {
    if (typeof expanded === 'boolean' && typeof onChange === 'function') {
      onChange(!expanded);
    }
  }, [expanded, onChange]);
  
  const content = typeof children === 'function'
    ? children(expanded === true)
    : children;
  
  const iconElement = getIcon(icon, expanded);
  
  return (
    <div className={className}
         aria-expanded={expanded === true}
         aria-disabled={disabled === true}
         style={style}>
      <div className={panelClasses.header}>
        {
          iconElement &&
          <span className={panelClasses.icon} onClick={expand}>
            {iconElement}
          </span>
        }
        
        <span className={panelClasses.title}>
          {
            typeof title === 'function'
              ? title(expanded === true)
              : title
          }
        </span>
      </div>
      
      {
        content &&
        <div className={panelClasses.content}>
          {content}
        </div>
      }
    </div>
  );
}

export function SessionPanelBase({sessionId, defaultExpanded = true, onChange, ...props}: Omit<PanelProps, 'expanded'> & {sessionId: string, defaultExpanded?: boolean}) {
  const id: string = useMemo(() => {
    return `__sidebar_panel_${sessionId}__`;
  }, [sessionId]);
  
  const [expanded, setExpanded] = useState<boolean>(() => {
    const sessionValue: string | null = localStorage.getItem(id);
    
    return typeof sessionValue === 'string'
      ? sessionValue === 'open'
      : defaultExpanded;
  });
  
  const updateExpanded = useCallback((nextExpanded: boolean) => {
    localStorage.setItem(id, nextExpanded ? 'open' : 'close');
    setExpanded(nextExpanded);
    if (typeof onChange === 'function') onChange(nextExpanded);
  }, [id, onChange]);
  
  return (
    <Panel {...props}
           expanded={expanded}
           onChange={updateExpanded}/>
  );
}

const Arrow = styled(KeyboardArrowDown)`
  transition: transform 0.3s ease-out;
`;

export const PANEL_HEADER_HEIGHT: number = 25;

const panelStyle = ({useHoverStyle}: {useHoverStyle: boolean}) => css`
  background-color: var(--panel-background-color);
  position: relative;
  
  &[aria-disabled="true"] {
  
  }
  
  .${panelClasses.header} {
    height: 25px;
    background-color: var(--panel-header-background-color);
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 1px 14px 0 14px;
    
    .${panelClasses.icon} {
      color: var(--panel-icon-color);
      margin-left: -8px;
      margin-right: 6px;
      transform: translateY(2px);
      
      ${useHoverStyle ? css`
        cursor: pointer;
        
        &:hover {
          color: var(--panel-icon-color-hover);
        }
      ` : ''}
    }
    
    .${panelClasses.title} {
      color: var(--panel-title-color);
      letter-spacing: 0.2em;
    }
  }
  
  .${panelClasses.content} {
    padding: 14px;
  }
`;

export const panelDisabled = ({disabled}: PanelProps) => disabled
  ? css`
    opacity: 0.4;
    pointer-events: none;
    user-select: none;
  `
  : css`
    opacity: 1;
  `;

export const Panel = styled(PanelBase)`
  ${panelDisabled}
  ${({onChange}) => panelStyle({useHoverStyle: typeof onChange === 'function'})}
`;

export const SessionPanel = styled(SessionPanelBase)`
  opacity: ${({disabled}) => disabled ? 0.4 : 1};
  ${panelStyle({useHoverStyle: true})}
`;