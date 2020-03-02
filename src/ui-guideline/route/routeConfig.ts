import { RouteProps } from 'react-router-dom';

type R = RouteProps & { id: string; title: string };

export const routeConfig: R[] = [
  {
    id: 'type-of-annotation',
    title: 'Annotation의 종류',
    component: require('../pages/type-of-annotation/ko.mdx').default,
  },
  {
    id: 'metadata-of-annotation',
    title: 'Annotation을 그리고 난 뒤, 부가정보 입력하기',
    component: require('../pages/metadata-of-annotation/ko.mdx').default,
  },
  {
    id: 'structure-of-sidepanel',
    title: 'Side Panel의 구조',
    component: require('../pages/structure-of-sidepanel/ko.mdx').default,
  },
  {
    id: 'type-of-message',
    title: '사용할 수 있는 메세지 기능들',
    component: require('../pages/type-of-message/ko.mdx').default,
  },
  {
    id: 'site-links',
    title: '기존 작업 되었던 사이트 링크',
    component: require('../pages/site-links/ko.mdx').default,
  },
];
