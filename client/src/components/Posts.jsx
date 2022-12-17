import React from 'react';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  });
  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
        window.location.reload();
  };
  return (
    <div style={{ maxWidth: '90%', margin: '20px auto', textAlign: 'center' }}>
      <h1>All Posts</h1>
      {posts ? (
        <>
          {posts.map((post) => {
            return (
              <div
                key={post._id}
                style={{
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  padding: '1rem',
                }}
              >
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button variant="outline-info">Update</Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default Posts;
