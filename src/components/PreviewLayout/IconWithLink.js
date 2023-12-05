import React from 'react';

const IconWithLink = ({ link, children }) => {
  return (
    <React.Fragment>
      <a target='_blank' rel='noreferrer' href={link}>
        {children}
      </a>
    </React.Fragment>
  );
};
export default IconWithLink;
