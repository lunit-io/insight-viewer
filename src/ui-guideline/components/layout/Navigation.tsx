import React from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Page } from 'ui-guideline/route/routeConfig';

export interface NavigationProps {
  routeConfig: Page[];
}

// TODO 소스코드 보기 (handbook) / 목차 / 이전 / 다음
export function Navigation({ routeConfig }: NavigationProps) {
  const history = useHistory();
  const match = useRouteMatch<{ pageId: string }>(`/:pageId`);
  const currentIndex = routeConfig.findIndex(({ id }) => match?.params.pageId === id);

  if (currentIndex === -1) {
    history.push(`/${routeConfig[0].id}`);
    return null;
  }

  const currentPage: Page = routeConfig[currentIndex];
  const prevPage: Page | undefined = routeConfig[currentIndex - 1];
  const nextPage: Page | undefined = routeConfig[currentIndex + 1];

  return (
    <Container>
      <div>{currentPage.title}</div>
      <div>
        {prevPage && <Link to={`/${prevPage.id}`}>PREV</Link>}
        {nextPage && <Link to={`/${nextPage.id}`}>NEXT</Link>}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 30px;

  height: 60px;

  background-color: black;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: skyblue;
  }
`;
