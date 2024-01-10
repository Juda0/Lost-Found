import React from 'react';
import { MDBBadge  } from 'mdb-react-ui-kit';

export const TagDisplay = ({ tags }) => {
  const colors = ['primary', 'secondary', 'info', 'dark'];

  if (!tags) {
    return null;
  }

  return (
    <>
      {
      tags.map((tag, index) => (
        <MDBBadge 
          key={index}
          
          color={colors[index % colors.length]}
          className='px-3 m-1 mb-2 rounded-3 opacity-70'
          style={{  display: 'inline-block', width: 'min-content'}}
        >
          {tag}
        </MDBBadge >
      ))}
    </>
  );
};