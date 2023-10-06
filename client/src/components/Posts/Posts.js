// import React from 'react';
import { useEffect, useState } from 'react' 
const Posts = () => {

  const [MyPosts, setPosts] = useState(null)
  
  useEffect(() => {
    fetch('http://localhost:4000/posts')
    .then(res => {
      return res.json()
    })
    .then((data => {
      console.log(data)
    }))
  }, [])

  return (
  <>
    return posts
  </>
  );
};

export default Posts;