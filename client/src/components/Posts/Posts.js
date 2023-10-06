import { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';

const Posts = () => {
  const [myPosts, setMyPosts] = useState(null);

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
      {myPosts}
    </>
  );
};

export default Posts;
