import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import styles from './pagination.module.css';

const PostListPagination = ({
  currentPage,
  pagesRequired,
  handleFirstPageButtonClick,
  handlePreviousPageButtonClick,
  handleNextPageButtonClick,
  handleLastPageButtonClick,
  getPreviousPageNumber,
  getNextPageNumber,
}) => {
  return (
    <nav aria-label='...' className='d-flex justify-content-center'>
      <MDBPagination className='mb-2'>
        <MDBPaginationItem className={styles.pagination} disabled={currentPage === 1}>
          <MDBPaginationLink onClick={handleFirstPageButtonClick}>
            First
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem className={styles.pagination} disabled={currentPage === 1}>
          <MDBPaginationLink onClick={handlePreviousPageButtonClick}>
            {getPreviousPageNumber()}
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem className={styles.pagination} active>
          <MDBPaginationLink>
            {currentPage}
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem className={styles.pagination} disabled={currentPage === pagesRequired}>
          <MDBPaginationLink onClick={handleNextPageButtonClick}>
            {getNextPageNumber()}
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem className={styles.pagination} disabled={currentPage === pagesRequired}>
          <MDBPaginationLink onClick={handleLastPageButtonClick}>
            Last
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </nav>
  );
};

export default PostListPagination;