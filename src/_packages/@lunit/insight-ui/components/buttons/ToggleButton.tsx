import { ButtonBase, ButtonBaseProps } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { useTheme } from '@material-ui/styles';
import React, { MouseEvent, useCallback } from 'react';

export interface ToggleButtonProps extends Omit<ButtonBaseProps, 'color' | 'onChange'> {
  color?: PaletteColor;
  selectedColor?: PaletteColor;

  selected: boolean;
  onChange: (nextSelected: boolean) => void;
}

export function ToggleButton({ color, selectedColor, selected, onChange, onClick, ...buttonProps }: ToggleButtonProps) {
  const theme = useTheme();

  const click = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (typeof onClick === 'function') onClick(event);
      if (!event.isDefaultPrevented()) onChange(!selected);
    },
    [onChange, onClick, selected],
  );

  // TODO
  //const classes = useButtonStyle({ color: selected ? selectedColor : color });

  return <ButtonBase {...buttonProps} onClick={click} />;
}
