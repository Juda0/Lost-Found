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
    <Fade in={show} mountOnEnter style={{pointerEvents:'none', position: 'fixed', width: '100vw'}}>
      <div style={{ pointerEvents:'none', zIndex: '0', width: '100vw', textAlign: 'center'}}>
        <Alert variant={variantValue}>
          <b>{message}</b>
        </Alert>
      </div>
    </Fade>
  );
};
