import React, { ReactElement } from 'react';

export interface ButtonContentProps {
  label?: ReactElement | string;
  icon?: ReactElement | string;
  check?: ReactElement | true;
  layout?: 'left' | 'center';
}

export function ButtonContent({}: ButtonContentProps) {
  return <div>...</div>;
}
