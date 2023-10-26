import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import "./Card.css"
import LostItem from "../../assets/LostItem.svg"
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

   async function newPost() {
    try {
      setApiError() // Clear error
      const response = await axios.post('/posts/create');
  
      if (response.status === 201) {
        fetchAllPosts();
        return response.data;
      }
    } catch (error) {
      setApiError('New post could not be created.')
      console.error('Unexpected error:', error);
    }
  }

  // Navigate to the registration page when the "Register" button is clicked
  const handleNewPost = () => {
    newPost()
  };

  return (
    <>
    <center>
      <p className='error-message'>{apiError}</p>
      <button onClick={handleNewPost}>+</button>
      {myPosts.map((post) => (
        <div key={post.id} className="card divSection2">
          <img className='cardImg' src={LostItem} alt="Avatar" />
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
      </center>
    </>
  );
};

export default Posts;
