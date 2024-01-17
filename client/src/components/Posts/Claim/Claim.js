import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from '../../../config/axiosConfig';
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

export const Claim = ({ postId, onClaimSuccess }) => {
  const [inputText, setInputText] = useState("");
  const [characterMinimum] = useState(20);
  // event handler
  const handleChange = event => {
    setInputText(event.target.value);
    setMessage(event.target.value);
  };
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, SetErrorMessage] = useState('');
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const sendClaim = () => {
    axios.post('/claim/create', { postId, message })
      .then(response => {
        // Handle success
        onClaimSuccess();
        handleClose();
      })
      .catch(error => {
        // Handle errors
        if (error.response && error.response.status !== 201) {
          SetErrorMessage(error.response.data.message);
          return;
        }
      });
  }

  return (
    <>
      <button onClick={handleShow}>
        Make claim
      </button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Claim this item</Modal.Title>
        </Modal.Header>
        <center><p className='error-message'>{errorMessage}</p></center>

        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Proof</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Give information to prove this item is yours..."
                value={inputText}
                onChange={handleChange}
                isInvalid={inputText.length < characterMinimum}
              />
              <Form.Control.Feedback type="invalid">
                Minimum {characterMinimum} characters required.
              </Form.Control.Feedback>
              <Badge className='mt-3' bg={`${inputText.length >= characterMinimum ? 'primary' : 'danger'}`}>{inputText.length}/{characterMinimum}</Badge>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button style={{ backgroundColor: '#e76f51' }} onClick={handleClose}>
            Close
          </button>
          <button type='submit' variant="primary" onClick={() => { sendClaim(); }}>
            Send claim
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}