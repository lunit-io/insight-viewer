import { RouteProps } from 'react-router-dom';
//import slugify from 'slugify';
//
//slugify.extend({
//  '<': '',
//  '>': '',
//  '(': '',
//  ')': '',
//});

export type Page = RouteProps & { id: string; title: string };

export const routeConfig: Page[] = [
  {
    id: 'material-ui-components',
    title: 'Material UI Components',
    component: require('../pages/material-ui-components').default,
  },
  {
    id: 'basic-layout',
    title: 'Basic Layout',
    component: require('../pages/basic-layout').default,
  },
];
