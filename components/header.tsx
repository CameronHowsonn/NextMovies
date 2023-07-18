import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Headroom from 'react-headroom';
import styled from 'styled-components';
import Container from './container';
import HeaderDropdown from './header-dropdown';
import Heading from './heading';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <CustomHeadroom>
      <HeadroomContainer>
        <Logo>
          <Link href='/'>
            <Heading as={1}>IAMCAMDB</Heading>
          </Link>
        </Logo>
        <Nav>
          <HeaderDropdown />
        </Nav>
      </HeadroomContainer>
    </CustomHeadroom>
  );
};

export default Header;

const CustomHeadroom = styled(Headroom)`
  margin: 1.5rem 0;
`;

const HeadroomContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled.div``;

const Nav = styled.nav``;
