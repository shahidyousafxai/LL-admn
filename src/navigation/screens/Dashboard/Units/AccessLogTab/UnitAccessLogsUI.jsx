// Library Imports
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

// Local Imports
import {
  gray,
  secondaryColor,
} from '../../../../../utils/style/GlobalVariables';
import { SearchBar } from '../../../../../components/SearchBar/SearchBar';
import UnitTable from '../../../../../components/Tables/Table';
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../components/serverError';
import { MyPopper } from '../../../../../components/Filter/Filters';
import { Dropdown } from '../../../../../components/Dropdown';
import TextField from '../../../../../components/inputField';

const UnitAccessLogsUI = ({
  selectionIds,
  setSelectionIds,
  UnitAccessLogsColumnData,
  UnitAccessLogsColumnExtensionsData,
  UnitAccessLogsRowData,
  onChangeSearch,
  onUnitAccessLogsSearch,
  onClear,
  searchText,
  loading,
  networkError,
  reCallListing,

  anchorEl,
  id,
  open,
  listOpen,
  filters,
  handleClick,
  handleClose,
  clickAwayHandler,
  handleClickForParent,
  onChangeFilter,
  onClearFilter,
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
          onSearch={() => onUnitAccessLogsSearch()}
          onClear={() => onClear()}
          onChange={onChangeSearch}
          value={searchText}
        />
      </div>

      {/* Unit Table */}
      {loading ? (
        <InsideSpinner />
      ) : networkError ? (
        <ServerError reCallListing={reCallListing} />
      ) : (
        <UnitTable
          rows={UnitAccessLogsRowData}
          columns={UnitAccessLogsColumnData}
          tableColumnExtensions={UnitAccessLogsColumnExtensionsData}
          selectionIds={selectionIds}
          setSelectionIds={setSelectionIds}
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

            <div className='-mt-2 mb-3 px-3'>
              <TextField
                label={'Date'}
                type='date'
                name='date'
                value={filters?.Date}
                onChange={(event) =>
                  onChangeFilter(event.target.value, event.target.name)
                }
              />
            </div>
          </>
        </MyPopper>
      )}
    </div>
  );
};

export default UnitAccessLogsUI;
