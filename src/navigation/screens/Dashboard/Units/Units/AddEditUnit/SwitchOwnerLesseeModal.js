// Library Imports
import React, { useState, useEffect } from 'react'

// Local Imports
import Button from '../../../../../../components/button.js'
import CustomModal from '../../../../../../components/Modal/Modal.jsx'
import SelectDropdown from '../../../../../../components/selectDropdown.js'
import { Styles } from '../../../../../../utils/style/GlobalStyles.js'

const SwitchOwnerLessee = ({ open, close, title, newUnit, setNewUnit, setIsEmptyToInit, userListing }) => {



    const [switchView, setSwitchView] = useState(false)


    const onPressSave = () => {
        if (switchView) {
            close()
            if (title.includes('Owner')) {
                setNewUnit({
                    ...newUnit,
                    ownerId: newUnit?.owner.id,
                    ownerName: newUnit?.owner?.full_name,
                    ownerEmail: newUnit?.owner?.email,
                    ownerPhone: newUnit?.owner?.phone_no !== null ? newUnit?.owner.phone_no : 'No phone number linked with selected user',
                });
                setIsEmptyToInit()
            } else if (title.includes('Lessee')) {
                setNewUnit({
                    ...newUnit,
                    lesseeId: newUnit?.lessee.id,
                    lesseeName: newUnit?.lessee?.full_name,
                    lesseeEmail: newUnit?.lessee?.email,
                    lesseePhone: newUnit?.lessee?.phone_no !== null ? newUnit?.lessee.phone_no : 'No phone number linked with selected user',
                });
                setIsEmptyToInit()
            }

        } else {
            setSwitchView(true)
        }
    }

    const onCancel = () => {
        if (title.includes('Owner')) {
            setNewUnit({ ...newUnit, owner: "" })
            setIsEmptyToInit()
        } else if (title.includes('Lessee')) {
            setNewUnit({ ...newUnit, lessee: "" })
            setIsEmptyToInit()
        }
    }

    return (
        <CustomModal open={open} close={() => { onCancel(), close() }} title={title} width={470}>

            {switchView ? (<>
                {/* Select Owner DropDown */}
                < div className="flex flex-col pt-2">
                    <div
                        style={Styles.smallTextWhite}
                        className="cursor-pointer mb-1">
                        {title.includes('Lessee') ? "New Lessee" : "New Owner"}
                    </div>
                    <SelectDropdown
                        className={'mt-0'}
                        width={420}
                        list={userListing}
                        type="switchDropdown"
                        value={
                            title.includes('Owner') ?
                                newUnit?.owner?.full_name :
                                title.includes('Lessee') ?
                                    newUnit?.lessee?.full_name : ''
                        }
                        placeholder={'Select'}
                        onClick={(value) => {
                            if (title.includes('Owner')) {
                                setNewUnit({ ...newUnit, owner: value })
                                setIsEmptyToInit()
                            } else if (title.includes('Lessee')) {
                                setNewUnit({ ...newUnit, lessee: value })
                                setIsEmptyToInit()
                            }
                        }}
                    />
                </div>
            </>) : (<>
                {/* Confirmation Modal */}
                < div className="flex pt-2" >
                    <p style={Styles.deleteModalText}>
                        Are you sure that you want to {title.toLowerCase()}?
                    </p>
                </div >
            </>)}




            {/* Buttons Section */}
            <div className="flex items-center justify-end gap-5 mt-5">
                <div onClick={() => { onCancel(), close() }} className="text-white text-sm cursor-pointer">
                    <p style={Styles.cancelBtn}>Cancel</p>
                </div>
                <Button
                    className={`!px-5 text-sm !normal-case`}
                    style={Styles.activeBtn}
                    onClick={onPressSave}
                >
                    <p style={Styles.activeBtnText}>{switchView ? 'Save' : title}</p>
                </Button>
            </div>
        </CustomModal >
    )
}

export default SwitchOwnerLessee;
