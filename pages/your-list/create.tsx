import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const Create: React.FC = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError(true);
      setErrorMessage('Missing name or description');
      return;
    }

    fetch('/api/list/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, id: session?.user?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success') {
          setSuccess(true);
          setError(false);
          setErrorMessage(null);
        } else {
          setSuccess(false);
          setError(true);
          setErrorMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'description') setDescription(value);
  };

  return (
    <>
      <h1>Create List</h1>
      {error && <p>{errorMessage}</p>}
      {success && <p>Successfully created new list</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          id='description'
          onChange={(e) => handleChange(e)}
        />
        <button type='submit'>Create</button>
      </form>
    </>
  );
};

export default Create;
