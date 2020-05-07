import * as H from 'history';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from './Button';

export interface LinkButtonProps extends ButtonProps {
  to: H.LocationDescriptor | ((location: H.Location) => H.LocationDescriptor);
}

export const LinkButton = ({ to, ...buttonProps }: LinkButtonProps) => {
  // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
  return <Button {...buttonProps} component={Link} to={to} />;
};
