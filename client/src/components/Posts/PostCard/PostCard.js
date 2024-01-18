import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './postCard.module.css';
import LostIcon from '../../../assets/LostItem.svg';
import CheckmarkIcon from '../../../assets/CheckmarkIcon.svg';
import NotClaimedIcon from '../../../assets/NotClaimedIcon.svg';
import BinIcon from '../../../assets/BinIcon.svg';
import axios from '../../../config/axiosConfig';


const PostCard = ({ post, onDelete }) => {


    const deletePost = (postId) => {
        axios.post('/posts/delete', { postId })
            .then(response => {
                onDelete()
                console.log(response.data.message);
            })
            .catch(error => {
                // Handle error
                console.error('Error deleting post:', error);
            });
    };

    return (
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
                <img className={styles['binIcon']} onClick={() => deletePost(post.id)} src={BinIcon} alt="Bin Icon" />
            </td>
        </tr>
    );
};

export default PostCard;
