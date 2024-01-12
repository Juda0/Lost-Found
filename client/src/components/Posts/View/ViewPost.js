import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import LostIcon from '../../../assets/LostItem.svg';
import BackIcon from '../../../assets/BackIcon.svg';
import styles from './view.module.css';
import ownerNotFound from '../../../assets/OwnerNotFound.svg';
import ownerFound from '../../../assets/OwnerFound.svg';
import { ViewMap } from '../../Maps/View/ViewMap';
import { splitByComma } from '../../Utils/CommaSpllitter';
import { TagDisplay } from '../../Utils/TagDisplay';
import {
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

const ViewPost = () => {
  const [post, setPost] = useState({});
  const [apiError, setApiError] = useState('');
  const [splitTags, setSplitTags] = useState([]);
  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(`/posts/view/${id}`);
      setPost(response.data);
      const splitTags = splitByComma(response.data.tags);
      setSplitTags(splitTags);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setApiError(error.response.data.error);
      } else {
        setApiError('Error fetching post. Please try again later.');
      }
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const isLocationAvailable = post.latitude && post.longitude;

  return (
    <>
      <MDBRow className='m-0 mt-5'>
        <MDBCol md='3'></MDBCol>
        <MDBCol md='6' size='12' className={styles.wrap}>
          <NavLink to="/posts" className={styles['no-active-color']}>
            <img src={BackIcon} alt="Back" className='backIcon' />
          </NavLink>
          {apiError && <p className={styles['error-message']}>{apiError}</p>}

          <div className={styles['post-header']}>
            <h1 className={styles['title-desktop']}>{post.title}</h1>
          </div>

          <MDBRow>
            <MDBCol md='6' size='12'>
              <div className={styles['post-image-container']}>
                {post.imagePath ? (
                  <img src={process.env.REACT_APP_API_BASE_URL + post.imagePath} className={styles['post-image']} alt="Post" />
                ) : (
                  <img src={LostIcon} className={styles['post-image']} alt="Post" />
                )}
              </div>
            </MDBCol>
            <MDBCol md='6' size='12' className='text-center'>
              {post.status === 'OWNER_NOT_FOUND' ? (
                <>
                  <img src={ownerNotFound} className={styles['ownerStatusIcon']} alt="Owner not found" />
                  <p><b>Owner not found</b></p><br></br>
                </>
              ) : (
                <>
                  <img src={ownerFound} className={styles['ownerStatusIcon']} alt="Owner found" />
                  <p style={{ color: 'green', fontWeight: 'bold' }}>Owner found</p>
                </>
              )}
            </MDBCol>
          </MDBRow>
          <div className={styles['post-details']}>
            <h1 className={styles['title-mobile']}>{post.title}</h1>
            <b>description</b>
            <p>{post.description}</p>
            {splitTags[0] !== '' && (
              <>
                <b><p className={styles.header}>Tags</p></b>
                <TagDisplay tags={splitTags} />
              </>
            )}
          </div>

          {isLocationAvailable ? (
            <>
              <b><p className={styles.header}>Map</p></b>
              <ViewMap
                key={post.id}
                center={[post.latitude, post.longitude]}
                title={post.title}
                description={post.description}
                zoom={14}
              />
            </>
          ) : (
            <>
              <b><p className={styles.header}>Map</p></b>
              <p>Not available</p>
            </>
          )}


        </MDBCol>
        <MDBCol md='3'></MDBCol>
      </MDBRow>
    </>
  );
};

export default ViewPost;
