// Library Imports
import React from 'react';
import { Styles } from '../../../../../utils/style/GlobalStyles';
import Button from '../../../../../components/button';
import CustomModal from '../../../../../components/Modal/Modal';

// Local Imports

const DeleteBlogPage = ({ open, close, data, onDelete, loading, error }) => {
  return (
    <CustomModal open={open} close={close} title='Delete Blog Page' width={490}>
      <div className='flex pt-2'>
        <p style={Styles.deleteModalText}>
          Are you sure that you want to delete ‘
          {data?.blogTitle !== '' && data?.blogTitle}
          {data?.title !== '' && data?.title} ’ ?
        </p>
      </div>
      <div className='flex items-center justify-end gap-5 mt-5'>
        <div onClick={close} className='text-white text-sm cursor-pointer'>
          <p style={Styles.cancelBtn}>Cancel</p>
        </div>
        <Button
          className={`!px-5 text-sm !normal-case`}
          style={Styles.activeBtn}
          onClick={() => onDelete(data?.id)}
          loading={loading}
        >
          {!loading && <p style={Styles.activeBtnText}>Delete</p>}
        </Button>
      </div>
      {error !== '' && (
        <div className='mt-5' style={Styles.errorText}>
          {error}
        </div>
      )}
    </CustomModal>
  );
};

export default DeleteBlogPage;
