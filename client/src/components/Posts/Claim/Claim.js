import React, { useState }from 'react';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn
} from 'mdb-react-ui-kit';

export const Claim = () => {
  const [basicModal, setBasicModal] = useState(true);

  const toggleOpen = () => setBasicModal(!basicModal);

  return (
    <>
    <MDBModal open={basicModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>...</MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleOpen}>
              Close
            </MDBBtn>
            <MDBBtn>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  );
};