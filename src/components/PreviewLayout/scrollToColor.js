import { useScrollTrigger } from '@mui/material';
import React from 'react';

const ScrollHandler = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: props.window ? window() : undefined,
  });

  const style = {
    backgroundColor: trigger ? '#000' : '#fff',
    marginTop: trigger ? 0 : undefined,
    transition: trigger ? 'all 0.3s ease-in-out' : undefined,
  };

  if (trigger) {
    style.backdropFilter = 'blur(4px)';
    style.WebkitBackdropFilter = 'blur(4px)';
  }

  return React.cloneElement(props.children, {
    style,
  });
};

const ScrollToColor = (props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;
