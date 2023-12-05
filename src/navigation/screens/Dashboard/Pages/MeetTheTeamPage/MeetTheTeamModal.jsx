// Library Imports
import { useState } from 'react';

// Local Imports
import Button from '../../../../../components/button.js';
import TextField from '../../../../../components/inputField.js';
import { Styles } from '../../../../../utils/style/GlobalStyles.js';
import CustomModal from '../../../../../components/Modal/Modal.jsx';
import {
  secondaryColor,
  yellow,
} from '../../../../../utils/style/GlobalVariables.js';
import RichTextInput from '../../../../../components/RichTextInput.js';
import DragDropFile from '../../../../../components/DragDropFile/DragDropFile.js';

const MeetTheTeamModal = ({
  open,
  close,
  meetTeam,
  setMeetTeam,
  onAddNewTeamMember,
  loading,
  meetTheTeamType,
}) => {
  const [imageError, setImageError] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setMeetTeam((prevTeamData) => ({
      ...prevTeamData,
      teamImage: [...imageFiles],
    }));
  };

  const handleRemoveImage = (file, ImageIndex) => {
    const updatedImage = meetTeam?.teamImage?.filter((file, index) => {
      return index !== ImageIndex;
    });
    setMeetTeam((prevTeamData) => ({
      ...prevTeamData,
      teamImage: [...updatedImage],
    }));
  };

  const onInputClick = (event) => {
    event.target.value = '';
    setImageError('');
  };

  const handleImageChange = (file) => {
    if (file[0]?.size < 2000000) {
      const files = Array.from(file);
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));
      setMeetTeam((prevTeamData) => ({
        ...prevTeamData,
        teamImage: [...imageFiles],
      }));
    } else {
      setImageError('The image must not be greater than 200KB.');
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === 'order') {
      const regex = /^[0-9\b]+$/;
      if (regex.test(value) || value === '') {
        setMeetTeam((prevTeamData) => ({ ...prevTeamData, order: value }));
      }
    } else {
      setMeetTeam((prevTeamData) => ({ ...prevTeamData, [name]: value }));
    }
  };

  const disabled =
    (meetTeam?.name && meetTeam?.title && meetTeam?.order) === ''
      ? true
      : meetTeam?.summary === '<p><br></p>'
      ? true
      : meetTeam?.teamImage?.length === 0
      ? true
      : false;

  return (
    <CustomModal
      open={open}
      close={close}
      title={`${
        meetTheTeamType === 'add'
          ? 'Add Team Member'
          : meetTheTeamType === 'edit'
          ? 'Edit Team Member'
          : ''
      }`}
      width={600}
    >
      <div className='h-[470px] mt-[10px] pb-1 pl-1 pr-2 overflow-y-scroll'>
        {/* Name Input */}
        <div className='w-full'>
          <TextField
            value={meetTeam?.name}
            onChange={(e) => handleOnChange(e)}
            label={'Name'}
            type='text'
            name='name'
          />
        </div>
        {/* Title Input */}
        <div className='w-full'>
          <TextField
            value={meetTeam?.title}
            onChange={(e) => handleOnChange(e)}
            label={'Title'}
            type='text'
            name='title'
          />
        </div>

        {/* Summary Input */}
        <div>
          <p style={Styles.smallTextWhite} className='mb-1 mt-[20px]'>
            Summary
          </p>
          <div className='w-full h-40 overflow-y-scroll bg-[#1B1B23] rounded-lg'>
            <RichTextInput
              value={meetTeam?.summary}
              setValue={(value) => {
                setMeetTeam((prevTeamData) => ({
                  ...prevTeamData,
                  summary: value,
                }));
              }}
            />
          </div>
        </div>
        {/* Title Input */}
        <div className='w-full'>
          <TextField
            value={meetTeam?.order}
            onChange={(e) => handleOnChange(e)}
            label={'Order'}
            type='text'
            name='order'
          />
        </div>
        {/* Media Input */}
        <div className='w-full'>
          <DragDropFile
            accept='.png, .jpg, .jpeg'
            label='Media'
            onDrop={handleDrop}
            removeImage={handleRemoveImage}
            selectedFiles={meetTeam?.teamImage}
            onChange={handleImageChange}
            onClick={onInputClick}
            error={imageError}
            setError={setImageError}
            showStaticFiles={true}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className='flex items-center justify-end gap-5 mt-5'>
        <div onClick={close} className='text-white text-sm cursor-pointer'>
          <p style={Styles.cancelBtn}>Cancel</p>
        </div>
        <Button
          className={`!px-5 text-sm !normal-case`}
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: 13,
            textTransform: 'none',
            width: '160px',
            borderRadius: 8,
          }}
          height={38}
          sx={{
            backgroundColor:
              disabled || loading ? `${secondaryColor}` : `${yellow}`,
            '&:hover': {
              backgroundColor: disabled || loading ? 'unset' : `${yellow}`,
            },
          }}
          disabled={disabled || loading}
          onClick={() => onAddNewTeamMember()}
          loading={loading}
        >
          <p>
            {!loading &&
              `${
                meetTheTeamType === 'add'
                  ? 'Add Team Member'
                  : meetTheTeamType === 'edit'
                  ? 'Edit Team Member'
                  : ''
              }`}
          </p>
        </Button>
      </div>
    </CustomModal>
  );
};

export default MeetTheTeamModal;
