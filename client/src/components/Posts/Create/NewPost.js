import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import { PostForm } from './PostForm';
import styles from './form.module.css';
import io from 'socket.io-client';

const Newpost = () => {
  const [apiError, setApiError] = useState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      // Establish WebSocket connection
      const newSocket = io(process.env.REACT_APP_API_BASE_URL);
      setSocket(newSocket);
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      await newPost(formData);
      window.location.href = '/posts/';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleErrorMessage = async (error) => {
    try {
      setApiError(error)
    } catch (error) {
      console.error('Error handling error message. ', error);
    }
  };

  const newPost = async (formData) => {
    try {
      console.log('Sending request with FormData:', formData);

      setApiError(); // Clear error

      const response = await axios.post('/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Handle success, e.g., redirect to post details page
        console.log('Post created successfully:', response.data);
        sendToWebSocket(response.data.post); // Send the created post to WebSocket

        return response.data; // Return the created post data
      }
    } catch (error) {
      setApiError('New post could not be created.');
      throw error;
    }
  };

  const sendToWebSocket = (postData) => {
    if (socket && postData) {
    console.log('Sending post to WebSocket:', postData);
      // Send post through WebSocket
      socket.emit('send-post', postData );
  }
  };

  return (
    <>
      <div className={styles.newPostContainer}>
        <div className={styles.postFormContainer}>
          <PostForm onFormSubmit={handleFormSubmit} onErrorMessage={handleErrorMessage}/>
          <p className="error-message">{apiError}</p>

        </div>
      </div>
    </>
  );
};

export default Newpost;
