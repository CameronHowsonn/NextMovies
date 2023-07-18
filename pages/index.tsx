import React from 'react';
import Container from '../components/container';

const Index: React.FC = () => {
  return (
    <Container>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{' '}
        <a href='https://next-auth.js.org'>NextAuth.js</a> for authentication.
      </p>
    </Container>
  );
};

export default Index;
