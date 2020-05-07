import { lunitDark } from '@lunit/insight-ui/colors/lunitDark';
import { Color } from '@material-ui/core';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { Shadows } from '@material-ui/core/styles/shadows';

// lunit layout toolbar
// lunit layout sidebar
// lunit modal

export const lunitGrey: Color = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#d5d5d5',
  A200: '#aaaaaa',
  A400: '#303030',
  A700: '#616161',
};

export const noShadows: Shadows = [
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
];

export const lunitDarkTheme: Theme = createMuiTheme({
  shape: {
    borderRadius: 0,
  },
  shadows: noShadows,
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
  },
  palette: {
    type: 'dark',
    grey: lunitGrey,
    primary: lunitDark.control.primary,
    secondary: lunitDark.control.secondary,
    background: {
      default: lunitDark.containers.body.background,
      paper: lunitDark.containers.sidebar.paper,
    },
  },
  typography: {
    fontFamily: 'proximanova,noto_sanslight,sans-serif',
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 13,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
});

export const lunitDarkChild = createMuiTheme({
  shape: {
    borderRadius: 3,
  },
  shadows: noShadows,
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
  },
  palette: {
    type: 'light',
    grey: lunitGrey,
    primary: {
      // main = 500 위치
      // contrastText = 500 위치의 text color
      // light = 200 위치 ( text 는 dark )
      // dark = 700 위치 ( text 는 light )
      main: '#00c9ea',
      contrastText: 'yellow',
    },
    secondary: {
      main: '#f05443',
    },
    background: {
      paper: '#161b24',
      default: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a3a6b4',
    },
  },
});
