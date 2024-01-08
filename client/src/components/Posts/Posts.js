import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import axios from '../../config/axiosConfig';
import "./Card.css"
import LostIcon from "../../assets/LostItem.svg"
// Post component
import React, { useState } from 'react';

const Posts = () => {
  let [apiError, setApiError] = useState();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
   fetchAllPosts()
  }, []);

    // Function to fetch all posts
    const fetchAllPosts = async () => {
      setApiError("") // Clear error
      // Make an Axios request using axiosConfig

      axios
      .get('/posts')
      .then((response) => {
        setMyPosts(response.data); // Update the state with the response data
      })
      .catch((error) => {
        setApiError('Your posts could not be fetched.')
        console.error(error);
      });
   };

  return (
    <>
    <center>
      <p className='error-message'>{apiError}</p>
      <NavLink to="/posts/new" className="no-active-color">
        <button>+ New Post</button>
      </NavLink>
      <h1>My posts</h1>
      {myPosts.map((post) => (
        <div key={post.id} className="card divSection2">
          {/* Default post image */}
          {post.imagePath ? (
            <img className='cardImg' src={process.env.REACT_APP_API_BASE_URL + post.imagePath} alt="Avatar" />
          ) : (
            <img className='cardImg' src={LostIcon} alt="Avatar" />
          )}
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
      </center>
    </>
  );
};

export default Posts;
