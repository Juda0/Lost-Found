  import React, { useState, useEffect } from 'react';
  import axios from '../../../config/axiosConfig';
  import Accordion from 'react-bootstrap/Accordion';
  import { useAccordionButton } from 'react-bootstrap/AccordionButton';
  import Card from 'react-bootstrap/Card';
  function CustomToggle({ children, eventKey, email}) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (<>
      <button
        type="button"
        style={{ margin: '0px'}}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
      <em>{email}</em>
      </>
    );
  }

  export const OpenClaimsForPost = ({ postId, onOwnerFound } ) => {
    const [errorMessage, SetErrorMessage] = useState('');
    const [claims, setClaims] = useState([]);

    const removeClaimFromList = (claimId) => {
      setClaims(claims.filter(claim => claim.id !== claimId));
    }

    useEffect(() => {
      axios.post('/claims/getClaimsByPostId', {postId})
        .then(response => {
          setClaims(response.data.claims);
        })
        .catch(error => {
          // Handle errors
          if (error.response && error.response.status !== 201) {
            SetErrorMessage(error.response.data.message || 'Error fetching claims.');
            return;
          }
        });
    }, [postId]);

    // Updating status to DENIED or ACCEPTED
    const changeStatus = (claimId, status) => () => {
      axios.post('/claims/changeStatus', { claimId, status })
        .then(response => {
          if (status === 'DENIED') {
            removeClaimFromList(claimId);
          } else if (status === 'ACCEPTED') {
            // Keep the existing logic to clear the entire list if needed
            onOwnerFound();
          }
        })
        .catch(error => {
          // Handle errors
          if (error.response && error.response.status !== 201) {
            SetErrorMessage(error.response.data.message);
            return;
          }
        });
    };

    return (
      <>
        {errorMessage && <div>{errorMessage}</div>}
        
        {claims && claims.length > 0 ? (<div>
          <h1>Incoming claims</h1>
          <em style={{color: '#bbbbbb'}}>NOTE: Approving a claim will automatically share your email adress with the owner</em>
          <Accordion defaultActiveKey="0" style={{ maxHeight: '200px', overflowY: 'scroll' }} >
            {claims.map((claim, index) => (
              <Card key={index} style={{ margin: '10px' }}>
                <Card.Header style={{ padding: '0px', margin: '0px' }}>
                  <CustomToggle eventKey={index.toString()} email={claim.email}>Review!</CustomToggle><em style={{ marginLeft: '10px' }}>Claim by {claim.owner.username}</em>
                </Card.Header>
                <Accordion.Collapse eventKey={index.toString()}>
                  <Card.Body style={{ padding: '0px' }}>
                    <p style={{ marginBottom: '0px' }}>{claim.message}</p>
                    <button onClick={changeStatus(claim.id, 'DENIED')} style={{ backgroundColor: 'transparent', border: '1px solid red', color: 'black', margin: '5px'}}>Deny</button>
                    <button onClick={changeStatus(claim.id, 'ACCEPTED')} style={{ backgroundColor: 'transparent', border: '1px solid green', color: 'black', margin: '0px' }}>Approve</button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
        ) : (
          <>
          </>
        )}
      </>
    );
  }