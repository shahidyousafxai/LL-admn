// Library Imports
import React from 'react'

// Local Imports
import { SearchBar } from "../../../../../../components/SearchBar/SearchBar"
import AmenityTable from '../../../../../../components/Tables/Table';
import { InsideSpinner } from '../../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../../components/serverError';

const AmenityTypesUI = ({
    selectionIds, setSelectionIds, amenityTypesColumnData, amenityTypesColumnExtensionsData,
    amenityTypesRowData, dataProviders, onChangeSearch, onAmenitySearch,
    onClear, searchText, loading, networkError, reCallListing
}) => {

    return (
        <div className="main-container px-6 pt-3">

            {/* Search Bar Row */}
            <div className="flex flex-row justify-between align-items-center py-3 gap-5">
                <SearchBar
                    disabled={selectionIds.length > 0 ? true : false}
                    onSearch={() => onAmenitySearch()} onClear={() => onClear()}
                    onChange={onChangeSearch} value={searchText}
                />
            </div>

            {/* Amenities Table */}
            {
                loading ?
                    <InsideSpinner />
                    :
                    networkError ?
                        <ServerError reCallListing={reCallListing} />
                        :
                        <AmenityTable
                            rows={amenityTypesRowData}
                            columns={amenityTypesColumnData}
                            tableColumnExtensions={amenityTypesColumnExtensionsData}
                            dataProviders={dataProviders}
                            selectionIds={selectionIds}
                            setSelectionIds={setSelectionIds}
                        // setDeleteAlert={setDeleteAlert}
                        // isOpen={isOpen}
                        // setIsopen={setIsopen}
                        // selectedUserFacilities={selectedUserFacilities}
                        // setSelectedUserFacilities={setSelectedUserFacilities}
                        // setIsMultiDelete={setIsMultiDelete}
                        />
            }

        </div>
    )
};

export default AmenityTypesUI;

