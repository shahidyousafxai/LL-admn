// Library Imports
import React from 'react';
import { Add } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';

// Local Imports
import BreadCrumb from '../../../../components/BreadCrumb';
import Button from '../../../../components/button';
import {
  gray,
  primaryColor,
  secondaryColor,
  yellow,
} from '../../../../utils/style/GlobalVariables';
import { SearchBar } from '../../../../components/SearchBar/SearchBar';
import AnnouncementsTable from '../../../../components/Tables/Table';
import { InsideSpinner } from '../../../../components/Spinner/Spinner';
import ServerError from '../../../../components/serverError';
import DeleteAnnouncement from './DeleteAnnouncement';
import AddEditAnnouncement from './AddEditAnnouncement';

const AnnouncementsUI = ({
  selectionIds,
  setSelectionIds,
  loading,
  announcementsColumnData,
  announcementsColumnExtensionsData,
  announcementsRowData,

  searchText,
  onChangeSearch,
  onAnnouncementSearch,
  onClear,
  dataProviders,

  networkError,
  reCallListing,

  addEditAnnouncementModal,
  setAddEditAnnouncementModal,
  onClose,
  fromEdit,
  campuses,
  group,
  onChangeMultiSelect,
  onChangeAllMultiselect,
  repeat,
  addAnnouncementData,
  setAddAnnouncementData,
  modalSaveBtnCheck,
  onSavePress,

  deleteAnnouncementModal,
  setDeleteAnnouncementModal,
  deleteAnnouncementError,
  setDeleteAnnouncementError,
  modalLoading,
  editAnnouncementData,
  deleteAnnouncement,
  campusSelectAll,
	setCampusSelectAll,
	groupSelectAll,
	setGroupSelectAll,
}) => {
  return (
    <div className='main-container px-5 pt-5'>
      {/* Header BreadCrumb with Buttom Row */}
      <div className='flex flex-row justify-between items-center'>
        <div>
          <BreadCrumb routes={[{ name: 'Announcements' }]} />
          <div
            style={{ fontFamily: 'Inter-Medium', fontSize: 15 }}
            className='text-white pt-1'
          >
            Announcements
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
            width: '200px',
            borderRadius: 8,
          }}
          onClick={() => setAddEditAnnouncementModal(true)}
          component='span'
          variant='contained'
          disabled={loading}
        >
          <p style={{ fontFamily: 'Inter-Medium', fontSize: 13 }}>
            New Announcement
          </p>
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
          // onClick={!searchText && handleClick}
          className='flex justify-center text-sm flex-row align-items-center rounded-lg pointer p-2'
        >
          <FilterListIcon className='mr-2' fontSize='small' color='secondary' />
          <p style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: gray }}>
            Filter
          </p>
        </div>
        <SearchBar
          disabled={selectionIds.length > 0 ? true : false}
          onSearch={() => onAnnouncementSearch()}
          onClear={() => onClear()}
          onChange={onChangeSearch}
          value={searchText}
        />
      </div>

      {/* Announcements Table */}
      {loading ? (
        <InsideSpinner />
      ) : networkError ? (
        <ServerError reCallListing={reCallListing} />
      ) : (
        <AnnouncementsTable
          withoutTabs={true}
          rows={announcementsRowData}
          columns={announcementsColumnData}
          tableColumnExtensions={announcementsColumnExtensionsData}
          dataProviders={dataProviders}
          selectionIds={selectionIds}
          setSelectionIds={setSelectionIds}
          fromAnnouncements
        />
      )}

      {/* Add Edit Announcement */}
      <AddEditAnnouncement
        open={addEditAnnouncementModal}
        close={onClose}
        addAnnouncementData={addAnnouncementData}
        setAddAnnouncementData={setAddAnnouncementData}
        fromEdit={fromEdit}
        campuses={campuses}
        group={group}
        onChangeMultiSelect={onChangeMultiSelect}
        onChangeAllMultiselect={onChangeAllMultiselect}
        repeat={repeat}
        loading={modalLoading}
        modalSaveBtnCheck={modalSaveBtnCheck}
        onSavePress={onSavePress}
        campusSelectAll={campusSelectAll}
        setCampusSelectAll={setCampusSelectAll}
        groupSelectAll={groupSelectAll}
        setGroupSelectAll={setGroupSelectAll}
      />

      {/* Delete Modal */}
      <DeleteAnnouncement
        open={deleteAnnouncementModal}
        close={() => {
          setDeleteAnnouncementModal(false);
          setDeleteAnnouncementError('');
        }}
        editAnnouncementData={editAnnouncementData}
        loading={modalLoading}
        deleteAnnouncement={deleteAnnouncement}
        deleteAnnouncementError={deleteAnnouncementError}
      />
    </div>
  );
};

export default AnnouncementsUI;
