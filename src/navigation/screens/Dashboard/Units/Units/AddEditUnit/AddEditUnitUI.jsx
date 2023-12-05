// Library Imports
import React, { useState } from 'react';

// Local Imports
import Button from '../../../../../../components/button.js';
import CustomModal from '../../../../../../components/Modal/Modal.jsx';
import { addEditUnitNav } from '../../../../../../components/Tables/dummyData.js';
import {
  white,
  gray,
  yellow,
} from '../../../../../../utils/style/GlobalVariables.js';
import { Styles } from '../../../../../../utils/style/GlobalStyles.js';
import UnitInformation from './UnitInformation.js';
import OwnerInformation from './OwnerInformation.js';
import LeaseInformation from './LeaseInformation.js';
import Payments from './Payments.js';
import { InsideSpinner } from '../../../../../../components/Spinner/Spinner.jsx';
import Amenities from './Amenities.jsx';
import Unit from './Unit.jsx';
import { previewReducer } from '../../../../../../redux/reducers/previewReducer.js';
import { useDispatch } from 'react-redux';

const AddEditUnitUI = ({
  open,
  close,
  onChange,
  loading,
  onSave,
  campuses,
  newUnit,
  setNewUnit,
  isEmpty,
  setIsEmptyToInit,
  error,
  Images,
  setImages,
  data,
  deletedImages,
  setDeletedImages,
  editDataLoading,
  getAmenityListing,
  storageList,
  storageSelectAll,
  setStorageSelectAll,
  onDeleteUnitPage,
  uriError,
  onChangeURI,
}) => {
  const [state, setState] = useState(1);

  const dispatch = useDispatch();

  const handlePreviewCheck = () => {
    if (
      !newUnit?.unitTitle ||
      !Boolean(newUnit?.unitDescription?.replaceAll(/<[^>]*>/g, ''))
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handlePreviewUnitPage = () => {
    const linksImage = Images?.map((file) => {
      const imageURL = URL.createObjectURL(file);
      return imageURL;
    });
    const unitPreviewDetails = {
      title: newUnit?.unitTitle,
      description: newUnit?.unitDescription,
      unitImages: linksImage,
      from: 'unit',
    };
    dispatch(previewReducer(unitPreviewDetails));
    window.open('/preview-page', '_blank');
  };

  return (
    <CustomModal
      open={open}
      close={() => {
        close();
        setState(1);
      }}
      title={newUnit?.title ? newUnit?.title : 'Add Unit'}
      width={880}
    >
      <div className='flex mt-2 gap-3 h-[480px] mb-10 pt-3'>
        <div className='w-[25%]  h-full'>
          <ul className='p-2 flex flex-col  gap-1 text-sm'>
            {addEditUnitNav.map((itm) => (
              <li
                key={itm.id}
                className={
                  itm.id === 2
                    ? `flex items-center 
					justify-start w-full p-2 !gap-0 rounded-md text-sm
					${state === itm.id && 'bg-[#CDA950]'} group cursor-pointer`
                    : itm.id === 3
                    ? `flex items-center 
					justify-start w-full p-2 !gap-0 rounded-md text-sm
					${state === itm.id && 'bg-[#CDA950]'} group cursor-pointer`
                    : `cursor-pointer flex items-center 
                    justify-start w-full p-2 !gap-0 rounded-md text-sm
                    ${state === itm.id && 'bg-[#CDA950]'} group`
                }
                onClick={() => setState(itm.id)}
              >
                <div className='flex flex-col gap-0'>
                  <p
                    style={{
                      fontSize: 12,
                      color: state === itm.id ? 'black' : white,
                    }}
                    className={`m-0`}
                  >
                    {itm.title}
                    {itm.id === 1 && isEmpty?.userInfo?.isUnitInfoEmpty ? (
                      <div style={Styles.errorText}>
                        Fill out all required fields.
                      </div>
                    ) : (
                      ''
                    )}
                    {itm.id === 2 &&
                    isEmpty?.ownerInfo?.isOwnerInfoEmpty &&
                    newUnit?.availableForSale ? (
                      <div style={Styles.errorText}>
                        Fill out all required fields.
                      </div>
                    ) : (
                      ''
                    )}
                    {itm.id === 3 &&
                    isEmpty?.lesseeInfo?.isLesseeInfoEmpty &&
                    newUnit?.availableForLease ? (
                      <div style={Styles.errorText}>
                        Fill out all required fields.
                      </div>
                    ) : (
                      ''
                    )}
                    {itm.id === 6 && isEmpty?.unitPage?.isUnitPageEmpty ? (
                      <div style={Styles.errorText}>
                        Fill out all required fields.
                      </div>
                    ) : (
                      ''
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form className='w-[75%] h-full min-h-full'>
          {editDataLoading ? (
            <InsideSpinner />
          ) : (
            <>
              {/* Tab View */}
              {state === 1 && (
                <UnitInformation
                  newUnit={newUnit}
                  setNewUnit={setNewUnit}
                  onChange={onChange}
                  campuses={campuses}
                  isEmpty={isEmpty}
                  setIsEmptyToInit={setIsEmptyToInit}
                  Images={Images}
                  setImages={setImages}
                  data={data}
                  deletedImages={deletedImages}
                  setDeletedImages={setDeletedImages}
                  getAmenityListing={getAmenityListing}
                  storageSelectAll={storageSelectAll}
                  setStorageSelectAll={setStorageSelectAll}
                  storageList={storageList}
                />
              )}
              {state === 2 && (
                <OwnerInformation
                  newUnit={newUnit}
                  setNewUnit={setNewUnit}
                  onChange={onChange}
                  isEmpty={isEmpty}
                  setIsEmptyToInit={setIsEmptyToInit}
                />
              )}
              {state === 3 && (
                <LeaseInformation
                  newUnit={newUnit}
                  setNewUnit={setNewUnit}
                  onChange={onChange}
                  isEmpty={isEmpty}
                  setIsEmptyToInit={setIsEmptyToInit}
                />
              )}
              {state === 4 && (
                <Payments newUnit={newUnit} onChange={onChange} />
              )}
              {state === 5 && (
                <Amenities newUnit={newUnit} setNewUnit={setNewUnit} />
              )}
              {state === 6 && (
                <Unit
                  newUnit={newUnit}
                  setNewUnit={setNewUnit}
                  onDeleteUnitPage={onDeleteUnitPage}
                  isEmpty={isEmpty}
                  onChange={onChange}
                  setIsEmptyToInit={setIsEmptyToInit}
                  uriError={uriError}
                  onChangeURI={onChangeURI}
                />
              )}

              {/* Button row */}
              <div className='flex flex-col items-end justify-center absolute bottom-5 right-5'>
                <div className='flex items-center justify-end gap-5'>
                  <div
                    className='cursor-pointer'
                    style={Styles.cancelBtn}
                    onClick={() => {
                      close();
                      setState(1);
                    }}
                  >
                    Cancel
                  </div>
                  {state === 6 && (
                    <Button
                      height={37}
                      style={{
                        borderColor: handlePreviewCheck() ? gray : yellow,
                        color: handlePreviewCheck() ? gray : yellow,
                        fontFamily: 'Inter-Medium',
                        fontSize: 13,
                        textTransform: 'none',
                        width: '100px',
                        borderRadius: 8,
                      }}
                      disabled={handlePreviewCheck()}
                      component='span'
                      variant='outlined'
                      onClick={handlePreviewUnitPage}
                    >
                      {'Preview'}
                    </Button>
                  )}
                  <Button
                    className={`!px-8 !normal-case w-24`}
                    style={Styles.activeBtn}
                    onClick={() => {
                      if (newUnit?.title) {
                        setState(1);
                        onSave('Edit');
                      } else {
                        setState(1);
                        onSave('Add');
                      }
                    }}
                    loading={loading}
                  >
                    {!loading && 'Save'}
                  </Button>
                </div>
                {error !== '' && (
                  <div className='mt-5' style={Styles.errorText}>
                    {error}
                  </div>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </CustomModal>
  );
};

export default AddEditUnitUI;
