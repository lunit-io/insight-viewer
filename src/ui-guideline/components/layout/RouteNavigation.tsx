import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { routeConfig } from '../../route/routeConfig';

export function RouteNavigationBase({ className = '' }: { className?: string }) {
  return (
    <ul className={className}>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {routeConfig.map(({ id, title }) => (
        <li key={id}>
          <NavLink to={`/${id}`}>{title}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export const RouteNavigation = styled(RouteNavigationBase)`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    display: block;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 8px 10px;
    margin-bottom: 2px;
    color: #ffffff;
    font-size: 14px;

    &.active {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`;
