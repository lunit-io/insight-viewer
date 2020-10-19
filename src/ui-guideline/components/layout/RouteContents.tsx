import React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { routeConfig } from '../../route/routeConfig';

export function RouteContentsBase({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Switch>
        <Route exact path="/" component={require('../../pages/index/ko.mdx').default} />
        {routeConfig.map(({ id, component }) => (
          <Route key={id} path={`/${id}`} component={component} />
        ))}
        <Redirect to="/type-of-annotation" />
      </Switch>
    </div>
  );
}

export const RouteContents = styled(RouteContentsBase)`
  > table {
    border-collapse: collapse;

    th,
    td {
      padding: 20px;
      //text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);

      &:first-child {
        padding-left: 0;
        border-left: 0;
      }
    }

    tr:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  > h1 {
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    margin-top: 2em;
  }

  > h2 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin-top: 1.5em;
  }

  > h3 {
    margin-top: 1.3em;
  }

  > img {
  }
`;
