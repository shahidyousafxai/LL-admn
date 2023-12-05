// Library Imports
import React, { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Local Imports
import Button from '../../../../../../../components/button.js'
import CheckBox from '../../../../../../../components/checkBox.js'
import TextField from '../../../../../../../components/inputField.js';
import { Styles } from "../../../../../../../utils/style/GlobalStyles";
import { secondaryColor, white, yellow } from "../../../../../../../utils/style/GlobalVariables";
import SelectDropdown from '../../../../../../../components/selectDropdown.js';


const Details = ({ newCampus, setnewCampus, onChange, error, phoneError }) => {
    const startDay = [
        {
            title: "Monday",
            value: "1"
        },
        {
            title: "Tuesday",
            value: "2"
        },
        {
            title: "Wednesday",
            value: "3"
        },
        {
            title: "Thursday",
            value: "4"
        },
        {
            title: "Friday",
            value: "5"
        },
        {
            title: "Saturday",
            value: "6"
        },
        {
            title: "Sunday",
            value: "7"
        },
    ];
    const endDay = [
        {
            title: "Monday",
            value: "1"
        },
        {
            title: "Tuesday",
            value: "2"
        },
        {
            title: "Wednesday",
            value: "3"
        },
        {
            title: "Thursday",
            value: "4"
        },
        {
            title: "Friday",
            value: "5"
        },
        {
            title: "Saturday",
            value: "6"
        },
        {
            title: "Sunday",
            value: "7"
        },
    ];

    const startingHour = [
        {
            title: "1:00 AM",
            value: "1"
        },
        {
            title: "2:00 AM",
            value: "2"
        },
        {
            title: "3:00 AM",
            value: "3"
        },
        {
            title: "4:00 AM",
            value: "4"
        },
        {
            title: "5:00 AM",
            value: "5"
        },
        {
            title: "6:00 AM",
            value: "6"
        },
        {
            title: "7:00 AM",
            value: "7"
        },
        {
            title: "8:00 AM",
            value: "8"
        },
        {
            title: "9:00 AM",
            value: "9"
        },
        {
            title: "10:00 AM",
            value: "10"
        },
        {
            title: "11:00 AM",
            value: "11"
        },
        {
            title: "12:00 AM",
            value: "12"
        },
        {
            title: "1:00 PM",
            value: "13"
        },
        {
            title: "2:00 PM",
            value: "14"
        },
        {
            title: "3:00 PM",
            value: "15"
        },
        {
            title: "4:00 PM",
            value: "16"
        },
        {
            title: "5:00 PM",
            value: "17"
        },
        {
            title: "6:00 PM",
            value: "18"
        },
        {
            title: "7:00 PM",
            value: "19"
        },
        {
            title: "8:00 PM",
            value: "20"
        },
        {
            title: "9:00 PM",
            value: "21"
        },
        {
            title: "10:00 PM",
            value: "22"
        },
        {
            title: "11:00 PM",
            value: "23"
        },
        {
            title: "12:00 PM",
            value: "24"
        },
    ];

    const endingHour = [
        {
            title: "1:00 AM",
            value: "1"
        },
        {
            title: "2:00 AM",
            value: "2"
        },
        {
            title: "3:00 AM",
            value: "3"
        },
        {
            title: "4:00 AM",
            value: "4"
        },
        {
            title: "5:00 AM",
            value: "5"
        },
        {
            title: "6:00 AM",
            value: "6"
        },
        {
            title: "7:00 AM",
            value: "7"
        },
        {
            title: "8:00 AM",
            value: "8"
        },
        {
            title: "9:00 AM",
            value: "9"
        },
        {
            title: "10:00 AM",
            value: "10"
        },
        {
            title: "11:00 AM",
            value: "11"
        },
        {
            title: "12:00 AM",
            value: "12"
        },
        {
            title: "1:00 PM",
            value: "13"
        },
        {
            title: "2:00 PM",
            value: "14"
        },
        {
            title: "3:00 PM",
            value: "15"
        },
        {
            title: "4:00 PM",
            value: "16"
        },
        {
            title: "5:00 PM",
            value: "17"
        },
        {
            title: "6:00 PM",
            value: "18"
        },
        {
            title: "7:00 PM",
            value: "19"
        },
        {
            title: "8:00 PM",
            value: "20"
        },
        {
            title: "9:00 PM",
            value: "21"
        },
        {
            title: "10:00 PM",
            value: "22"
        },
        {
            title: "11:00 PM",
            value: "23"
        },
        {
            title: "12:00 PM",
            value: "24"
        },
    ];

    const handleSelection = (array, value) => {
        const foundItem = array.find((item) => item.value === value);
        return foundItem;
    };


    return (
        <section className='px-1 max-h-[450px] overflow-y-auto'>
            {/* Map Upload Section */}
            <div className="flex flex-row">
                <div
                    style={{ backgroundColor: secondaryColor }}
                    className="w-40 rounded-lg justify-center items-center flex"
                >
                    <CloudUploadIcon fontSize='large' color="secondary" />
                </div>
                <div className="px-2 py-1">

                    <p style={Styles.headingTextWhite}>
                        Upload Map
                    </p>

                    <div className="flex flex-row items-center py-2">
                        <Button
                            style={{
                                borderColor: yellow,
                                color: yellow,
                                fontFamily: 'Inter-Medium',
                                fontSize: 13,
                                textTransform: 'none',
                                width: '120px',
                                borderRadius: 8
                            }}
                            component="span"
                            variant="outlined"
                        // onClick={handleBack}
                        >
                            Choose File…
                        </Button>

                        <p className="ml-3" style={Styles.smallTextWhite}>
                            No file chosen.
                        </p>
                    </div>

                    <p style={Styles.sideBarEmailText}>
                        The maximum file size allowed is 200KB.
                    </p>
                </div>

            </div>

            {/* Inputs Section */}
            <form>
                {/* Name & Street Row */}
                <div className="flex flex-row gap-5">
                    <div className="w-1/2">
                        <TextField label={'Name'} type="text" name="name" value={newCampus?.name} onChange={onChange}
                            error={error.name === 'name' && error} />
                    </div>
                    <div className="w-1/2">
                        <TextField label={'Street'} type="text" name="street" value={newCampus?.street} onChange={onChange} />
                    </div>
                </div>

                {/* PostalCode & Phone */}
                <div className="flex flex-row gap-5">
                    <div className="w-1/2">
                        <TextField label={'Postal Code'} type="text" name="postalCode" value={newCampus?.postalCode} onChange={onChange} />
                    </div>
                    <div className="w-1/2">
                        <TextField
                            label={"Phone"}
                            type="tel"
                            name="phone"
                            value={newCampus?.phone}
                            onChange={onChange}
                            error={phoneError}
                        />
                    </div>
                </div>

                {/* Week Start Day & Week End Day */}
                <div className="flex flex-row gap-5">
                    <div className="w-1/2">
                        <SelectDropdown
                            label="Starting Day"
                            list={startDay}
                            className="mt-5"
                            value={handleSelection(startDay, newCampus?.startDay)}
                            placeholder={'Select'}
                            onClick={(value) => setnewCampus({ ...newCampus, startDay: value.value })}
                        />
                    </div>
                    <div className="w-1/2">
                        <SelectDropdown
                            label="Ending Day"
                            list={endDay}
                            className="mt-5"
                            value={handleSelection(endDay, newCampus?.endDay)}
                            placeholder={'Select'}
                            onClick={(value) => setnewCampus({ ...newCampus, endDay: value.value })}
                        />
                    </div>
                </div>

                {/* Starting Hour & Ending Hour */}
                <div className="flex flex-row gap-5">
                    <div className="w-1/2">
                        <SelectDropdown
                            label="Starting Hour"
                            list={startingHour}
                            className="mt-5"
                            value={handleSelection(startingHour, newCampus?.startingHour)}
                            placeholder={'Select'}
                            onClick={(value) => setnewCampus({ ...newCampus, startingHour: value.value })}
                        />
                    </div>
                    <div className="w-1/2">
                        <SelectDropdown
                            label="Ending Hour"
                            list={endingHour}
                            className="mt-5"
                            value={handleSelection(endingHour, newCampus?.endingHour)}
                            placeholder={'Select'}
                            onClick={(value) => setnewCampus({ ...newCampus, endingHour: value.value })}
                        />
                    </div>
                </div>

                {/* Longitude & Latitude */}
                <div className="flex flex-row gap-5">
                    <div className="w-1/2">
                        <TextField label={'Longitude'} type="text" name="longitude" value={newCampus?.longitude} onChange={onChange} />
                    </div>
                    <div className="w-1/2">
                        <TextField label={'Latitude'} type="text" name="latitude" value={newCampus?.latitude} onChange={onChange} />
                    </div>
                </div>


                {/* Maintenance Fee & Number of Units*/}
                <div className="flex flex-row gap-5">
                    <div className="w-1/2">
                        <TextField label={'Maintenance Fee'} type="text" name="maintenanceFee" value={newCampus?.maintenanceFee} onChange={onChange} />
                    </div>
                    <div className="w-1/2">
                        <TextField label={'Number of Units'} type="text" name="numOfUnits" value={newCampus?.numOfUnits} onChange={onChange} />
                    </div>
                </div>

                {/* Base Station IP and Status */}
                <div className="flex flex-row gap-5 mb-5">
                    <div className="w-1/2">
                        <TextField label={'Base Station IP'} type="text" name="baseStationIP" value={newCampus?.baseStationIP} onChange={onChange} />
                    </div>
                    <div className="w-1/2 mt-5">
                            <p className="mt-4 -mb-1" style={Styles.smallTextWhite}>
                                Status
                            </p>
                            <CheckBox
                                color={white}
                                checked={newCampus?.status}
                                onChange={() => setnewCampus({ ...newCampus, status: !newCampus?.status })}
                                label="Active"
                            />
                    </div>
                </div>


            </form>
        </section>
    )
}

export default Details
