import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Router } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const HeaderDropdown = () => {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  Router.events.on('routeChangeStart', () => {
    setShowDropdown(false);
  });

  console.log(session);

  return (
    <DropdownContainer>
      <DropdownItemButton onClick={() => setShowDropdown(!showDropdown)}>
        {session?.user?.image && (
          <img src={session?.user?.image} alt='user' width={30} height={30} />
        )}
        {session?.user?.email ? (
          <p>
            {session?.user?.username
              ? session?.user?.username
              : session?.user?.email}
          </p>
        ) : (
          <Link href={'/api/auth/signin'}>Login</Link>
        )}
        {session?.user?.email && <DropdownIcon $isOpen={showDropdown} />}
      </DropdownItemButton>
      {showDropdown && session?.user?.email && (
        <DropdownMenu>
          <DropdownItem href={'/profile'}>Profile</DropdownItem>
          {session?.user?.id ? (
            <span onClick={() => signOut()}>Logout</span>
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DropdownItem = styled(Link)``;

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
  border: solid black;
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
