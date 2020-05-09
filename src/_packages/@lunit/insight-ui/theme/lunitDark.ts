import { InsightTheme } from '@lunit/insight-ui/theme/types';
import { Color } from '@material-ui/core';
import { Shadows } from '@material-ui/core/styles/shadows';
import { createInsightTheme } from './createInsightTheme';
import { augmentColor } from './internal';

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

export const lunitDark = {
  containers: {
    background: '#161d2c',

    sidebar: {
      background: '#030a18',
      paper: '#242e3e',
    },
  },

  control: {
    // material
    primary: augmentColor({
      main: '#719dff',
      contrastText: '#ffffff',
    }),
    secondary: augmentColor({
      main: '#f05443',
      contrastText: '#ffffff',
    }),

    // insight
    button: augmentColor({
      main: 'rgba(255, 255, 255, 0.2)',
      light: 'rgba(255, 255, 255, 0.35)',
      dark: 'rgba(255, 255, 255, 0.12)',
      contrastText: 'rgba(255, 255, 255, 0.7)',
    }),
    disabled: augmentColor({
      main: 'rgba(255, 255, 255, 0.12)',
      contrastText: 'rgba(255, 255, 255, 0.2)',
    }),
    selected: augmentColor({
      main: '#00a4c8',
      contrastText: '#ffffff',
    }),
  },

  status: {
    critical: augmentColor({
      main: '#c9434b',
      contrastText: '#ffffff',
    }),
    warning: augmentColor({
      main: '#d6ae41',
      contrastText: '#ffffff',
    }),
    info: augmentColor({
      main: '#00a4c8',
      contrastText: '#ffffff',
    }),
    success: augmentColor({
      main: '#47a86c',
      contrastText: '#ffffff',
    }),
  },

  container: {
    panel: augmentColor({
      main: '#242e3e',
    }),
  },
} as const;

export const lunitDarkTheme: InsightTheme = createInsightTheme({
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
    action: {
      active: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: lunitDark.control.disabled.contrastText,
      disabledBackground: lunitDark.control.disabled.main,
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
    background: {
      default: lunitDark.containers.background,
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

  insight: {
    palette: {
      button: lunitDark.control.button,
      selected: lunitDark.control.selected,
    },
  },
});
