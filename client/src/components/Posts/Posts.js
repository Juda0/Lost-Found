import { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import "./Card.css"
import LostItem from "../../assets/LostItem.svg"

const Posts = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    // Make an Axios request using axiosConfig
    axiosConfig
      .get('/posts')
      .then((response) => {
        setMyPosts(response.data); // Update the state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <center>
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
