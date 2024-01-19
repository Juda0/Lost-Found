import React, { useEffect } from 'react';
import styles from './claimCard.module.css';
import LostIcon from '../../../assets/LostItem.svg';
import CopyToClipboard from '../../../assets/CopyToClipboard.svg';
import { MDBPopover, MDBPopoverHeader } from 'mdb-react-ui-kit';

import {
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

const ClaimCard = ({ claim }) => {
  useEffect(() => {

  }, [claim]);
  const handleCopyToClipboard = async (claimFinderEmail) => {
    try {
      await navigator.clipboard.writeText(claimFinderEmail);
      console.log('Email copied to clipboard');
    } catch (error) {
      console.error('Failed to copy email to clipboard:', error);
    }
  };

  return (
    <MDBRow className={styles.claimCard}>
      <MDBCol md={6}>
        <MDBRow className='text-center'>
          <MDBCol md={6}>
            {claim.post.imagePath ? (
              <img className={styles['cardImg']} src={process.env.REACT_APP_API_BASE_URL + claim.post.imagePath} alt="Avatar" />
            ) : (
              <img className={styles['cardImg']} src={LostIcon} alt="Avatar" />
            )}
          </MDBCol>
          <MDBCol md={6}>
            <h2 className={styles['claimCardTitle']}>{claim.post.title}</h2>
          </MDBCol>
        </MDBRow>
      </MDBCol>
      <MDBCol md={6}>
        <MDBRow className='text-center'>
          { claim.status.toLowerCase() === 'accepted' &&

          <div>
            {claim.post.user.email}
            <div className='d-flex align-items-center justify-content-center'>
              <MDBPopover onClick={() => handleCopyToClipboard(claim.post.user.email)} size='md' color='transparent' style={{ boxShadow: 'none', margin: '0px', textShadow: 'none' }}  btnChildren={<img src={CopyToClipboard} style={{ height: '20px' }} alt='copyIcon' />} dismiss>
                <MDBPopoverHeader style={{backgroundColor: '#e5e5e5'}}>Copied email to clipboard</MDBPopoverHeader>
              </MDBPopover>
            </div>
          </div>
          }

        </MDBRow>
      </MDBCol>
    </MDBRow>
  );
};

export default ClaimCard;
