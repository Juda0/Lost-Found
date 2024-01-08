import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import LostIcon from '../../../assets/LostItem.svg';
import BackIcon from '../../../assets/BackIcon.svg';

import './view.css'; // Add your styling here

const ViewPost = () => {
  const [post, setPost] = useState({});
  const [apiError, setApiError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/posts/view/${id}`);
      setPost(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setApiError(error.response.data.error);
      } else {
        setApiError('Error fetching post. Please try again later.');
      }
    }
  };

  return (
    <div className="post-view-container">
      <NavLink to="/posts" className="no-active-color">
          <img src={BackIcon} alt="Back" className="backIcon"/>
      </NavLink>
      {apiError && <p className="error-message">{apiError}</p>}
      <h1>{post.title}</h1>
      <div className="post-content">
        {post.imagePath ? (
          <img src={process.env.REACT_APP_API_BASE_URL + post.imagePath} alt="Post" />
        ) : (
          <img src={LostIcon} alt="Post" />
        )}
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default ViewPost;
