# Install

```sh
npm install @ssen/each-options
```

# Example

```tsx
import { Button } from '@material-ui/core';
import eachOptions from '@ssen/each-options';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

// buttonOptions will be made of 9
const buttonOptions = eachOptions<ComponentProps<typeof Button>>({
  variant: ['contained', 'outlined', 'text'],
  size: ['small', 'medium', 'large'],
});

export default function () {
  return (
    <div>
      <Group>
        {buttonOptions.map((buttonProps) => (
          <Section>
            <Button {...buttonProps} color="default">
              BUTTON
            </Button>
            <Button {...buttonProps} color="primary">
              BUTTON
            </Button>
            <Button {...buttonProps} color="secondary">
              BUTTON
            </Button>
            <Button {...buttonProps} color="default" disabled>
              BUTTON
            </Button>
            <Button {...buttonProps} color="primary" disabled>
              BUTTON
            </Button>
            <Button {...buttonProps} color="secondary" disabled>
              BUTTON
            </Button>
          </Section>
        ))}
      </Group>
    </div>
  );
}

const Group = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Section = styled.div`
  display: flex;

  justify-content: left;
  align-items: center;

  :not(:first-child) {
    margin-top: 10px;
  }

  > :not(:first-child) {
    margin-left: 10px;
  }
`;
```