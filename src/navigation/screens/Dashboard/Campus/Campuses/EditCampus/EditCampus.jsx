// Library Imports
import React from 'react'

// Local Imports
import CustomModal from '../../../../../../components/Modal/Modal.jsx'
import EditCampusUI from './EditCampusUI.jsx'

const EditCampus = ({
  open, close, newCampus, setnewCampus, onChange, onSave, loading, error
}) => {
  return (
    <CustomModal
      width={620} open={open} close={close} noPadding
      title={newCampus?.title === '' ? newCampus?.title : "Edit Campus"}>

      <EditCampusUI
        close={close}
        newCampus={newCampus}
        setnewCampus={setnewCampus}
        onChange={onChange}
        onSave={onSave}
        loading={loading}
        error={error}
      />

    </CustomModal>
  )
}

export default EditCampus
