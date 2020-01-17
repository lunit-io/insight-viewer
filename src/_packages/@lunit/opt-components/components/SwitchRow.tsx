import styled from 'styled-components';

export const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  
  > :first-child {
    margin-right: 10px;
  }
  
  > :last-child {
    flex: 1;
    text-align: right;
  }
`;