import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import "./Card.css";
import LostIcon from "../../assets/LostItem.svg";
import BinIcon from "../../assets/BinIcon.svg";
import CheckmarkIcon from "../../assets/CheckmarkIcon.svg";
import NotClaimedIcon from "../../assets/NotClaimedIcon.svg";

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

  return (
    <>
      <center>
        <p className='error-message'>{apiError}</p>
        <NavLink to="/posts/new" className="no-active-color">
          <button>+ New Post</button>
        </NavLink>
        <h1>My posts</h1>
        <table className="custom-table">
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
                <NavLink to={`/posts/${post.id}/view`} className="card-link">
                  <div className="cardContent">
                    {/* Default post image */}
                    {post.imagePath ? (
                      <img className='cardImg' src={process.env.REACT_APP_API_BASE_URL + post.imagePath} alt="Avatar" />
                    ) : (
                      <img className='cardImg' src={LostIcon} alt="Avatar" />
                    )}
                    <h2 className='cardTitle'>{post.title}</h2>
                  </div>
                  </NavLink>
                </td>
                <td>
                  {post.status === "OWNER_FOUND" ? (
                    <img className='statusIcon' src={CheckmarkIcon} alt="Green Checkmark" />
                  ) : (
                    <img className='statusIcon' src={NotClaimedIcon} alt="Not Claimed Yet" />
                  )}
                </td>
                <td>
                  <img className='binIcon' src={BinIcon} alt="Bin Icon" />
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