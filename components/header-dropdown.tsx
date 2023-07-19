import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Router } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Stack from './stack';
import Text from './text';

const HeaderDropdown = () => {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  Router.events.on('routeChangeStart', () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <DropdownContainer ref={dropDownRef}>
      <DropdownItemButton onClick={() => setShowDropdown(!showDropdown)}>
        {session?.user?.image && (
          <img src={session?.user?.image} alt='user' width={30} height={30} />
        )}
        {session?.user?.email ? (
          <Text>
            {session?.user?.username
              ? session?.user?.username
              : session?.user?.email}
          </Text>
        ) : (
          <Link href={'/api/auth/signin'}>Login</Link>
        )}
        {session?.user?.email && <DropdownIcon $isOpen={showDropdown} />}
      </DropdownItemButton>
      {showDropdown && session?.user?.email && (
        <DropdownMenu gap={1}>
          <DropdownItem href={'/profile'}>Profile</DropdownItem>
          {session?.user?.id ? (
            <Text onClick={() => signOut()}>Logout</Text>
          ) : (
            <Link href={'/api/auth/signin'}>Login</Link>
          )}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default HeaderDropdown;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.black};
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 0.25rem;
  padding: 1rem 0.75rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  z-index: 4;
`;

const DropdownItem = styled(Link)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  padding-bottom: 0.5rem;
`;

const DropdownItemButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  img {
    border-radius: 50%;
  }
`;

const DropdownIcon = styled.div<{ $isOpen: boolean }>`
  border: solid ${({ theme }) => theme.colors.white};
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);

  ${(props) =>
    props.$isOpen &&
    `

        transform: rotate(225deg);
    `}
`;
