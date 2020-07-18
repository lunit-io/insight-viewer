import { createMuiTheme, Theme as MuiTheme } from '@material-ui/core/styles';

const muiTheme: MuiTheme = createMuiTheme({
  palette: {
    type: 'dark',
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

export const theme = {
  ...muiTheme,
  app: {
    backgroundColor: '#222232',
  },
};

export type Theme = typeof theme;
