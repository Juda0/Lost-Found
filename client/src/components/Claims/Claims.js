import React, { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';
import {
  MDBRow,
  MDBCol,
  MDBCollapse,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon
} from 'mdb-react-ui-kit';

import styles from './claims.module.css';
import ClaimCard from './ClaimCard.js/ClaimCard';

const Claims = () => {
  const [acceptedOpen, setAcceptedOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [deniedOpen, setDeniedOpen] = useState(false);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('claims/myClaims');  // Replace with your actual endpoint
        setClaims(response.data.claims);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const toggleAccepted= () => {
    setAcceptedOpen(!acceptedOpen);
  };

  const togglePending = () => {
    setPendingOpen(!pendingOpen);
  };

  const toggleDenied = () => {
    setDeniedOpen(!deniedOpen);
  };

  const renderClaimCards = (status) => {
    return (
      <MDBCollapse show={status === 'accepted' ? acceptedOpen : (status === 'pending' ? pendingOpen : deniedOpen)}>
        <MDBCardBody>
          {claims
            .filter((claim) => claim.status.toLowerCase() === status)
            .map((claim, index) => (
              <ClaimCard key={index} claim={claim} />
            ))}
        </MDBCardBody>
      </MDBCollapse>
    );
  };


  return (
    <>
      <MDBRow className='m-0'>
        <MDBCol md='3'></MDBCol>
        <MDBCol md='6' size='12' className={styles.wrap}>
          <div className={styles.claimContainer}>
            <h1>My Claims</h1>
            <h5>Here you can see the status of your claims.</h5>
            <div>
              <div className={styles.clickable}>
                <MDBCardHeader onClick={toggleAccepted} className='d-flex justify-content-between align-items-center'>
                  <h2 className='m-0 mt-5 mb-2 fw-bold '>Accepted Claims</h2>
                  <MDBIcon icon={acceptedOpen ? 'angle-up' : 'angle-down'} />
                </MDBCardHeader>
              </div>
              {renderClaimCards('accepted')}

              <div className='mt-5'>
                <div className={styles.clickable}>
                  <MDBCardHeader onClick={togglePending} className='d-flex justify-content-between align-items-center'>
                    <h2 className='m-0 mb-2 fw-bold'>Pending Claims</h2>
                    <MDBIcon icon={pendingOpen ? 'angle-up' : 'angle-down'} />
                  </MDBCardHeader>
                </div>

                {renderClaimCards('pending')}
              </div>

              <div className='mt-5'>
                <div className={styles.clickable}>
                  <MDBCardHeader onClick={toggleDenied} className='d-flex justify-content-between align-items-center'>
                    <h2 className='m-0 mb-2 fw-bold'>Denied Claims</h2>
                    <MDBIcon icon={deniedOpen ? 'angle-up' : 'angle-down'} />
                  </MDBCardHeader>
                </div>
                {renderClaimCards('denied')}
              </div>

            </div>
          </div>
        </MDBCol>
        <MDBCol md='3'></MDBCol>
      </MDBRow>
    </>
  );
};

export default Claims;