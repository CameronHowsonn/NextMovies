import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import styled from 'styled-components';
import NavCollapsedContext from '../context/NavCollapsed';
import Container from './container';
import HeaderDropdown from './header-dropdown';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Notifications from './notifications';

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
          <Notifications />
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
  min-height: 8.25em;
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
  width: 45px;
  height: 44px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.red};
    transform: scale(1.1);
    color: ${(props) => props.theme.colors.black};
  }
`;
