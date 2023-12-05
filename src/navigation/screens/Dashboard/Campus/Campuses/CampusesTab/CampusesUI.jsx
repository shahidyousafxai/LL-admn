// Library Imports
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

// Local Imports
import {
  gray,
  secondaryColor,
} from '../../../../../../utils/style/GlobalVariables';
import { SearchBar } from '../../../../../../components/SearchBar/SearchBar';
import CampusTable from '../../../../../../components/Tables/Table';
import { InsideSpinner } from '../../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../../components/serverError';
import { MyPopper } from '../../../../../../components/Filter/Filters';
import { Dropdown } from '../../../../../../components/Dropdown';

const CampusesUI = ({
  selectionIds,
  setSelectionIds,
  campusesColumnData,
  campusesColumnExtensionsData,
  campusesRowData,
  dataProviders,
  onChangeSearch,
  onCampusSearch,
  onClear,
  searchText,
  anchorEl,
  id,
  open,
  listOpen,
  handleClick,
  handleClose,
  clickAwayHandler,
  handleClickForParent,
  filters,
  onChangeFilter,
  onClearFilter,
  loading,
  networkError,
  reCallListing,
}) => {
  return (
    <div className='main-container px-6 pt-3'>
      {/* Search Bar Row */}
      <div className='flex flex-row justify-between align-items-center py-3 gap-5'>
        <div
          style={{
            background: secondaryColor,
            height: 38,
            width: '100px',
            cursor: !searchText ? 'pointer' : 'not-allowed',
          }}
          onClick={!searchText ? handleClick : null}
          className='flex justify-center text-sm flex-row align-items-center rounded-lg pointer p-2'
        >
          <FilterListIcon className='mr-2' fontSize='small' color='secondary' />
          <p style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: gray }}>
            Filter
          </p>
        </div>
        <SearchBar
          disabled={selectionIds.length > 0 ? true : false}
          onSearch={() => onCampusSearch()}
          onClear={() => onClear()}
          onChange={onChangeSearch}
          value={searchText}
        />
      </div>

      {anchorEl && (
        <MyPopper
          clickAwayHandler={clickAwayHandler}
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          onClear={onClearFilter}
        >
          <>
            <Dropdown
              onChangeFilter={onChangeFilter}
              options={filters.Zone}
              title='Zone'
              handleClickForParent={handleClickForParent}
              listOpen={listOpen}
              type='checkbox'
            />

            <div className='mt-3 border-t border-[#0F0F14]'></div>

            <div className='mb-3'>
              <Dropdown
                onChangeFilter={onChangeFilter}
                options={filters.Status}
                title='Status'
                handleClickForParent={handleClickForParent}
                listOpen={listOpen}
                type='radio'
              />
            </div>
          </>
        </MyPopper>
      )}

      {/* Campus Table */}
      {loading ? (
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
          // setDeleteAlert={setDeleteAlert}
          // isOpen={isOpen}
          // setIsopen={setIsopen}
          // selectedUserFacilities={selectedUserFacilities}
          // setSelectedUserFacilities={setSelectedUserFacilities}
          // setIsMultiDelete={setIsMultiDelete}
        />
      )}
    </div>
  );
};

export default CampusesUI;
