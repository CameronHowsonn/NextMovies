import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillCompass, AiOutlineUser } from 'react-icons/ai';
import { BsGraphUpArrow } from 'react-icons/bs';
import styled from 'styled-components';
import NavCollapsedContext from '../context/NavCollapsed';
import Stack from './stack';
import Text from './text';
import Heading from './heading';

const Navigation: React.FC = () => {
  const router = useRouter();
  const { isNavToggled, setIsNavToggled } = useContext(NavCollapsedContext);

  return (
    <NavStack gap={2}>
      <LogoLink href='/'>
        <LogoContainer>
          <ClosedLogo></ClosedLogo>
          <Logo>NextMovies</Logo>
        </LogoContainer>
      </LogoLink>
      <Nav>
        <LinkItems>
          <NavLink href='/' $isActive={router.pathname === '/'}>
            <span>
              <AiFillCompass />
            </span>
            <Text>Browse</Text>
          </NavLink>
          <NavLink href='/trending' $isActive={router.pathname === '/trending'}>
            <span>
              <BsGraphUpArrow />
            </span>
            <Text>Trending</Text>
          </NavLink>
          <NavLink
            href='/following'
            $isActive={router.pathname === '/following'}
          >
            <span>
              <AiOutlineUser />
            </span>
            <Text>Following</Text>
          </NavLink>
        </LinkItems>
      </Nav>
    </NavStack>
  );
};

export default Navigation;

const Logo = styled(Heading)`
  font-size: 1.4rem;
  width: 2rem;
  position: absolute;
  top: 0.55rem;
  left: 4rem;
  opacity: 1;
  transition: opacity 0.1s ease-in-out 0.25s;

  .nav-closed & {
    transition: opacity 0.1s ease-in-out 0s;
    pointer-events: none;
    width: 0px;
    opacity: 0;
  }
`;

const ClosedLogo = styled(Heading)`
  position: relative;
  flex: 0 0 auto;
  top: 0.5rem;
  left: 0.3rem;
  &::before {
    font-size: 1.4rem;
    content: 'N';
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.red};
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LogoLink = styled(Link)`
  width: 100%;
  display: block;
  height: 3rem;
`;

const LogoContainer = styled.div`
  position: relative;
`;

const Nav = styled.nav`
  position: relative;
  left: 0.7rem;
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-family: var(--Montserrat);
  font-weight: 700;
  position: absolute;
  left: 0;

  &:nth-child(1) {
    top: 6rem;
  }

  &:nth-child(2) {
    top: 9rem;
  }

  &:nth-child(3) {
    top: 12rem;
  }

  span {
    color: ${({ theme }) => theme.colors.white};
    position: relative;
    top: 0.125rem;
  }

  a {
    flex: 1 1 auto;
  }

  p {
    height: 1.5rem;
    position: absolute;
    top: 0;
    left: 2rem;
    opacity: 1;
    transition: opacity 0.1s ease-in-out 0.25s;
    .nav-closed & {
      transition: opacity 0.1s ease-in-out 0s;
      opacity: 0;
      visibility: hidden;
    }
  }

  ${(props) =>
    props.$isActive === true &&
    `
    color: ${props.theme.colors.red};    
  `}
`;

const NavStack = styled(Stack)`
  height: 100vh;
  padding: 2rem 2rem 0 2rem;
  grid-area: 1 / 1 / 6 / 2;
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
`;

const LinkItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
