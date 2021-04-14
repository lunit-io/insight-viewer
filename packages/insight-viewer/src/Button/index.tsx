import React, { ReactNode, FC, MouseEvent } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 12px 24px;
  background-color: #121a3e;
  font-size: 16px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`
export interface Props {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

const Button: FC<Props> = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
)

export default Button
