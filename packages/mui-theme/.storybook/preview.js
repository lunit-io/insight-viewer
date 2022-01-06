import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {cxr, mmg, scope} from "../src/index";

export const globalTypes = {
  theme: {
    name: 'Product Theme',
    description: 'Global theme for components',
    defaultValue: 'CXR',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
      items: ['CXR', 'MMG', 'SCOPE'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

const getTheme = (themeName) => {
  if (themeName === 'CXR') {
    return cxr;
  } else if(themeName === 'MMG') {
    return mmg;
  } else if(themeName === 'SCOPE') {
    return scope;
  }
  return cxr
}
export const decorators = [
  (Story, context) => {
    const theme = createTheme(getTheme(context.globals.theme));
    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )},
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}
