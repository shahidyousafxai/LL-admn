// Library Imports
import React, { useState, useEffect } from 'react'
import { Add } from "@mui/icons-material";
import { useSelector } from 'react-redux'

// Local Imports
import { gray } from '../../../../../../../utils/style/GlobalVariables.js'
import SelectDropdown from '../../../../../../../components/selectDropdown.js'
import Button from '../../../../../../../components/button.js'
import AddZone from '../Zones/AddZone.jsx';
import ApiController from '../../../../../../../utils/network/api.js';


const Zones = ({
    newCampus, setnewCampus
}) => {

    useEffect(() => {
        getZonesListing()
    }, [])

    //************************* Add / Edit Zone Start *******************************//


    // initial Values
    const initZone = {
        newZone: {
            id: '',
            title: '',
            name: '',
            state: '',
            stateId: '',
            city: '',
            cityId: ''
        },
        zoneError: {
            name: '',
            msg: ''
        }
    }
    //***** States *****//
    const [addZoneModal, toggleAddZoneModal] = useState(false)
    const [zoneLoading, setZoneLoading] = useState(false)
    const [newZoneError, setNewZoneError] = useState(initZone.zoneError)
    const [newZone, setNewZone] = useState(initZone.newZone)
    // Store All Zones
    const [zones, setZones] = useState([])
    const [cities, setCities] = useState([])

    const states = useSelector((state) => state?.states?.states)


    //***** Methods *****//

    // Fetch Cities According To State
    useEffect(() => {

        ApiController.fetchCitiesCall({ id: newZone.stateId }, (response) => {
            if (response.success) {
                if (response.data) {
                    setCities(response.data)
                }
            }
        })

    }, [newZone.stateId])

    // Get Zones
    const getZonesListing = (name) => {

        ApiController.fetchZonesCall(name, (response) => {
            if (response?.success) {
                // sort response array
                const sortArray = response.data.sort(function (a, b) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                })
                setZones(sortArray)
            } else {
                setZones([])
            }
        })

    }

    const addZoneClose = () => {
        setNewZone(initZone.newZone)
        setNewZoneError(initZone.zoneError)
        setZoneLoading(false)
        toggleAddZoneModal(false);
    }

    // Add New User Input OnChange
    const handleNewZoneOnChange = (e, name) => {

        if (name === 'state') {
            setNewZone({
                ...newZone,
                city: '',
                state: e.name,
                stateId: e.id
            });
        } else if (name === 'city') {
            setNewZone({
                ...newZone,
                city: e.name,
                cityId: e.id
            });
        } else if (e.target.name === "name") {
            e.target.value = e.target.value.replace(/[^\d a-z A-Z]/g, "");
            setNewZone({
                ...newZone,
                [e.target.name]: e.target.value,
            });
        } else {
            setNewZone({
                ...newZone,
                [e.target.name]: e.target.value,
            });
        }
    }

    // Button Press
    const addNewZoneSave = () => {
        setZoneLoading(true)

        if (newZone.title === "Edit Zone") {
            editZone();
        } else {
            addZone();
        }
    }

    // Add New Zone
    const addZone = () => {
        ApiController.addNewZoneCall(addZonePayload(), (response) => {
            if (response.success) {
                setNewZone(initZone.newZone)
                setNewZoneError(initZone.zoneError)
                setZoneLoading(false)
                toggleAddZoneModal(false);
                getZonesListing();
            }
            else {
                if (("zone_name" in response?.data[0])) {
                    setNewZoneError({
                        name: 'name',
                        msg: response?.data[0].zone_name
                    });
                    setZoneLoading(false)
                } else if (("name" in response?.data[0])) {
                    setNewZoneError({
                        name: 'name',
                        msg: response?.data[0].name
                    });
                    setZoneLoading(false)
                }
            }
        })
    }
    // Edit Zone
    const editZone = () => {
        ApiController.updateZoneCall(newZone.id, addZonePayload(), (response) => {
            if (response.success) {
                setNewZone(initZone.newZone)
                setNewZoneError(initZone.zoneError)
                setZoneLoading(false)
                toggleAddZoneModal(false);
                getZonesListing();
            }
            else {
                if (("zone_name" in response?.data[0])) {
                    setNewZoneError({
                        name: 'name',
                        msg: response?.data[0].zone_name
                    });
                    setZoneLoading(false)
                } else if (("name" in response?.data[0])) {
                    setNewZoneError({
                        name: 'name',
                        msg: response?.data[0].name
                    });
                    setZoneLoading(false)
                }
            }
        })
    }
    // Payload
    const addZonePayload = () => {
        let payload = {
            name: newZone.name,
            zone_city: newZone.cityId
        }
        return payload;
    }



    return (
        <>
            <SelectDropdown
                width={580}
                list={zones}
                className="-ml-1 mt-5"
                value={newCampus.zone}
                placeholder={'Select'}
                onClick={(value) => setnewCampus({ ...newCampus, zone: value })}
            />

            <Button
                startIcon={<Add fontSize='small' />}
                style={{
                    color: gray,
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    textTransform: 'none',
                }}
                className="!-ml-1 top-2"
                onClick={() => toggleAddZoneModal(true)}
                variant="text"
            >
                Add New Zone
            </Button>

            {/* Add/Edit Zone */}
            <AddZone open={addZoneModal} close={addZoneClose} newZone={newZone}
                onChange={handleNewZoneOnChange} loading={zoneLoading} cities={cities}
                error={newZoneError} onSave={addNewZoneSave} states={states} />
        </>
    )
}

export default Zones
