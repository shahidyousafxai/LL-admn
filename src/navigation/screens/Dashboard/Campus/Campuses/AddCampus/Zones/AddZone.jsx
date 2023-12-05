// Library Imports
import React from 'react'

// Local Imports
import Button from '../../../../../../../components/button.js'
import TextField from '../../../../../../../components/inputField.js'
import CustomModal from '../../../../../../../components/Modal/Modal.jsx'
import SelectDropdown from '../../../../../../../components/selectDropdown.js'
import { Styles } from '../../../../../../../utils/style/GlobalStyles.js'

const AddZone = ({
  open, close, newZone, onChange, onSave, loading,
  error, states, cities
}) => {

  return (
    <CustomModal open={open} close={close} title={newZone.title !== '' ? newZone.title : "New Zone"}>
      <form>
        {/* Zone name */}
        <TextField value={newZone?.name} onChange={onChange} label={'Name'} type="text" name="name"
          error={error.name === 'name' && error} />

        {/* Zone state */}
        <SelectDropdown
          list={states} label={'State'} value={newZone?.state}
          onClick={onChange} name="state" width={350} />

        {/* Zone city */}
        <SelectDropdown
          list={newZone?.state !== '' ? cities : []}
          label={'City'} value={newZone?.city} onClick={onChange} name="city"
          isStateEmpty={newZone?.state === '' ? true : false} width={350} />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-5 mt-5">
          <p onClick={close} style={Styles.cancelBtn}>
            Cancel
          </p>
          <Button
            className={`!px-5 !text-white text-sm !normal-case`}
            style={(newZone.name === '' || newZone.state === '' || newZone.city === '') || loading
              ? Styles.disableBtn : Styles.activeBtn}
            onClick={onSave} loading={loading}
            disabled={(newZone.name === '' || newZone.state === '' || newZone.city === '') || loading
              ? true : loading ? true : false}
          >
            {!loading &&
              <p style={(newZone.name === '' || newZone.state === '' || newZone.city === '') || loading
                ? Styles.disableBtnText : Styles.activeBtnText}>
                Save
              </p>
            }
          </Button>
        </div>
      </form>
    </CustomModal>
  )
}

export default AddZone
