import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
  }
  
  *,
  *:before,

  *:after{
    box-sizing: border-box;
  }

  body {
    font-family: var(--OpenSans);
    font-size: 1em;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--Monserrat);
    font-weight: 700;
    line-height: 1.2;
  }

  html {
    overflow: hidden auto;
  }

  html,
  body,
  #__next {
    min-height: 100%;
    max-width: 100vw;
  }

  :root {
    -webkit-font-smoothing: antialiased;  
  }
  `;

export default GlobalStyle;
