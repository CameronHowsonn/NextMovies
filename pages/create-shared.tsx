import { useState } from 'react';
import Container from '../components/container';
import Stack from '../components/stack';
import { useSession } from 'next-auth/react';

const CreateShared: React.FC = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<boolean>(null);
  const [success, setSuccess] = useState<boolean>(null);
  const [userRequested, setUserRequested] = useState<string>('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onChangeUserRequested = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRequested(e.target.value);
  };

  const handleSubmit = async (e) => {
    setError(false);
    setSuccess(false);
    e.preventDefault();
    // send api request to /api/auth/update-user
    const res = fetch('/api/auth/create-shared-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
        description,
        id: `${session?.user?.id}|${userRequested}|${title}`,
        userSubmitted: session?.user?.id,
        userRequested,
      }),
    });
    res
      .then((res) => res.json())
      .then((data) => {
        if (data.message != 'success') {
          setError(true);
          return;
        }
        setSuccess(true);
      });
  };

  return (
    <Container>
      <h1>Create Shared</h1>
      {error && (
        <p>There was an error creating your shared. Please try again later.</p>
      )}
      {success && <p>Shared created successfully!</p>}
      <form autoComplete='off' action=''>
        <Stack gap={2}>
          <input
            autoComplete='false'
            name='hidden'
            type='text'
            style={{ display: 'none' }}
          />
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={onChangeTitle}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            value={description}
            onChange={onChangeDescription}
          />
          <label htmlFor='userRequested'>User Requested</label>
          <input
            type='text'
            name='userRequested'
            id='userRequested'
            value={userRequested}
            onChange={onChangeUserRequested}
          />

          <button onClick={handleSubmit}>Create</button>
        </Stack>
      </form>
    </Container>
  );
};

export default CreateShared;
