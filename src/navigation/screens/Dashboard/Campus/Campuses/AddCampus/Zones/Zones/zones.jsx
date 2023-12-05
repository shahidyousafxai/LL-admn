// Library Imports
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Local Imports
import ZonesUI from './zonesUI'
import { Action } from '../../../../../../components/Tables/utils';
import {
  zonesColumnData, zonesColumnExtensionsData
} from '../../../../../../components/Tables/dummyData';
import AddZone from '../AddZone';
import DeleteZone from '../DeleteZone';
import ApiController from '../../../../../../utils/network/api';


const Zones = () => {

  //************************* Zone Main Screen Start *******************************//

  //***** States *****//
  const [ColumnSetting1] = useState(["action"]);
  const [selectionIds, setSelectionIds] = useState([]);
  const [zones, setZones] = useState([]);
  const [zonesListLoading, setZonesLoading] = useState(true)

  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    getZonesListing()
  }, [])

  //***** Methods *****//
  const dataProviders = [
    {
      columnName: ColumnSetting1,
      func: (restProps) => Action(restProps, onActionClick)
    },
  ];
  // Action Click From Table
  const onActionClick = (type, zoneData) => {

    if (type === 'edit') {
      setNewZone({
        id: zoneData.id,
        title: 'Edit Zone',
        name: zoneData.name,
        state: zoneData.stateId,
        city: zoneData.cityId
      })
      toggleAddZoneModal(true)
    } else {
      setDeleteZone(zoneData)
      toggledeleteZoneModal(true)
    }
  }

  const getZonesListing = (name) => {

    setZonesLoading(true);

    ApiController.fetchZonesCall(name, (response) => {
      if (response?.success) {
        // sort response array
        const sortArray = response.data.sort(function (a, b) {
          return a.id - b.id || a.name.localeCompare(b.name);
        })
        // create object to render table
        let data = sortArray.map(item => {
          let obj = {
            id: item.id,
            name: item.name,
            city: item.city.name,
            cityId: item.city.id,
            state: item.state.name,
            stateId: item.state.id
          }
          return obj;
        })
        setZones(data)
        setZonesLoading(false);
      } else {
        setZonesLoading(false);
        setNetworkError(true);
      }
    })

  }
  // Again Call For Listing
  const reCallListing = () => {
    setNetworkError(false);

    getZonesListing();
  }

  //************************* Zone Main Screen End *******************************//

  //************************* Search Bar Start *******************************//

  //***** States *****//
  const [searchText, setSearchText] = useState('')

  //***** Methods *****//

  // Search User Method
  const onChangeSearch = (e) => {
    if (e.target.value !== '') {
      setSearchText(e.target.value)
    } else {
      setSearchText('')
      getZonesListing();
    }
  }
  const onZoneSearch = () => {
    if (searchText) {
      getZonesListing(searchText);
    }
  }
  // onSearch Clear
  const onClear = () => {
    setSearchText('')
    getZonesListing();

  }
  //************************* Search Bar End *******************************//

  //************************* Add / Edit Zone Start *******************************//

  // initial Values
  const initZone = {
    newZone: {
      id: '',
      title: '',
      name: '',
      state: '',
      city: ''
    },
    zoneError: {
      name: '',
      msg: ''
    }
  }

  //***** States *****//
  const statesWithCities = useSelector((state) => state?.statesAndCities?.statesAndCities)

  const [addZoneModal, toggleAddZoneModal] = useState(false)
  const [zoneLoading, setZoneLoading] = useState(false)

  const [newZoneError, setNewZoneError] = useState(initZone.zoneError)
  const [newZone, setNewZone] = useState(initZone.newZone)

  //***** Methods *****//
  const addZoneClose = () => {
    setNewZone(initZone.newZone)
    setNewZoneError(initZone.zoneError)
    setZoneLoading(false)
    toggleAddZoneModal(false);
  }

  // Add New User Input OnChange
  const handleNewZoneOnChange = (e) => {

    if (e.target.name === 'state') {
      setNewZone({
        ...newZone,
        city: '',
        [e.target.name]: e.target.value,
      });
    } else {
      setNewZone({
        ...newZone,
        [e.target.name]: e.target.value,
      });
    }
  }

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
  const addZonePayload = () => {
    let payload = {
      name: newZone.name,
      zone_city: newZone.city
    }
    return payload;
  }

  //************************* Add / Edit Zone End *******************************//

  //************************* Delete Zone Start *******************************//

  //***** States *****//
  const [deleteZoneModal, toggledeleteZoneModal] = useState(false)
  const [deleteZoneLoading, setDeleteZoneLoading] = useState(false)

  const [deleteZone, setDeleteZone] = useState({})


  //***** Methods *****//

  const onDelete = (id) => {
    setDeleteZoneLoading(true)

    ApiController.deleteZoneCall(id, (response) => {
      if (response.success) {
        setDeleteZone({})
        getZonesListing();
        setDeleteZoneLoading(false)
        toggledeleteZoneModal(false)
      }
      else {
        setDeleteZoneLoading(false)
      }
    })

  }

  //************************* Delete Zone End *******************************//


  return (<>
    <ZonesUI
      // Selestion State
      selectionIds={selectionIds}
      setSelectionIds={setSelectionIds}

      // Table Data
      zonesColumnData={zonesColumnData}
      zonesColumnExtensionsData={zonesColumnExtensionsData}
      zonesRowData={zones.length > 0 ? zones : []}

      // Table Methods
      dataProviders={dataProviders}

      // SearchBar States
      searchText={searchText}
      // SearchBar Method
      onChangeSearch={onChangeSearch}
      onZoneSearch={onZoneSearch}
      onClear={onClear}

      // To Open Add Zone Modal
      toggleAddZoneModal={() => toggleAddZoneModal(true)}

      // Loading to show view after API Call
      loading={zonesListLoading}
      networkError={networkError}
      reCallListing={reCallListing}
    />

    {/************************* Modals *******************************/}

    {/* Add/Edit Zone */}
    <AddZone open={addZoneModal} close={addZoneClose} newZone={newZone}
      onChange={handleNewZoneOnChange} loading={zoneLoading}
      error={newZoneError} onSave={addNewZoneSave} states={statesWithCities} />

    {/* Delete Zone */}
    <DeleteZone open={deleteZoneModal} close={() => toggledeleteZoneModal(false)}
      data={deleteZone} onDelete={onDelete} loading={deleteZoneLoading} />

  </>)
}

export default Zones
