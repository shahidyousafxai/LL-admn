// Library Imports
import React, { useEffect, useState } from 'react'

// Local Imports
import CheckBox from '../../../../../../components/checkBox'
import { Styles } from "../../../../../../utils/style/GlobalStyles";
import { white, yellow } from '../../../../../../utils/style/GlobalVariables';
import { camalize } from '../../../../../../utils/validations/localValidations';
import ApiController from '../../../../../../utils/network/api';
import { InsideSpinner } from '../../../../../../components/Spinner/Spinner';

const Amenities = ({ newUnit, setNewUnit }) => {
    const [amenities, setAmenities] = useState([])
    const [amenityListLoading, setAmenityListLoading] = useState(false)

    useEffect(() => {
        getAmenityListing()
    }, [])


    const onAmenitySelect = (item) => {
        setNewUnit(() => {
            const selectedAmenities = newUnit.amenities;
            const index = selectedAmenities.indexOf(item.id);
            if (index > -1) {
                selectedAmenities.splice(index, 1);
            } else {
                selectedAmenities?.length > 0 ? selectedAmenities?.push(item.id) : selectedAmenities[0] = item.id;
            }
            return {
                ...newUnit,
                amenities: selectedAmenities
            }
        })
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
            }
        })
    }


    return (
        <div className='-mt-4 px-3 h-[480px] overflow-y-scroll'>
            <>
                {amenityListLoading ? (
                    <InsideSpinner />
                ) : (
                    <>
                        {amenities?.length > 0 ? (
                            <>
                                <p className='mt-4 mb-1' style={Styles.headingTextWhite}>
                                    Choose the Appropriate Amenities:
                                </p>
                                <div className='!h-80 overflow-y-scroll pl-2'>
                                    {amenities?.map((item, index) => {
                                        return (
                                            <>
                                                {(index % 2) !== 0 ? null : (
                                                    <div key={index} className="w-1/2 float-left">
                                                        <CheckBox
                                                            color={white}
                                                            checked={Boolean(newUnit?.amenities?.find((amenity) => amenity === item.id))}
                                                            onChange={() => onAmenitySelect(item)}
                                                            label={camalize(item.name)}
                                                            amenities={amenities}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })}

                                    {amenities?.map((item, index) => {
                                        return (
                                            <>
                                                {(index % 2) === 0 ? null : (
                                                    <div key={index} className="w-1/2 float-left">
                                                        <CheckBox
                                                            color={white}
                                                            checked={Boolean(newUnit?.amenities?.find((amenity) => amenity === item.id))}
                                                            onChange={() => onAmenitySelect(item)}
                                                            label={camalize(item.name)}
                                                            amenities={amenities}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className='flex justify-center mt-[100px]'>
                                <h4 className='mt-4 mb-1 text-xl text-white'>
                                    <span>
                                        No Amenities Found!
                                    </span>
                                </h4>
                            </div>
                        )}
                    </>
                )}
            </>
        </div>
    )
}
export default Amenities
