import { TextField, TextFieldProps } from '@material-ui/core';
import styled from 'styled-components';

export const TextInput = styled(TextField).attrs<TextFieldProps>((props) => ({
  variant: 'outlined',
  margin: 'dense',
  ...props,
}))`
  && {
    margin: 0;
    height: 40px;

    input {
      border-radius: 3px;
      background-color: #0f1b2f;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: #1a1a23;
    }

    .MuiInputBase-input {
      height: 20px;
      padding: 10px 14px;
    }

    .Mui-error {
      fieldset {
        border-color: #f05543;
      }
    }

    .Mui-focused {
      input {
        background-color: #0c0c21;
      }
    }

    .Mui-disabled {
      opacity: 0.5;
    }
  }
`;
