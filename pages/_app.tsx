import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../components/global-style';
import Layout from '../components/layout';
import { NavCollapsedProvider } from '../context/NavCollapsed';
import theme from '../theme';

interface AppPropsWithSession extends AppProps {
  pageProps: AppProps['pageProps'] & {
    session: Session;
  };
}

const App: React.FC<AppPropsWithSession> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NavCollapsedProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </NavCollapsedProvider>
    </SessionProvider>
  );
};

export default App;
