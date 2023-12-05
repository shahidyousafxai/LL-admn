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



const LeaseInformation = ({ newUnit, setNewUnit, onChange, isEmpty, setIsEmptyToInit }) => {

    const [switchModal, setSwitchModal] = useState(false)
    const [userListing, setUserListing] = useState([])

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, [])
    const getUsers = (name, zones, campus, status) => {
        ApiController.fetchUsersCall(name, zones, campus, 'lessee', status, (response) => {
            if (response?.success) {
                setUserListing(response.data)
            }
        })
    }


    return (
        <div className='-mt-4 px-3 h-[480px] overflow-y-scroll'>

            {/* Lessee Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-full">

                    <DisabledTextField
                        inputClassName={`${(newUnit?.availableForLease && isEmpty?.lesseeInfo?.lessee) && '!border-2 p-0 rounded-lg !border-red-900'}`}
                        label={"Lessee"} value={newUnit?.lesseeName} />

                    <div
                        className='h-6 w-24 flex items-center justify-center rounded-lg border !border-[#CDA950] -mt-9 ml-[82%] cursor-pointer'
                        onClick={() => setSwitchModal(true)}>
                        <p style={Styles.smallTextYellow}>
                            Switch Lessee
                        </p>
                    </div>

                </div>
            </div>

            {/* Phone and Email Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-1/2">
                    <DisabledTextField label={"Phone"} value={newUnit?.lesseePhone} />
                </div>

                <div className="item w-1/2">
                    <DisabledTextField label={"Email"} value={newUnit?.lesseeEmail} />
                </div>
            </div>

            {/* ID Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-full">
                    <DisabledTextField label={"ID"} value={newUnit?.lesseeId} />
                </div>
            </div>

            {/* Monthly Insurance Cost Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-1/2">
                    <TextField label={'Monthly Lease Amount'}
                        type="text" name="monthlyLeaseAmount" value={newUnit?.monthlyLeaseAmount} onChange={onChange}
                    />
                </div>

                <div className="item w-1/2">
                    <DisabledTextField label={"Monthly Insurance Cost"} value={newUnit?.lastLogin} />
                </div>
            </div>

            {/* Start Date and End Date Row */}
            <div className="flex items-start justify-start gap-5">
                <div className="item w-1/2">
                    <TextField label={'Start Date'} error={(newUnit?.availableForLease && isEmpty?.lesseeInfo?.start_date) ? true : false}
                        type="date" name="startDate" value={newUnit?.startDate} onChange={onChange}
                    />
                </div>

                <div className="item w-1/2">
                    <TextField label={'End Date'} error={(newUnit?.availableForLease && isEmpty?.lesseeInfo?.end_date) ? true : false}
                        type="date" name="endDate" value={newUnit?.endDate} onChange={onChange}
                    />
                </div>
            </div>

            {/* Renew Lease Button */}
            {/* <div className="mt-5">
          <div className='flex w-36 items-start justify-start gap-2 cursor-pointer' >
            <AssignmentIcon fontSize='small' color='info' />
            <p style={Styles.cancelBtn}>
              Renew the Lease
            </p>
          </div>
        </div> */}

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
                title={'Switch Lessee'} newUnit={newUnit} setNewUnit={setNewUnit} setIsEmptyToInit={setIsEmptyToInit} />

        </div>
    )
}

export default LeaseInformation;