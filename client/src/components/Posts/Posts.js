import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import styles from "./post.module.css";
import { MDBSpinner } from 'mdb-react-ui-kit';
import pagination from '../Utils/PaginationCalculator';
import PostListPagination from '../Shared/PostListPagination/PostListPagination';
import SearchBar from '../Shared/SearchBar/Searchbar';
import PostCard from './PostCard/PostCard';

const Posts = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [myPosts, setMyPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesRequired, setPagesRequired] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const removeDeletedPostFromList = (postId) => {
    // Remove the post from the list
    setMyPosts(myPosts.filter(post => post.id !== postId));
  };

  useEffect(() => {
    setErrorMessage(""); // Clear error
  },[]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setErrorMessage(""); // Clear error
      // Make an Axios request using axiosConfig
      axios
        .get(`/posts?page=${currentPage}&search=${searchTerm}`)
        .then((response) => {
          setMyPosts(response.data.posts); // Update the state with the response data
          setTotalRecords(response.data.totalRecords);
        })
        .catch((error) => {
          setErrorMessage('Your posts could not be fetched.');
        })
        .finally(() => {
          // stop loading animation after request regardless of result
          setLoading(false);
        });
    };

    fetchAllPosts();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const paginationCalculations = () => {
      setPagesRequired(pagination.calculateTotalPages(totalRecords));
    };

    paginationCalculations();
  }, [totalRecords]);

  const handleFirstPageButtonClick = () => {
    setCurrentPage(1);
  };
  
  const handlePreviousPageButtonClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPageButtonClick = () => {
    if (currentPage < pagesRequired) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleLastPageButtonClick = () => {
    setCurrentPage(pagesRequired);
  };
  
  const getPreviousPageNumber = () => {
    if (currentPage > 1) {
      return currentPage - 1;
    }
    return null;
  };
  
  const getNextPageNumber = () => {
    if (currentPage < pagesRequired) {
      return currentPage + 1;
    }
    return null;
  };

  if(loading && !errorMessage) {
    return(
      <div className="d-flex align-items-center justify-content-center mt-5">
        <MDBSpinner className='mx-2' color='warning'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    )
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }
  
  return (
    <>
      <center>
        <p className={styles['error-message']}>{errorMessage}</p>
        <NavLink to="/posts/new" className={styles['no-active-color']}>
          <button>+ New Post</button>
        </NavLink>
        <h1>My posts</h1>
        <SearchBar onSearch={handleSearch}/>

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
              <PostCard key={post.id} post={post} onDelete={() => removeDeletedPostFromList(post.id)} />
            ))}
          </tbody>
        </table>
        <nav aria-label='...' className='d-flex justify-content-center'>
          <PostListPagination
            currentPage={currentPage}
            pagesRequired={pagesRequired}
            handleFirstPageButtonClick={handleFirstPageButtonClick}
            handlePreviousPageButtonClick={handlePreviousPageButtonClick}
            handleNextPageButtonClick={handleNextPageButtonClick}
            handleLastPageButtonClick={handleLastPageButtonClick}
            getPreviousPageNumber={getPreviousPageNumber}
            getNextPageNumber={getNextPageNumber}
          />
        </nav>
      </center>
    </>
  );
};

export default Posts;