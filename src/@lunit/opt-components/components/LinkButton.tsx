import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import { Link } from 'react-router-dom';

export const LinkButton = ({
  to,
  ...buttonProps
}: ButtonProps & { to: unknown }) => {
  // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
  return <Button {...buttonProps} component={Link} to={to} />;
};
