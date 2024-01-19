import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

export const BootstrapAlert = ({ message, variantValue}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fade in={show} mountOnEnter style={{ pointerEvents: 'none', position: 'fixed', top: '0', left: '0', width: '100vw', zIndex: '9999' }}>
      <div style={{ pointerEvents: 'none', width: '100%', textAlign: 'center' }}>
        <Alert variant={variantValue}>
          <b>{message}</b>
        </Alert>
      </div>
    </Fade>
  );
};
