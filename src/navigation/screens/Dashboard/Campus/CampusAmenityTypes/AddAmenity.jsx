// Library Imports
import React from 'react'

// Local Imports
import Button from '../../../../../components/button.js'
import TextField from '../../../../../components/inputField.js'
import CustomModal from '../../../../../components/Modal/Modal.jsx'
import { Styles } from '../../../../../utils/style/GlobalStyles.js'

const AddAmenity = ({ open, close, newAmenity, onChange, onSave, isEmpty, loading, error }) => {
  return (
    <CustomModal width={600} open={open} close={close} title={newAmenity.title !== '' ? newAmenity.title : "New Amenity Type"}>
      <form>
        {/* Name */}
        <TextField value={newAmenity?.name} onChange={onChange} label={'Name'} type="text" name="name"
          error={error.name === 'name' && error} />

        {/* Description TextArea */}
        <TextField height={'h-24'} value={newAmenity?.desc} onChange={onChange}
          label={'Description'} type="text" textArea name="desc" />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-5 mt-5">
          <p onClick={close} style={Styles.cancelBtn}>
            Cancel
          </p>
          <Button
            className={`!px-5 !text-white text-sm !normal-case`}
            style={
              (newAmenity.name.trim() === '' || newAmenity.desc.trim() === '') || loading ? Styles.disableBtn
                : (newAmenity.name === newAmenity.oldName && newAmenity.desc === newAmenity.oldDesc) ? Styles.disableBtn
                  : Styles.activeBtn
            }
            onClick={onSave} loading={loading}
            disabled={
              (newAmenity.name.trim() === '' || newAmenity.desc.trim() === '') || loading ? true
                : (newAmenity.name === newAmenity.oldName && newAmenity.desc === newAmenity.oldDesc) ? true
                  : loading ? true
                    : false
            }
          >
            {!loading &&
              <p style={
                (newAmenity.name.trim() === '' || newAmenity.desc.trim() === '') || loading ? Styles.disableBtnText
                  : (newAmenity.name === newAmenity.oldName && newAmenity.desc === newAmenity.oldDesc) ? Styles.disableBtnText
                    : Styles.activeBtnText
              }>
                Save
              </p>
            }
          </Button>
        </div>
      </form>
    </CustomModal>
  )
}

export default AddAmenity
