import React from 'react';
import Add from '@mui/icons-material/Add';
// Local Imports
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../components/serverError';
import { SearchBar } from '../../../../../components/SearchBar/SearchBar';
import Button from '../../../../../components/button';
import CampusTable from '../../../../../components/Tables/Table';
import { Styles } from '../../../../../utils/style/GlobalStyles';

const PageCampusesUI = ({
  selectionIds,
  setSelectionIds,
  campusesColumnData,
  campusesColumnExtensionsData,
  dataProviders,
  campusesRowData,
  loading,
  onChangeSearch,
  onCampusSearch,
  onClear,
  searchText,
  networkError,
  navToAddCampus,
  campusPageListLoading,
  reCallListing,
}) => {
  const loadingStatus = loading || campusPageListLoading;
  return (
    <div className='main-container px-6 pt-3'>
      {/* Search Bar Row */}
      <div className='flex flex-row justify-between align-items-center py-3 gap-5'>
        <div className='flex-1'>
          <SearchBar
            disabled={selectionIds.length > 0 ? true : false}
            onSearch={() => onCampusSearch()}
            onClear={() => onClear()}
            onChange={onChangeSearch}
            value={searchText}
          />
        </div>
        <Button
          startIcon={
            <Add
              fontSize='small'
              color={`${loadingStatus ? 'secondary' : 'primary'}`}
            />
          }
          className={`text-sm !normal-case flex-2  ${
            loadingStatus ? 'text-gray-400' : 'text-black'
          }`}
          height={37}
          style={loadingStatus ? Styles?.disableBtn : Styles.activeBtn}
          component='span'
          variant='contained'
          disabled={loadingStatus}
          onClick={navToAddCampus}
        >
          <p
            style={
              loadingStatus ? Styles?.disableBtnText : Styles.activeBtnText
            }
          >
            {'New Campus Page'}
          </p>
        </Button>
      </div>

      {/* Campus Table */}
      {loadingStatus ? (
        <InsideSpinner />
      ) : networkError ? (
        <ServerError reCallListing={reCallListing} />
      ) : (
        <CampusTable
          rows={campusesRowData}
          columns={campusesColumnData}
          tableColumnExtensions={campusesColumnExtensionsData}
          dataProviders={dataProviders}
          selectionIds={selectionIds}
          setSelectionIds={setSelectionIds}
        />
      )}
    </div>
  );
};

export default PageCampusesUI;
