import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { GlobalStyle } from './global-style';

interface Props extends AppProps {
  Wrapper?: React.FC<any>;
}

const BaseApp: React.FC<Props> = ({ Component, Wrapper, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  );
};

export default BaseApp;
