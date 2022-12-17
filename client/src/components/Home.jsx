import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: '90%', margin: '20px auto', textAlign: 'center' }}>
      <Button variant='outline-dark' style={{ width: '100%' }} onClick={() => navigate('create')}>
        Create Post
      </Button>
      <h1>Post Page</h1>
    </div>
  );
}

export default Home;
