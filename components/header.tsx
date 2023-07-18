import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import styled from 'styled-components';
import NavCollapsedContext from '../context/NavCollapsed';
import Container from './container';
import HeaderDropdown from './header-dropdown';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === 'loading';
  const { isNavToggled, setIsNavToggled } = useContext(NavCollapsedContext);

  return (
    <HeaderItem>
      <HeadroomContainer>
        <ToggleButton onClick={() => setIsNavToggled((oldValue) => !oldValue)}>
          {isNavToggled ? <BsChevronRight /> : <BsChevronLeft />}
        </ToggleButton>
        <DropdownContainer>
          {status !== 'loading' && <HeaderDropdown />}
        </DropdownContainer>
      </HeadroomContainer>
    </HeaderItem>
  );
};

export default Header;

const HeaderItem = styled.header`
  grid-area: 1 / 2 / 2 / 6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const HeadroomContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const DropdownContainer = styled.div`
  flex: 0 0 8rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  appearance: none;
  width: 35px;
  height: 35px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;
