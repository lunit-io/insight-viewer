import { withStorybookGlobalStyle } from '@lunit/opt-components';
import { Progress } from '@lunit/opt-login-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { Button } from '../components/Button';
import { SubmitContainer } from '../components/SubmitContainer';

const style: CSSProperties = {width: 300};

storiesOf('opt-login-components', module)
  .addDecorator(withStorybookGlobalStyle)
  .add('<Button>', () => (
    <Button style={style}
            variant="outlined"
            size="large">
      Submit
    </Button>
  ))
  .add('<Button disabled>', () => (
    <Button style={style}
            variant="outlined"
            size="large"
            disabled>
      Submit
    </Button>
  ))
  .add('<Button> + <Progress>', () => (
    <SubmitContainer style={style}>
      <Button style={style}
              variant="outlined"
              size="large"
              disabled>
        Submit
      </Button>
      
      <Progress size={24}/>
    </SubmitContainer>
  ));
  