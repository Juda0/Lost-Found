// NewPost component
import React, { useState } from 'react';
import axios from '../../config/axiosConfig';

const NewPost = ({ onPostAdded }) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const createPost = async () => {
    try {
      setIsCreatingPost(true);

      const response = await axios.post('/posts/create');

      if (response.status === 201) {
        console.log('Post created successfully:', response.data);
        onPostAdded(response.data.post); // Notify parent component about the new post
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <>
    <center>
      <button onClick={createPost} disabled={isCreatingPost}>
        {isCreatingPost ? 'Creating...' : '+'}
      </button>
      </center>
    </>
  );
};

export default NewPost;