import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import "./Card.css"
import LostItem from "../../assets/LostItem.svg"
const FetchPosts = ({ newPost }) => {
  const [apiError, setApiError] = useState('');
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, [newPost]); // Re-fetch posts when a new post is added

  const fetchAllPosts = async () => {
    setApiError(''); // Clear error

    try {
      const response = await axios.get('/posts');
      setMyPosts(response.data); // Update the state with the response data
    } catch (error) {
      setApiError('Your posts could not be fetched.');
      console.error(error);
    }
  };

  return (
    <center>
      <p className='error-message'>{apiError}</p>
      {newPost && (
        <div className="card divSection2">
          <img className='cardImg' src={LostItem} alt="Avatar" />
          <h2>{newPost.title}</h2>
          <p>{newPost.description}</p>
        </div>
      )}
      {myPosts.map((post) => (
        <div key={post.id} className="card divSection2">
          <img className='cardImg' src={LostItem} alt="Avatar" />
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </center>
  );
};

export default FetchPosts;
