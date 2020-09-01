import { ButtonBase as MuiButtonBase } from '@material-ui/core';
import { ButtonBaseProps as MuiButtonBaseProps } from '@material-ui/core/ButtonBase';
import CheckIcon from '@material-ui/icons/Done';
import React, {
  ComponentType,
  MouseEvent,
  ReactElement,
  useCallback,
} from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends Omit<MuiButtonBaseProps, 'onChange'> {
  label?: ReactElement | string;
  icon?: ReactElement | string;
  check?: ReactElement;
  layout?: 'left' | 'center';
  hideCheck?: boolean;
  selected?: boolean;
  onChange?: (nextSelected: boolean) => void;
}

export const checkIcon = <CheckIcon />;

export const buttonClasses = {
  label: 'LunitButton-label',
  icon: 'LunitButton-icon',
  check: 'LunitButton-check',
} as const;

export function ButtonBase({
  label,
  icon,
  check = checkIcon,
  className = '',
  selected,
  onChange,
  onClick,
  hideCheck,
  style = {},
  disabled = false,
  ...muiButtonProps
}: ButtonProps) {
  const click = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (typeof selected === 'boolean' && typeof onChange === 'function') {
        onChange(!selected);
      }

      if (typeof onClick === 'function') {
        onClick(event);
      }
    },
    [selected, onChange, onClick],
  );

  return (
    <MuiButtonBase
      {...muiButtonProps}
      className={className}
      aria-selected={selected === true}
      style={style}
      onClick={click}
      disabled={disabled}
    >
      {icon && <span className={buttonClasses.icon}>{icon}</span>}
      {label && <span className={buttonClasses.label}>{label}</span>}
      {hideCheck !== true && selected === true && (
        <span className={buttonClasses.check}>{check}</span>
      )}
    </MuiButtonBase>
  );
}

export const IconAndLabelButton: ComponentType<ButtonProps> = styled(
  ButtonBase,
).attrs((props) => {
  if (!props.label || !props.icon) {
    throw new Error(
      `the props label and icon are required to <IconAndLabelButton>`,
    );
  }

  if (props.layout === 'left') {
    console.warn(`<IconAndLabelButton> layout prop is only support 'center'`);
  }

  if (props.hideCheck === false) {
    console.warn(`<IconAndLabelButton> hideCheck prop is only support 'true'`);
  }

  return {
    ...props,
    hideCheck: true,
    layout: 'center',
  };
})`
  && {
    flex: 1;
    justify-content: center;

    height: 54px;

    font-size: 13px;
    color: var(--button-label-color);
    background-color: var(--button-background-color);
    flex-direction: column;

    .${buttonClasses.icon} {
      font-size: 21px;
      display: block;
      text-align: center;

      .MuiSvgIcon-root {
        font-size: 1em;
      }
    }

    .${buttonClasses.label} {
      display: block;
      text-align: center;
      margin-bottom: -2px;
    }

    &:hover {
      background-color: var(--button-background-color-hover);
      color: var(--button-label-color-hover);
    }

    &[aria-selected='true'] {
      background-color: var(--button-background-color-selected);
      color: var(--button-label-color-selected);
    }

    &:disabled {
      background-color: var(--button-background-color-disabled);
      color: var(--button-label-color-disabled);
    }
  }
`;

export const Button: ComponentType<ButtonProps> = styled(ButtonBase)`
  && {
    justify-content: ${({ layout }) => layout};
    padding-left: ${({ layout }) => (layout === 'left' ? '13px' : 0)};

    height: 40px;

    font-size: 13px;
    color: var(--button-label-color);
    background-color: var(--button-background-color);

    .${buttonClasses.icon} {
      font-size: 21px;
      margin-right: ${({ label }) => (label ? '8px' : 0)};
      transform: translateY(2px);

      .MuiSvgIcon-root {
        font-size: 1em;
      }
    }

    .${buttonClasses.check} {
      ${({ layout }) => (layout !== 'left' ? 'display: none' : '')};
      position: absolute;
      font-size: 21px;
      right: 5px;
      top: 8px;

      .MuiSvgIcon-root {
        font-size: 1em;
      }
    }

    &:hover {
      background-color: var(--button-background-color-hover);
      color: var(--button-label-color-hover);
    }

    &[aria-selected='true'] {
      background-color: var(--button-background-color-selected);
      color: var(--button-label-color-selected);
    }

    &:disabled {
      background-color: var(--button-background-color-disabled);
      color: var(--button-label-color-disabled);
    }
  }
`;

export const buttonStyle = css`
  font-size: 13px;
  color: var(--button-label-color);
  background-color: var(--button-background-color);

  &:hover {
    background-color: var(--button-background-color-hover);
    color: var(--button-label-color-hover);
  }

  &[aria-selected='true'] {
    background-color: var(--button-background-color-selected);
    color: var(--button-label-color-selected);
  }

  &:disabled {
    background-color: var(--button-background-color-disabled);
    color: var(--button-label-color-disabled);
  }
`;
