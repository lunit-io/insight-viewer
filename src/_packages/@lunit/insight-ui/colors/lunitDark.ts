import { augmentColor } from './internal';

export const lunitDark = {
  containers: {
    body: {
      background: '#161d2c',
    },

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
