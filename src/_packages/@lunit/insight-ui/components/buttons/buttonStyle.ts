import { LunitControl } from '@lunit/insight-ui';
import { ButtonBaseClassKey } from '@material-ui/core';
import { DefaultTheme, StyleRulesCallback } from '@material-ui/styles';

export const buttonStyle: StyleRulesCallback<DefaultTheme, LunitControl, ButtonBaseClassKey> = (
  theme: DefaultTheme,
) => ({
  root: ({ color, fit }) => ({
    backgroundColor: color?.root.main ?? theme.palette.primary.main,
    color: color?.root.contrastText ?? theme.palette.primary.contrastText,
  }),
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  focusVisible: {},
});
