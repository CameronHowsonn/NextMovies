import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Container from '../components/container';

const Notifications: React.FC = () => {
  const { data: session, status } = useSession();
  const [notifications, setUNotifications] = useState<Array<any>>([]);

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
        setUNotifications(data.notificationItems);
      });
  }, [session]);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch('/api/auth/mark-notifications-read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: session?.user?.id }),
    });
  }, [session]);

  const acceptShared = async (listId: string, adminId: string) => {
    fetch('/api/list/accept-shared', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: listId, admin: adminId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <h1>Notifications</h1>

      {notifications?.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          <p>{notification.read ? 'Read' : 'Unread'}</p>
          {notification.type === 'sharedListRequest' && (
            <div>
              <button
                onClick={() => {
                  acceptShared(notification.listId, notification.id);
                }}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      ))}
    </Container>
  );
};

export default Notifications;
