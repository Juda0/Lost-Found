import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import styles from "./card.module.css";
import LostIcon from "../../assets/LostItem.svg";
import BinIcon from "../../assets/BinIcon.svg";
import CheckmarkIcon from "../../assets/CheckmarkIcon.svg";
import NotClaimedIcon from "../../assets/NotClaimedIcon.svg";
import { MDBSpinner } from 'mdb-react-ui-kit';

// Post component
import React, { useState } from 'react';

const Posts = () => {
  const [apiError, setApiError] = useState();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Function to fetch all posts
  const fetchAllPosts = async () => {
    setApiError(""); // Clear error
    // Make an Axios request using axiosConfig
    axios
      .get('/posts')
      .then((response) => {
        setMyPosts(response.data); // Update the state with the response data
      })
      .catch((error) => {
        setApiError('Your posts could not be fetched.');
        console.error(error);
      });
  };

  if(myPosts.length === 0 && !apiError) {
    return(
      <div className="d-flex align-items-center justify-content-center">
      <MDBSpinner className='mx-2' color='warning'>
      <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </div>
      
    )
  }

  return (
    <>
      <center>
        <p className={styles['error-message']}>{apiError}</p>
        <NavLink to="/posts/new" className={styles['no-active-color']}>
          <button>+ New Post</button>
        </NavLink>
        <h1>My posts</h1>
        <table className={styles['custom-table']}>
          <thead>
            <tr>
              <th></th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post) => (
              <tr key={post.id}>
                <td>
                <NavLink to={`/posts/${post.id}/view`} className={styles['card-link']}>
                  <div className={styles['cardContent']}>
                    {/* Default post image */}
                    {post.imagePath ? (
                      <img className={styles['cardImg']} src={process.env.REACT_APP_API_BASE_URL + post.imagePath} alt="Avatar" />
                    ) : (
                      <img className={styles['cardImg']} src={LostIcon} alt="Avatar" />
                    )}
                    <h2 className={styles['cardTitle']}>{post.title}</h2>
                  </div>
                  </NavLink>
                </td>
                <td>
                  {post.status === "OWNER_FOUND" ? (
                    <img className={styles['statusIcon']} src={CheckmarkIcon} alt="Green Checkmark" />
                  ) : (
                    <img className={styles['statusIcon']} src={NotClaimedIcon} alt="Not Claimed Yet" />
                  )}
                </td>
                <td>
                  <img className={styles['binIcon']} src={BinIcon} alt="Bin Icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
};

export default Posts;