// Post component
import React, { useState } from 'react';
import NewPost from './NewPost';
import FetchPosts from './FetchPosts';

const Posts = () => {
  const [newPost, setNewPost] = useState(null);

  // Function to handle new post creation
  const handleNewPost = (post) => {
    setNewPost(post);
  };

  return (
    <>
      <NewPost onPostAdded={handleNewPost} />
      <FetchPosts newPost={newPost} />
    </>
  );
};

export default Posts;
