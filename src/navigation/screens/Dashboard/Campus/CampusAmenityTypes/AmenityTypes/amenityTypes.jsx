// Library Imports
import React, { useState, useEffect } from 'react'

// Local Imports
import AmenityTypesUI from './amenityTypesUI'
import { Action } from '../../../../../../components/Tables/utils';
import {
  amenityTypesColumnData, amenityTypesColumnExtensionsData
} from '../../../../../../components/Tables/dummyData';
import AddAmenity from '../AddAmenity';
import DeleteAmenity from '../DeleteAmenity';
import ApiController from '../../../../../../utils/network/api';


const AmenityTypes = ({ addAmenityModal, toggleAddAmenityModal }) => {

  //************************* Amemity Main Screen Start *******************************//

  //***** States *****//
  const [selectionIds, setSelectionIds] = useState([]);
  const [ColumnSetting1] = useState(["action"]);
  const [amenities, setAmenities] = useState([])
  const [amenityListLoading, setAmenityListLoading] = useState(true)

  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    getAmenityListing()
  }, [])

  //***** Methods *****//
  const dataProviders = [
    {
      columnName: ColumnSetting1,
      func: (restProps) => Action(restProps, onActionClick)
    },
  ];
  // Action Click From Table
  const onActionClick = (type, userData) => {

    if (type === 'edit') {
      setNewAmenity({
        id: userData.id,
        title: 'Edit Amenity Type',
        name: userData.name,
        desc: userData.description,
        oldName: userData.name,
        oldDesc: userData.description
      })
      toggleAddAmenityModal(true)
    } else {
      setDeleteAmenity(userData)
      toggledeleteAmenityModal(true)
    }
  }

  const getAmenityListing = (name) => {

    setAmenityListLoading(true);

    ApiController.fetchAmenityCall(name, (response) => {
      if (response?.success) {
        const sortArray = response.data.sort(function (a, b) {
          return a.id - b.id || a.name.localeCompare(b.name);
        })
        setAmenities(sortArray)
        setAmenityListLoading(false);
      } else {
        setAmenityListLoading(false);
        setNetworkError(true);
      }
    })

  }
  // Again Call For Listing
  const reCallListing = () => {
    setNetworkError(false);

    getAmenityListing();
  }

  //************************* Amemity Main Screen End *******************************//

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
      getAmenityListing();
    }
  }
  const onAmenitySearch = () => {
    if (searchText) {
      getAmenityListing(searchText);
    }
  }
  // onSearch Clear
  const onClear = () => {
    setSearchText('')
    getAmenityListing();

  }
  //************************* Search Bar End *******************************//

  //************************* Add / Update Amemity Start *******************************//

  // initial Values
  const initAmenity = {
    newAmenity: {
      id: '',
      title: '',
      name: '',
      desc: '',
      oldName: '',
      oldDesc: ''
    },
    amenityError: {
      name: '',
      msg: ''
    }
  }

  //***** States *****//
  // const [addAmenityModal, toggleAddAmenityModal] = useState(false)
  const [amenityLoading, setAmenityLoading] = useState(false)

  const [newAmenityError, setNewAmenityError] = useState(initAmenity.amenityError)
  const [newAmenity, setNewAmenity] = useState(initAmenity.newAmenity)

  //***** Methods *****//
  const addAmenityClose = () => {
    setNewAmenity(initAmenity.newAmenity)
    setNewAmenityError(initAmenity.amenityError)
    setAmenityLoading(false)
    toggleAddAmenityModal(false);
  }

  // Add New Amenity Input OnChange
  const handleNewAmenityOnChange = (e) => {
    setNewAmenity({
      ...newAmenity,
      [e.target.name]: e.target.value,
    });
  }

  const addNewAmenitySave = () => {
    setAmenityLoading(true)
    if (newAmenity.title === "Edit Amenity Type") {
      editAmenity();
    } else {
      addAmenity();
    }
  }
  // Add New Amenity
  const addAmenity = () => {
    ApiController.addNewAmenityCall(addAmenityPayload(), (response) => {
      if (response.success) {
        setNewAmenity(initAmenity.newAmenity)
        setNewAmenityError(initAmenity.amenityError)
        setAmenityLoading(false)
        toggleAddAmenityModal(false);
        getAmenityListing();
      }
      else {
        if (("name" in response?.data[0])) {
          setNewAmenityError({
            name: 'name',
            msg: response?.data[0].name
          });
          setAmenityLoading(false)
        }
      }
    })
  }
  // Edit Amenity
  const editAmenity = () => {
    ApiController.updateAmenityCall(newAmenity.id, addAmenityPayload(), (response) => {
      if (response.success) {
        setNewAmenity(initAmenity.newAmenity)
        setNewAmenityError(initAmenity.amenityError)
        setAmenityLoading(false)
        toggleAddAmenityModal(false);
        getAmenityListing();
      }
      else {
        if (("name" in response?.data[0])) {
          setNewAmenityError({
            name: 'name',
            msg: response?.data[0].name
          });
          setAmenityLoading(false)
        }
      }
    })
  }
  // Create Payload
  const addAmenityPayload = () => {
    let payload = {
      name: newAmenity.name,
      description: newAmenity.desc,
    }
    return payload;
  }
  //************************* Add / Update Amemity End *******************************//

  //************************* Delete Amemity Start *******************************//

  //***** States *****//
  const [deleteAmenityModal, toggledeleteAmenityModal] = useState(false)
  const [deleteAmenityLoading, setDeleteAmenityLoading] = useState(false)

  const [deleteAmenity, setDeleteAmenity] = useState({})


  //***** Methods *****//

  const onDelete = (id) => {
    setDeleteAmenityLoading(true)

    ApiController.deleteAmenityCall(id, (response) => {
      if (response.success) {
        setDeleteAmenity({})
        setDeleteAmenityLoading(false)
        toggledeleteAmenityModal(false)
        getAmenityListing();
      }
      else {
        setDeleteAmenityLoading(false)
      }
    })

  }

  //************************* Delete Amemity End *******************************//


  return (<>
    <AmenityTypesUI
      // Selestion State
      selectionIds={selectionIds}
      setSelectionIds={setSelectionIds}

      // Table Data
      amenityTypesColumnData={amenityTypesColumnData}
      amenityTypesColumnExtensionsData={amenityTypesColumnExtensionsData}
      amenityTypesRowData={amenities.length > 0 ? amenities : []}

      // Table Methods
      dataProviders={dataProviders}

      // SearchBar States
      searchText={searchText}
      // SearchBar Method
      onChangeSearch={onChangeSearch}
      onAmenitySearch={onAmenitySearch}
      onClear={onClear}

      // To Open Add Amenity Modal
      toggleAddAmenityModal={() => toggleAddAmenityModal(true)}

      // Loading to show view after API Call
      loading={amenityListLoading}
      networkError={networkError}
      reCallListing={reCallListing}
    />

    {/************************* Modals *******************************/}

    {/* Add/Edit Amenity */}
    <AddAmenity open={addAmenityModal} close={addAmenityClose} newAmenity={newAmenity}
      onChange={handleNewAmenityOnChange} loading={amenityLoading}
      error={newAmenityError} onSave={addNewAmenitySave} />

    {/* Delete Amenity */}
    <DeleteAmenity open={deleteAmenityModal} close={() => toggledeleteAmenityModal(false)}
      data={deleteAmenity} onDelete={onDelete} loading={deleteAmenityLoading} />

  </>)
}

export default AmenityTypes
