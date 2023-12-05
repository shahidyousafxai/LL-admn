//Library Imports

import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { secondaryColor } from '../../utils/style/GlobalVariables';

// Local Imports
const ImageGalleryNew = ({ images }) => {
  console.log('🚀 ~ file: index.jsx:11 ~ ImageGalleryNew ~ images:', images);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <React.Fragment>
      <Box
        display='flex'
        alignItems='center'
        width='inherit'
        height='inherit'
        justifyContent='center'
        position='relative'
      >
        <IconButton
          onClick={handlePrevClick}
          sx={{
            backgroundColor: `${secondaryColor}`,
            color: 'white',
            borderRadius: '12px',
            position: 'absolute',
            left: '10px',
            zIndex: 1,
            '&:hover': {
              backgroundColor: `${secondaryColor}`,
            },
          }}
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <Box>
          <Box>
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex}`}
              className='object-cover sm:w-[500px] w-[350px] h-96 rounded-lg lg:h-[30rem]'
              style={{
                transition: '0.5s ease in-out',
              }}
            />
          </Box>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            marginTop='-100px'
            flexWrap={'wrap'}
            gap='10px'
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${
                  index === currentIndex ? 'active' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
                style={{
                  height: '78px',
                  width: '78px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  transition: '0.5s ease in-out',
                  cursor: 'pointer',
                  border: `${
                    index === currentIndex
                      ? '1px solid white'
                      : '1px solid transparent'
                  }`,
                }}
              />
            ))}
          </Box>
        </Box>
        <IconButton
          onClick={handleNextClick}
          sx={{
            backgroundColor: `${secondaryColor}`,
            borderRadius: '12px',
            color: 'white',
            position: 'absolute',
            right: '10px',
            zIndex: 1,
            '&:hover': {
              backgroundColor: `${secondaryColor}`,
            },
          }}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
    </React.Fragment>
  );
};
export default ImageGalleryNew;
