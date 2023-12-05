// Library Imports
import React from 'react';
import { Add } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';

// Local Imports
import BreadCrumb from '../../../../../components/BreadCrumb';
import Button from '../../../../../components/button';
import {
  gray,
  primaryColor,
  secondaryColor,
  yellow,
} from '../../../../../utils/style/GlobalVariables';
import { SearchBar } from '../../../../../components/SearchBar/SearchBar';
import UsersTable from '../../../../../components/Tables/Table';
import { MyPopper } from '../../../../../components/Filter/Filters';
import { Dropdown } from '../../../../../components/Dropdown';
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';
import ServerError from '../../../../../components/serverError';

const UsersUI = ({
  selectionIds,
  setSelectionIds,
  usersColumnData,
  usersColumnExtensionsData,
  usersRowData,
  dataProviders,
  openAddUserModal,
  onRowSelect,
  searchText,
  onChangeSearch,
  onClear,
  onUserSearch,
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
    <div className='main-container px-5 pt-5'>
      {/* Header BreadCrumb with Buttom Row */}
      <div className='flex flex-row justify-between items-center'>
        <div>
          <BreadCrumb routes={[{ name: 'Users' }]} />
          <div
            style={{ fontFamily: 'Inter-Medium', fontSize: 15 }}
            className='text-white pt-1'
          >
            Users
          </div>
        </div>
        <Button
          startIcon={<Add />}
          height={38}
          style={{
            backgroundColor: loading ? secondaryColor : yellow,
            color: loading ? gray : primaryColor,
            fontFamily: 'Inter-Medium',
            fontSize: 13,
            textTransform: 'none',
            width: '140px',
            borderRadius: 8,
          }}
          onClick={() => openAddUserModal()}
          component='span'
          variant='contained'
          disabled={loading}
        >
          <p style={{ fontFamily: 'Inter-Medium', fontSize: 13 }}>New User</p>
        </Button>
      </div>

      {/* Search Bar Row */}
      <div className='flex flex-row justify-between align-items-center py-5 gap-5'>
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
          onSearch={() => onUserSearch()}
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

            <Dropdown
              onChangeFilter={onChangeFilter}
              options={filters.Campus}
              title='Campus'
              handleClickForParent={handleClickForParent}
              listOpen={listOpen}
              type='checkbox'
            />

            <div className='mt-3 border-t border-[#0F0F14]'></div>

            <Dropdown
              onChangeFilter={onChangeFilter}
              options={filters.Group}
              title='Group'
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

      {/* Users Table */}
      {loading ? (
        <InsideSpinner />
      ) : networkError ? (
        <ServerError reCallListing={reCallListing} />
      ) : (
        <UsersTable
          withoutTabs={true}
          rows={usersRowData}
          columns={usersColumnData}
          tableColumnExtensions={usersColumnExtensionsData}
          dataProviders={dataProviders}
          selectionIds={selectionIds}
          setSelectionIds={setSelectionIds}
          onRowSelect={onRowSelect}
        />
      )}
    </div>
  );
};

export default UsersUI;
