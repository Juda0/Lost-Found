import React, { useState } from 'react';
import styles from './searchBar.module.css';
import whiteSearchIcon from '../../../assets/whiteSearchIcon.svg';

const SearchBar = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch(searchTerm)
    };

    return (
        <div className={styles.fullBar}>
            <input
                className={styles.searchBarInput}
                type="text"
                placeholder="Dark blue cap.."
                value={searchTerm}
                onChange={handleSearch}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchSubmit()
                    }
                }}
            />
            <button className={styles.searchBarButton} onClick={handleSearchSubmit}><img className={styles.searchIcon} src={whiteSearchIcon} /></button>
        </div>
    );
};

export default SearchBar;
