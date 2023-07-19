import { Montserrat, Open_Sans } from 'next/font/google';
import { useContext, useEffect, type ReactNode } from 'react';
import styled from 'styled-components';
import NavCollapsedContext from '../context/NavCollapsed';
import Header from './header';
import Navigation from './navigation';

// Import Open Sans and Monserrat fonts
const OpenSans = Open_Sans({
  variable: '--OpenSans',
  subsets: ['latin'],
});

const MontserratFont = Montserrat({
  variable: '--Monserrat',
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  const { isNavToggled, setIsNavToggled } = useContext(NavCollapsedContext);

  useEffect(() => {
    if (isNavToggled) {
      document.body.classList.add('nav-closed');
    } else {
      document.body.classList.remove('nav-closed');
    }
  }, [isNavToggled]);

  return (
    <>
      <Main
        className={`${OpenSans.className} ${MontserratFont.className}`}
        $navToggle={isNavToggled}
      >
        <Header />
        <Navigation />
        <MainContent>{children}</MainContent>
      </Main>
    </>
  );
}

const MainContent = styled.div`
  grid-area: 2 / 2 / 6 / 6;
`;

const Main = styled.main<{ $navToggle?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.5fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  transition: grid-template-columns 0.5s ease-in-out 0.15s;

  ${({ $navToggle }) =>
    $navToggle &&
    `
    grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr;
  `}
`;
