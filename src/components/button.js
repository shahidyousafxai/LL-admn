// Library Imports
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

// Local Imports
import {
  gray,
  primaryColor,
  secondaryColor,
  white,
  yellow,
} from '../utils/style/GlobalVariables';

const Button = ({
  className,
  children,
  color,
  variant,
  fullWidth,
  style,
  disabled,
  onClick,
  loading,
  component,
  startIcon,
  size,
  type,
  height,
  sx,
}) => {
  const beforeStyles = {
    '& 	.MuiLoadingButton-loadingIndicator': {
      color: disabled ? (loading ? white : gray) : primaryColor,
    },
    height: height,
  };

  const mergedSx = {
    ...beforeStyles,
    ...sx,
  };
  return (
    <LoadingButton
      type={type || 'button'}
      className={className}
      startIcon={startIcon}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      style={style}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      size={size}
      component={component}
      sx={mergedSx}
    >
      {children}
    </LoadingButton>
  );
};

export default Button;
