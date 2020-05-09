import { ButtonBase, ButtonBaseClassKey, ButtonBaseProps } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { DefaultTheme, Styles, withStyles } from '@material-ui/styles';
import React, { ComponentType, CSSProperties } from 'react';
import { buttonStyle } from './buttonStyle';

export interface LunitControl {
  color?: { root: PaletteColor };
  fit?: 'form' | 'sidebar';
}

export interface LunitButtonProps extends Omit<ButtonBaseProps, 'color'>, LunitControl {}

export function Button2({ color, fit, style, classes, ...buttonProps }: LunitButtonProps) {
  const buttonStyle: CSSProperties | undefined = color?.root
    ? {
        ...style,
        '--button-background-color': color.root.main,
        '--button-color': color.root.contrastText,
      }
    : style;

  return <ButtonBase {...buttonProps} style={buttonStyle} />;
}

export const LunitButton: ComponentType<LunitButtonProps> = withStyles<
  Styles<DefaultTheme, LunitButtonProps, ButtonBaseClassKey>
>(buttonStyle, { name: 'LunitButton' })(Button2);
