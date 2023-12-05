// Library Imports
import React, { useState, useEffect } from 'react'
import { SearchBar } from '../../../../../../../components/SearchBar/SearchBar';

// Local Imports
import CheckBox from '../../../../../../../components/checkBox.js'
import { Styles } from "../../../../../../../utils/style/GlobalStyles";
import { white } from '../../../../../../../utils/style/GlobalVariables';
import ApiController from '../../../../../../../utils/network/api';
import { camalize } from '../../../../../../../utils/validations/localValidations';

const Amenities = ({ newCampus, setnewCampus }) => {

    useEffect(() => {
        getAmenitiesListing()
    }, [])

    //***** States *****//
    const [amenities, setAmenities] = useState([])
    const [searchedAmenities, setSearchedAmenities] = useState([])
    const [searchText, setSearchText] = useState('')


    //***** Methods *****//
    const getAmenitiesListing = (name) => {

        ApiController.fetchAmenityCall(name, (response) => {
            if (response?.success) {
                // sort response array
                const sortArray = response.data.sort(function (a, b) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                })
                setAmenities(sortArray)
            } else {
                setAmenities([])
            }
        })

    }

    const onSearchChange = (e) => {
        setSearchText(e.target.value)

        let searchedArray = [];
        // eslint-disable-next-line
        amenities?.map(item => {
            if (item?.name?.toLowerCase().includes(e.target.value.toLowerCase())) {
                return searchedArray.length > 0 ? searchedArray.push(item) : searchedArray[0] = item;
            }
        })
        setSearchedAmenities(searchedArray)
    }

    const onAmenitySelect = (amenity) => {
        let selectedAmenities = newCampus?.amenities;
        let existed = newCampus?.amenities?.includes(amenity.id)

        if (existed) {
            const index = selectedAmenities.indexOf(amenity.id);
            if (index > -1) {
                selectedAmenities.splice(index, 1);
            }
            setnewCampus({
                ...newCampus,
                amenities: selectedAmenities
            })
        } else {
            selectedAmenities?.length > 0 ? selectedAmenities?.push(amenity.id) : selectedAmenities[0] = amenity.id;
            setnewCampus({
                ...newCampus,
                amenities: selectedAmenities
            })
        }
    }


    return (
        <>
            {/* Search Bar */}
            <SearchBar
                onClear={() => { setSearchText(''); setSearchedAmenities([]) }}
                value={searchText}
                onChange={onSearchChange}
            />

            {/* Amenities */}
            <p className='mt-4 mb-1' style={Styles.headingTextWhite}>
                Choose the Appropriate Amenities:
            </p>
            <div className='!h-80 overflow-y-scroll pl-2'>

                {searchedAmenities.length > 0 ? searchedAmenities?.map((item, index) => {
                    return (<>
                        {(index % 2) !== 0 ? null : (
                            <div key={index} className="w-1/2 float-left">
                                <CheckBox
                                    color={white}
                                    checked={newCampus?.amenities?.includes(item.id)}
                                    onChange={() => onAmenitySelect(item)}
                                    label={camalize(item.name)}
                                    amenities
                                />
                            </div>
                        )}
                    </>);
                }) : amenities?.map((item, index) => {
                    return (<>
                        {(index % 2) !== 0 ? null : (
                            <div key={index} className="w-1/2 float-left">
                                <CheckBox
                                    color={white}
                                    checked={newCampus?.amenities?.includes(item.id)}
                                    onChange={() => onAmenitySelect(item)}
                                    label={camalize(item.name)}
                                    amenities
                                />
                            </div>
                        )}
                    </>);
                })}

                {searchedAmenities.length > 0 ? searchedAmenities?.map((item, index) => {
                    return (<>
                        {(index % 2) === 0 ? null : (
                            <div key={index} className="w-1/2 float-left">
                                <CheckBox
                                    color={white}
                                    checked={newCampus?.amenities?.includes(item.id)}
                                    onChange={() => onAmenitySelect(item)}
                                    label={camalize(item.name)}
                                    amenities
                                />
                            </div>
                        )}
                    </>);
                }) : amenities?.map((item, index) => {
                    return (<>
                        {(index % 2) === 0 ? null : (
                            <div key={index} className="w-1/2 float-left">
                                <CheckBox
                                    color={white}
                                    checked={newCampus?.amenities?.includes(item.id)}
                                    onChange={() => onAmenitySelect(item)}
                                    label={camalize(item.name)}
                                    amenities
                                />
                            </div>
                        )}
                    </>);
                })}

            </div>
        </>
    )
}

export default Amenities
