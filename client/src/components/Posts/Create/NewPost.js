import React, { useState } from 'react';
import axios from '../../../config/axiosConfig';
import { PostForm } from './PostForm';
import styles from './form.module.css';
import BackIcon from '../../../assets/BackIcon.svg';
import { NavLink } from 'react-router-dom';

const Newpost = () => {
  const [apiError, setApiError] = useState();

  const handleFormSubmit = async (formData) => {
    try {
      await newPost(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
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
      }
    } catch (error) {
      setApiError('New post could not be created.');
      console.error('Unexpected error:', error);
    }
  };

  return (
    <>
       <div className={styles.newPostContainer}>
      <div className={styles.postFormContainer}>
        <p className="error-message">{apiError}</p>
        <PostForm onFormSubmit={handleFormSubmit} />
      </div>
    </div>
    </>
  );
};

export default Newpost;
