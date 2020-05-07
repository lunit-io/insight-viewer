import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles';

export interface UserTheme {}

export interface UserThemeOptions {}

export interface Theme extends MuiTheme, UserTheme {}

export interface ThemeOptions extends MuiThemeOptions, UserThemeOptions {}
