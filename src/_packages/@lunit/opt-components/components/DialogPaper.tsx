import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import { lighten } from '../theme/lighten';

export const DialogPaper = styled(Paper)`
  ${lighten};
  
  width: fit-content;
  height: fit-content;
  padding: 30px 50px;
  border-radius: 0;
  
  > div {
    text-align: center;
  }
`;