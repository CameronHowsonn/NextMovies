import { Montserrat, Open_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import Header from './header';

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
  return (
    <>
      <main className={`${OpenSans.className} ${MontserratFont.className}`}>
        <Header />
        {children}
      </main>
    </>
  );
}
