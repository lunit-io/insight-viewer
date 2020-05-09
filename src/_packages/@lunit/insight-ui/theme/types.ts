import { PaletteColorOptions, Theme, ThemeOptions } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { ColorProperty } from 'csstype';

export interface InsightCSSProperties {
  '--button-background-color'?: ColorProperty;
  '--button-color'?: ColorProperty;
}

export interface InsightThemeOptions extends ThemeOptions {
  insight?: {
    palette?: {
      button?: PaletteColorOptions;
      selected?: PaletteColorOptions;
    };
    overrides?: {};
  };
}

export interface InsightTheme extends Theme {
  insight: {
    palette: {
      button: PaletteColor;
      selected: PaletteColor;
    };
    overrides?: {};
  };
}
