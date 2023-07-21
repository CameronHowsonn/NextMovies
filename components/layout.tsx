import { Montserrat, Open_Sans } from 'next/font/google';
import { useContext, useEffect, type ReactNode } from 'react';
import styled from 'styled-components';
import NavCollapsedContext from '../context/NavCollapsed';
import TrailerContext from '../context/TrailerModal';
import Header from './header';
import Navigation from './navigation';
import VideoModal from './video-modal';

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
  const { trailerUrl, setTrailerUrl, setIsModalOpen, isModalOpen } =
    useContext(TrailerContext);

  useEffect(() => {
    if (isNavToggled) {
      document.body.classList.add('nav-closed');
    } else {
      document.body.classList.remove('nav-closed');
    }
  }, [isNavToggled]);

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  return (
    <>
      <Main
        className={`${OpenSans.className} ${MontserratFont.className}`}
        $navToggle={isNavToggled}
      >
        {isModalOpen && <VideoModal url={trailerUrl} />}
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
  grid-template-rows: 6rem 1fr 1fr 1fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  transition: grid-template-columns 0.5s ease-in-out 0.15s;

  ${({ $navToggle }) =>
    $navToggle &&
    `
    grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr;
  `}
`;
