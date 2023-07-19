import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Container from '../components/container';
import Stack from '../components/stack';

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState<string>(session?.user?.name);
  const [error, setError] = useState<boolean>(null);
  const [success, setSuccess] = useState<boolean>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    setError(false);
    setSuccess(false);
    e.preventDefault();
    const res = fetch('/api/auth/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, id: session?.user?.id }),
    });
    res
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'error') {
          setError(true);
          return;
        }
        const event = new Event('visibilitychange');
        document.dispatchEvent(event);
        setSuccess(true);
      });
  };

  return (
    <Container>
      <h1>Profile</h1>
      <h1>Your profile ID is {session?.user?.id}</h1>
      {error && (
        <p>
          There was an error updating your profile. The Username may be taken.
        </p>
      )}
      {success && <p>Profile updated successfully!</p>}
      <form autoComplete='off' action=''>
        <Stack gap={2}>
          <input
            autoComplete='false'
            name='hidden'
            type='text'
            style={{ display: 'none' }}
          />
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => onChange(e)}
            autoComplete='none'
          />
          <button type='submit' onClick={(e) => handleSubmit(e)}>
            Update
          </button>
        </Stack>
      </form>
    </Container>
  );
};

export default Profile;
