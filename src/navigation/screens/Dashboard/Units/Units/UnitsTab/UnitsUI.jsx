// Library Imports
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

// Local Imports
import { secondaryColor } from '../../../../../../utils/style/GlobalVariables';
import { SearchBar } from '../../../../../../components/SearchBar/SearchBar';
import UnitsTable from '../../../../../../components/Tables/Table';
import { InsideSpinner } from '../../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../../components/serverError';
import { MyPopper } from '../../../../../../components/Filter/Filters';
import { Dropdown } from '../../../../../../components/Dropdown';
import { Styles } from '../../../../../../utils/style/GlobalStyles';

const UnitsUI = ({
  selectionIds,
  setSelectionIds,
  unitColumnData,
  unitColumnExtensionsData,
  unitRowData,
  dataProviders,
  onRowSelect,
  onChangeSearch,
  onUnitsSearch,
  onClear,
  searchText,
  loading,
  networkError,
  reCallListing,

  anchorEl,
  id,
  open,
  listOpen,
  handleClick,
  handleClose,
  selectedCampusString,
  clickAwayHandler,
  handleClickForParent,
  filters,
  onChangeFilter,
  onClearFilter,
  clearPriceRange,
  listingCallWithPriceRange,

  buyValue,
  buyHandleChanges,
  leaseValue,
  leaseHandleChanges,
}) => {
  // Show Selected Campuses
  const [isSelectedCampus, setIsSelectedCampus] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState([]);

  useEffect(() => {
    checkCampusFilter();
    // eslint-disable-next-line
  }, [filters?.Campus]);

  const checkCampusFilter = () => {
    let selected = [];

    // eslint-disable-next-line
    filters?.Campus?.map((item) => {
      if (item.value) {
        selected.length > 0 ? selected.push(item) : (selected[0] = item);
      } else {
        setIsSelectedCampus(false);
      }
    });

    if (selected.length > 0) {
      setSelectedCampus(selected);
      setIsSelectedCampus(true);
    } else {
      setIsSelectedCampus(false);
    }
  };

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
          <p style={Styles.disableBtnText}>Filter</p>
        </div>
        <SearchBar
          disabled={selectionIds.length > 0 ? true : false}
          onSearch={() => onUnitsSearch()}
          onClear={() => onClear()}
          onChange={onChangeSearch}
          value={searchText}
        />
      </div>

      {/* To Show Selected Campus */}
      {isSelectedCampus && (
        <div className='w-auto inline-block py-2 pl-2 pr-1 bg-[#CDA950] mt-1 rounded-lg'>
          <span className='flex items-center'>
            <p style={Styles.mediumTextPrimary} className='mr-1'>
              Campus:
            </p>
            {selectedCampus.length > 0 &&
              selectedCampus.map((item, index) => {
                return (
                  <>
                    {index === 0 ? (
                      <p key={index} style={Styles.smallTextPrimary}>
                        {item.title}
                      </p>
                    ) : (
                      <p key={index} style={Styles.smallTextPrimary}>
                        , {item.title}
                      </p>
                    )}
                  </>
                );
              })}
            <div
              className='cursor-pointer'
              onClick={() => {
                setIsSelectedCampus(false);
                onClearFilter();
              }}
            >
              <CloseIcon
                className='ml-2 mb-[4px]'
                fontSize='inherit'
                color='primary'
              />
            </div>
          </span>
        </div>
      )}

      {/* Unit Table */}
      {loading ? (
        <InsideSpinner />
      ) : networkError ? (
        <ServerError reCallListing={reCallListing} />
      ) : (
        <UnitsTable
          rows={unitRowData}
          columns={unitColumnData}
          tableColumnExtensions={unitColumnExtensionsData}
          dataProviders={dataProviders}
          selectionIds={selectionIds}
          setSelectionIds={setSelectionIds}
          onRowSelect={onRowSelect}
          unitsSelectedCampus={isSelectedCampus}
        />
      )}

      {/* Filter Popover */}
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
              options={filters?.Campus}
              title='Campus'
              handleClickForParent={handleClickForParent}
              listOpen={listOpen}
              type='checkbox'
            />

            <div className='mt-3 border-t border-[#0F0F14]'></div>

            <Dropdown
              options={['Price Range (For Sale)']}
              title='Price Range (For Sale)'
              handleClickForParent={handleClickForParent}
              listOpen={listOpen}
              type='range'
              minValue={10000}
              maxValue={150000}
              handleChanges={buyHandleChanges}
              rangeValue={buyValue}
              clearPriceRange={clearPriceRange}
              listingCallWithPriceRange={listingCallWithPriceRange}
            />

            <div className='mt-3 border-t border-[#0F0F14]'></div>

            <Dropdown
              options={['Price Range (For Lease)']}
              title='Price Range (For Lease)'
              handleClickForParent={handleClickForParent}
              listOpen={listOpen}
              type='range'
              minValue={50}
              maxValue={1500}
              handleChanges={leaseHandleChanges}
              rangeValue={leaseValue}
              clearPriceRange={clearPriceRange}
              listingCallWithPriceRange={listingCallWithPriceRange}
            />

            <div className='mt-3 border-t border-[#0F0F14]'></div>

            <div className='mb-3'>
              <Dropdown
                onChangeFilter={onChangeFilter}
                options={filters?.Status}
                title='Status'
                handleClickForParent={handleClickForParent}
                listOpen={listOpen}
                type='radio'
              />
            </div>
          </>
        </MyPopper>
      )}
    </div>
  );
};

export default UnitsUI;
