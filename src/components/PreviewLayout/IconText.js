import React from 'react';
import { Box, Typography } from '@mui/material';

const IconText = ({
    text,
    icon,
    fontSize,
    color,
    sx,
    width,
}) => {
  return (
      <React.Fragment>
          <Box display='flex' gap='10px' alignItems='center' sx={sx}>
              <Box component='span'>{icon}</Box>
              <Typography
                  fontSize={fontSize ? fontSize : '0.75rem'}
                  color={color && color}
                  width={width ? width : 'max-content'}
              >
                  {text}
              </Typography>
          </Box>
      </React.Fragment>
  )
}

export default IconText