import React from 'react';
import styled from 'styled-components';

export function FooterBase({className}: {className?: string}) {
  return (
    <footer className={className}>
      <p>
        Lunit INSIGHT for OPT
      </p>
      <p>
        Contact <a href="mailto:insight@lunit.io">insight@lunit.io</a>
      </p>
      <p>
        © {new Date().getFullYear()} <a href="https://lunit.io" target="_blank" rel="noopener noreferrer">Lunit Inc.</a> ALL RIGHTS RESERVED
      </p>
    </footer>
  );
}

export const Footer = styled(FooterBase)`
  color: #89a1b5;
  
  a {
    color: #0ca1c6;
    background-color: transparent;
    text-decoration: none;
  }
  
  i {
    font-style: normal;
    text-decoration: none;
    margin: auto 1em;
  }
`;