import { ButtonBase, ButtonBaseProps } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import React from 'react';
import { useButtonStyle } from './useButtonStyle';

export interface ButtonProps extends Omit<ButtonBaseProps, 'color'> {
  color?: PaletteColor;
}

export function Button({ color, ...buttonProps }: ButtonProps) {
  const classes = useButtonStyle({ color });
  return <ButtonBase {...buttonProps} classes={classes} />;
}
