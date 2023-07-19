import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import styled from 'styled-components';

const Notifications: React.FC = () => {
  // Hit the /api/auth/get-notifications endpoint
  // to get the notifications for the current user

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
        console.log(data);
        const unreadNotifications = data?.notificationItems?.filter(
          (notification) => !notification.read
        )?.length;
        setHasUnreadNotifications(unreadNotifications > 0);
      });
  }, [session]);

  return (
    <NotificationContainer hasNotifications={hasUnreadNotifications}>
      <Link href='/notifications'>
        <AiOutlineBell />
      </Link>
    </NotificationContainer>
  );
};

export default Notifications;

const NotificationContainer = styled.div<{ hasNotifications: boolean }>`
  position: relative;
  cursor: pointer;
  ${(props) =>
    props.hasNotifications &&
    `
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: red;

          
    }
    `}
`;
