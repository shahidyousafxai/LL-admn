// Library Imports
import React from 'react'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

// Local Imports
import { primaryColor } from '../../utils/style/GlobalVariables.js'

const CustomModal = ({ open, close, title, children, width, noPadding }) => {
  return (
    <Modal
      open={open}
      // onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width || 400,
          bgcolor: primaryColor,
          border: '2px solid #000',
          boxShadow: 24,
          borderRadius: '10px',
          minHeight: '100px',
        }}
      >
        <div className={`relative h-full w-full ${!noPadding && 'p-4 px-6'}`}>
          <div
            className="absolute right-4 top-[15px] cursor-pointer"
            onClick={() => close()}
          >
            <CloseIcon fontSize="small" color="secondary" />
          </div>

          <p
            className={`${noPadding && 'p-4 px-6'}`}
            style={{ color: 'white', fontFamily: 'Inter-Medium', fontSize: 17 }}
          >
            {title}
          </p>
          {children}
        </div>
      </Box>
    </Modal>
  )
}

export default CustomModal
