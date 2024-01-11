import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FindMap } from '../../Maps/Find/FindMap';
import { MDBSpinner, MDBCol, MDBRow, } from 'mdb-react-ui-kit';
import SearchBar from '../../Shared/SearchBar/Searchbar';
import axios from '../../../config/axiosConfig';
import styles from './find.module.css';

const Find = () => {
    const [errorMessage, setErrorMessage] = useState();
    const [allPosts, setMyPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const isInitialRender = useRef(true);

    const fetchAllPosts = useCallback(async () => {
        setErrorMessage(""); // Clear error
        // Make an Axios request using axiosConfig
        axios
            .get(`/posts/all?search=${searchTerm}`)
            .then((response) => {
                setMyPosts(response.data); // Update the state with the response data
            })
            .catch(() => {
                setErrorMessage('Posts could not be fetched.');
            })
            .finally(() => {
                // stop loading animation after request regardless of result
                setLoading(false);
            });
    }, [searchTerm]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        fetchAllPosts();
    }, [searchTerm, fetchAllPosts]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    }

    if (loading && !errorMessage) {
        return (
            <div className="d-flex align-items-center justify-content-center mt-5">
                <MDBSpinner className='mx-2' color='warning'>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </div>
        )
    }

    return (
        <>
            <MDBRow size="10">
                <MDBCol size="12" className='d-flex b-5 justify-content-center'>
                    <div className={`${styles.findElementsOnTop} mt-2`}>
                        <SearchBar
                            onSearch={handleSearch}
                        />
                        <p className='error-message'>{errorMessage}</p>
                    </div>
                </MDBCol>
            </MDBRow>
            <FindMap
                posts={allPosts}
            />
        </>
    );
};

export default Find;
