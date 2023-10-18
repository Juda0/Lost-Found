import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import "./Card.css"
import LostItem from "../../assets/LostItem.svg"
const Posts = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
   fetchAllPosts()
  }, []);

    // Function to fetch all posts
    const fetchAllPosts = async () => {
      // Make an Axios request using axiosConfig
      axios
      .get('/posts')
      .then((response) => {
        setMyPosts(response.data); // Update the state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
   };

   async function newPost() {
    try {
      const response = await axios.post('/posts/create');
  
      if (response.status === 201) {
        fetchAllPosts();
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Invalid email and/or password');
        } else {
          throw new Error('Post creation. Please try again later.');
        }
      } else {
        throw new Error('Network error: Unable to connect to the server.');
      }
    }
  }

  // Navigate to the registration page when the "Register" button is clicked
  const handleNewPost = () => {
    newPost()
  };

  return (
    <>
    <center>
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
