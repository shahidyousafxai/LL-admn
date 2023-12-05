// Library Imports
import React from 'react'
import { Add } from "@mui/icons-material";

// Local Imports
import BreadCrumb from '../../../../../../components/BreadCrumb';
import Button from '../../../../../../components/button';
import { gray, primaryColor, secondaryColor, yellow } from '../../../../../../utils/style/GlobalVariables';
import { SearchBar } from "../../../../../../components/SearchBar/SearchBar"
import ZoneTable from '../../../../../../components/Tables/Table';
import { InsideSpinner } from '../../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../../components/serverError';

const ZonesUI = ({
    selectionIds, setSelectionIds, zonesColumnData, zonesColumnExtensionsData,
    zonesRowData, dataProviders, toggleAddZoneModal, onChangeSearch, onZoneSearch,
    onClear, searchText, loading, networkError, reCallListing
}) => {

    return (
        <div className="main-container px-6 pt-3">

            {/* Header BreadCrumb with Buttom Row */}
            <div className="flex flex-row justify-between items-center">
                <div>
                    <BreadCrumb
                        routes={[{ name: "Unit", route: "/unit/zones", },
                        { name: "Zones", color: true }]}
                    />
                    <div style={{ fontFamily: 'Inter-Medium', fontSize: 15 }} className='text-white pt-1'>Zones</div>
                </div>
                <Button
                    startIcon={<Add fontSize='small' />}
                    height={38}
                    style={{
                        backgroundColor: loading ? secondaryColor : yellow,
                        color: loading ? gray : primaryColor,
                        fontFamily: 'Inter-Medium',
                        fontSize: 13,
                        textTransform: 'none',
                        width: '140px',
                        borderRadius: 8
                    }}
                    onClick={() => toggleAddZoneModal()}
                    component="span"
                    variant="contained"
                    disabled={loading}
                >
                    New Zone
                </Button>
            </div>

            {/* Search Bar Row */}
            <div className="d-flex flex-row justify-between align-items-center py-5">
                <SearchBar
                    disabled={selectionIds.length > 0 ? true : false}
                    onSearch={() => onZoneSearch()} onClear={() => onClear()}
                    onChange={onChangeSearch} value={searchText}
                />
            </div>

            {/* Zone Table */}
            {
                loading ?
                    <InsideSpinner />
                    :
                    networkError ?
                        <ServerError reCallListing={reCallListing} />
                        :
                        <ZoneTable
                            rows={zonesRowData}
                            columns={zonesColumnData}
                            tableColumnExtensions={zonesColumnExtensionsData}
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

export default ZonesUI;

