import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  });
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    window.location.reload();
  };
  const updatePost = (post) => {
    setUpdatedPost(post);
    handleShow();
  };
  const saveUpdatedPost = () => {
    console.log(updatedPost);
    axios
      .put(`/update/${updatedPost._id}`, updatePost)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    // handleClose();
    // window.location.reload();
  };
  return (
    <div style={{ maxWidth: '90%', margin: '20px auto', textAlign: 'center' }}>
      <h1>All Posts Here</h1>
      <Button
        style={{ width: '100%', marginBottom: '1rem' }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                style={{ marginBottom: '1rem' }}
                placeholder="Title"
                name="title"
                value={updatedPost.title ? updatedPost.title : ''}
                onChange={changeHandle}
              />
              <Form.Control
                placeholder="description"
                name="description"
                value={updatedPost.description ? updatedPost.description : ''}
                onChange={changeHandle}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
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
                  <Button
                    variant="outline-info"
                    onClick={() => updatePost(post)}
                  >
                    Update
                  </Button>
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
