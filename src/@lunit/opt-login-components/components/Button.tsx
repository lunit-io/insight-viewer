import { Button as MuiButton, ButtonProps } from '@material-ui/core';
import { ComponentType } from 'react';
import styled from 'styled-components';

export const Button: ComponentType<ButtonProps> = styled(MuiButton).attrs<ButtonProps>((props) => ({
  variant: 'outlined',
  ...props,
}))`
  && {
    text-transform: none;
    height: 40px;
    border-radius: 3px;
    font-size: 14px;
    letter-spacing: 0.6px;
    line-height: 1.15;

    color: #fff;
    background-color: #02bfd3;

    &:hover {
      color: #fff;
      background-color: #0294a8;
    }

    &.Mui-disabled {
      opacity: 0.5;
    }
  }
`;
