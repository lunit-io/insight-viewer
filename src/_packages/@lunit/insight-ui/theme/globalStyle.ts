import { createGlobalStyle, css } from 'styled-components';

export const globalStyle = css`
  body {
    color: white;
    background-color: #222232;
  }

  body,
  button,
  input,
  optgroup,
  select,
  textarea,
  pre {
    font-family: proximanova, noto_sanslight, sans-serif;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.6px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;
