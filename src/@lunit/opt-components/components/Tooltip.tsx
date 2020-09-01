import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
} from '@material-ui/core/Tooltip';
import { Error, Help } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import styled, { DefaultTheme, keyframes } from 'styled-components';

export interface TooltipProps extends MuiTooltipProps {}

export function Tooltip({ className, ...props }: TooltipProps) {
  const { arrow, popper, ...classes } = useTooltipStyle(props);
  const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);

  return (
    <MuiTooltip
      classes={classes}
      PopperProps={{
        className: popper + ' ' + (className || ''),
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef} />
        </Fragment>
      }
    />
  );
}

export const useTooltipStyle = makeStyles<DefaultTheme, TooltipProps>({
  tooltip: {
    position: 'relative',
    borderRadius: 0,
    color: 'var(--tooltip-label-color)',
    backgroundColor: 'var(--tooltip-background-color)',
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,

    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-1.45em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1.5em 1em',
        borderColor: `transparent transparent var(--tooltip-background-color) transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '1.5em 1em 0 1em',
        borderColor: `var(--tooltip-background-color) transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-1.45em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1.5em 1em 0',
        borderColor: `transparent var(--tooltip-background-color) transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1.5em',
        borderColor: `transparent transparent transparent var(--tooltip-background-color)`,
      },
    },
  },
});

export const NormalTooltip = styled(Tooltip).attrs({
  children: <Help style={{ color: 'rgba(255, 255, 255, 0.6)' }} />,
})`
  --tooltip-background-color: rgba(255, 255, 255, 0.6);
  --tooltip-label-color: #030a18;
`;

export const InfoTooltip = styled(Tooltip).attrs({
  children: <Help style={{ color: '#00a4c8' }} />,
})`
  --tooltip-background-color: #00a4c8;
  --tooltip-label-color: #ffffff;
`;

const blinkAnimation = keyframes`
  0% {
    opacity: 0.7;
  }
  
  49% {
    opacity: 0.7;
  }
  
  50% {
    opacity: 1;
  }
`;

const ErrorIcon = styled(Error)`
  animation: ${blinkAnimation} 1s infinite;
`;

export const WarningTooltip = styled(Tooltip).attrs({
  children: <ErrorIcon style={{ color: '#d6ae41' }} />,
})`
  --tooltip-background-color: #d6ae41;
  --tooltip-label-color: #ffffff;
`;

export const ErrorTooltip = styled(Tooltip).attrs({
  children: <ErrorIcon style={{ color: '#c9434b' }} />,
})`
  --tooltip-background-color: #c9434b;
  --tooltip-label-color: #ffffff;
`;
