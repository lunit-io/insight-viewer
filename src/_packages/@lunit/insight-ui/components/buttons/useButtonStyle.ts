import { ButtonBaseClassKey } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { DefaultTheme, makeStyles } from '@material-ui/styles';

export const useButtonStyle = makeStyles<DefaultTheme, { color?: PaletteColor }, ButtonBaseClassKey>((theme) => {
  return {
    root: {},
    disabled: {},
    focusVisible: {},
  };
});
