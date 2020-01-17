import { createMuiTheme, Theme as MuiTheme } from '@material-ui/core/styles';
import { ColorProperty } from 'csstype';

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

export interface OPTComponentsCSSProperties {
  '--button-background-color'?: ColorProperty;
  '--button-label-color'?: ColorProperty;
  '--button-background-color-hover'?: ColorProperty;
  '--button-label-color-hover'?: ColorProperty;
  '--button-background-color-selected'?: ColorProperty;
  '--button-label-color-selected'?: ColorProperty;
  '--button-background-color-disabled'?: ColorProperty;
  '--button-label-color-disabled'?: ColorProperty;
  
  '--panel-background-color'?: ColorProperty;
  '--panel-header-background-color'?: ColorProperty;
  '--panel-icon-color'?: ColorProperty;
  '--panel-icon-color-hover'?: ColorProperty;
  '--panel-title-color'?: ColorProperty;
  
  '--slider-rail-color'?: ColorProperty;
  '--slider-thumb-color'?: ColorProperty;
  '--slider-track-color'?: ColorProperty;
  '--slider-value-label-color'?: ColorProperty;
  
  '--tooltip-background-color'?: ColorProperty;
  '--tooltip-color'?: ColorProperty;
}