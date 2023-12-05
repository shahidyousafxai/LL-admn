// Library Imports
import React from 'react'

// Local Imports
import CustomModal from '../../../../../../components/Modal/Modal.jsx'
import AddCampusUI from './AddCampusUI.jsx'

const AddCampus = ({
  open, close, newCampus, setnewCampus, onChange, onSave, loading, error
}) => {
  return (
    <CustomModal
      width={620} open={open} close={close} noPadding
      title={newCampus?.title === '' ? newCampus?.title : "New Campus"}>

      <AddCampusUI
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

export default AddCampus
