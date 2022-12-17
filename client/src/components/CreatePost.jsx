import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    description: '',
  });
  // useEffect(() => {
  //   console.log(post);
  // }, [post]);
  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setPost((prev) => {
  //       return {
  //         ...prev,
  //         [name]: value,
  //       };
  //     });
  //   };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleAction = (e) => {
    e.preventDefault();
    axios
      .post('/create', post)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate('posts');
  };
  return (
    <div style={{ maxWidth: '90%', margin: '20px auto', textAlign: 'center' }}>
      <h1>Create a Post</h1>
      <Form>
        <Form.Group>
          <Form.Control
            value={post.title}
            style={{ marginBottom: '1rem' }}
            name="title"
            placeholder="Post Title"
            onChange={handleChange}
          />
          <Form.Control
            value={post.description}
            style={{ marginBottom: '1rem' }}
            name="description"
            placeholder="Post Description"
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          variant="outline-success"
          style={{ width: '100%', marginBottom: '1rem' }}
          onClick={handleAction}
        >
          Save Post
        </Button>
      </Form>
      <Button
        variant="outline-dark"
        style={{ width: '100%' }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
}

export default CreatePost;
