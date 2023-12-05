// Library Imports
import React, { useState, useEffect } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';

// Local Imports
import TextField from '../../../../../../components/inputField.js'
import { Styles } from '../../../../../../utils/style/GlobalStyles.js';
import { secondaryColor } from '../../../../../../utils/style/GlobalVariables.js'
import DisabledTextField from '../../../../../../components/disableInputField.js';
import SwitchOwnerLessee from './SwitchOwnerLesseeModal.js';
import ApiController from '../../../../../../utils/network/api.js'


const OwnerInformation = ({ newUnit, setNewUnit, onChange, isEmpty, setIsEmptyToInit }) => {

    const [switchModal, setSwitchModal] = useState(false)
    const [userListing, setUserListing] = useState([])

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, [])
    const getUsers = (name, zones, campus, status) => {
        ApiController.fetchUsersCall(name, zones, campus, 'owner', status, (response) => {
            if (response?.success) {
                setUserListing(response.data)
            }
        })
    }


    return (
        <div className='-mt-4 px-3 h-[480px] overflow-y-scroll'>

            {/* Owner Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-full">

                    <DisabledTextField
                        label={"Owner"} inputClassName={`${(newUnit?.availableForSale && isEmpty?.ownerInfo?.owner) && '!border-2 p-0 rounded-lg !border-red-900'}`}
                        value={newUnit?.ownerName !== 'null null' ? newUnit?.ownerName : 'LuxeLocker'}
                    />

                    <div
                        className='h-6 w-24 flex items-center justify-center rounded-lg border !border-[#CDA950] -mt-9 ml-[82%] cursor-pointer'
                        onClick={() => setSwitchModal(true)}>
                        <p style={Styles.smallTextYellow}>
                            Switch Owner
                        </p>
                    </div>
                </div>
            </div>

            {/* Phone and Email Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-1/2">
                    <DisabledTextField label={"Phone"} value={newUnit?.ownerPhone} />
                </div>

                <div className="item w-1/2">
                    <DisabledTextField label={"Email"} value={newUnit?.ownerEmail} />
                </div>
            </div>

            {/* ID Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-full">
                    <DisabledTextField label={"ID"} value={newUnit?.ownerId} />
                </div>
            </div>

            {/* Monthly Insurance Cost Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-full">
                    <DisabledTextField label={"Monthly Insurance Cost"} value={newUnit?.lastLogin} />
                </div>
            </div>

            {/* Purchase Date and Sell Date Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-1/2">
                    <TextField label={'Purchase Date'} error={(newUnit?.availableForSale && isEmpty?.ownerInfo?.purchase_date) ? true : false}
                        type="date" name="purchaseDate" value={newUnit?.purchaseDate} onChange={onChange}
                    />
                </div>

                <div className="item w-1/2 pt-1">
                    <DisabledTextField label={"Sell Date"} value={newUnit?.sellDate} />
                </div>
            </div>

            {/* Documents Row */}
            <div className="flex items-start justify-start gap-5 mt-5">
                <div className="item w-full">
                    <p style={Styles.smallTextWhite}>
                        Documents
                    </p>

                    {/* Insurance Document Row */}
                    <div className='flex items-center'
                        style={{
                            backgroundColor: secondaryColor, height: 44, marginTop: 5, paddingLeft: 12,
                            borderTopRightRadius: 8, borderTopLeftRadius: 8
                        }}>

                        <InsertDriveFileIcon fontSize='small' color='success' />
                        <p className='ml-5 w-[300px]' style={Styles.normalTextWhite}>
                            August_Grilliam_Insurance.pdf
                        </p>
                        <p className='w-40' style={Styles.normalTextGray}>
                            Insurance
                        </p>

                        <VisibilityIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                        <GetAppIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                        <DeleteIcon fontSize='small cursor-pointer' color='secondary' />

                    </div>

                    {/* Agreement Document Row */}
                    <div className='flex items-center'
                        style={{
                            backgroundColor: secondaryColor, height: 44, marginTop: 2, paddingLeft: 12,
                            borderBottomRightRadius: 8, borderBottomLeftRadius: 8
                        }}>

                        <InsertDriveFileIcon fontSize='small' color='success' />
                        <p className='ml-5  w-[300px]' style={Styles.normalTextWhite}>
                            Agreement_05/09/2022.pdf
                        </p>
                        <p className='w-40' style={Styles.normalTextGray}>
                            Agreement
                        </p>

                        <VisibilityIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                        <GetAppIcon className='mr-3 cursor-pointer' fontSize='small' color='secondary' />
                        <DeleteIcon fontSize='small cursor-pointer' color='secondary' />

                    </div>
                </div>
            </div>

            {/* Switch Owner Modal */}
            <SwitchOwnerLessee
                open={switchModal} close={() => setSwitchModal(false)} userListing={userListing}
                title={'Switch Owner'} newUnit={newUnit} setNewUnit={setNewUnit} setIsEmptyToInit={setIsEmptyToInit} />

        </div>

    )
}

export default OwnerInformation;