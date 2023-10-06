import React from 'react';
import "../../css/NoMatch.css"

const NoMatch = () => {
  return (
    <div className="no-match-container">
      <div className="error-code">404</div>
      <div className="error-message">Page Not Found</div>
      <p className="error-description">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NoMatch;