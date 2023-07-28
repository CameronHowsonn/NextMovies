import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import styled from 'styled-components';

const Notifications: React.FC = () => {
  const { data: session, status } = useSession();
  const [hasUnreadNotifications, setHasUnreadNotifications] =
    useState<boolean>(false);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch('/api/auth/get-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: session?.user?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        const unreadNotifications = data?.notificationItems?.filter(
          (notification) => !notification.read
        )?.length;
        setHasUnreadNotifications(unreadNotifications > 0);
      });
  }, [session]);

  return (
    <NotificationContainer $hasNotifications={hasUnreadNotifications}>
      <Link href='/notifications'>
        <AiOutlineBell fontSize={'1.75rem'} />
      </Link>
    </NotificationContainer>
  );
};

export default Notifications;

const NotificationContainer = styled.div<{ $hasNotifications: boolean }>`
  position: relative;
  cursor: pointer;
  top: 0.25rem;
  svg {
    color: ${(props) => props.theme.colors.white};
  }
  ${(props) =>
    !props.$hasNotifications &&
    `
      &::after {
        content: '';
        position: absolute;
        top: 3px;
        right: 3px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${props.theme.colors.red};
    }
    `}
`;
