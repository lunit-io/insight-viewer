import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { LocationDescriptor } from 'history';
import React from 'react';
import { Link } from 'react-router-dom';

export const MuiLinkButton = ({ to, ...buttonProps }: ButtonProps & { to: LocationDescriptor }) => {
  // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
  return <Button {...buttonProps} component={Link} to={to} />;
};
