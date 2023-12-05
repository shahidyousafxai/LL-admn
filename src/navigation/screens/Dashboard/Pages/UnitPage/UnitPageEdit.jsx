import { useState } from 'react';
import { Styles } from '../../../../../utils/style/GlobalStyles';
import CustomModal from '../../../../../components/Modal/Modal';
import TextField from '../../../../../components/inputField';
import DragDropFile from '../../../../../components/DragDropFile/DragDropFile';
import RichTextInput from '../../../../../components/RichTextInput';
import {
  gray,
  secondaryColor,
  white,
  yellow,
} from '../../../../../utils/style/GlobalVariables';
import MuiSwtich from '../../../../../components/MUISwtich';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import Radio from '../../../../../components/RadioButton/Radio';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '../../../../../components/button';
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';

const UnitPageEdit = ({
  open,
  close,
  title,
  unitPageData,
  setunitPageData,
  loading,
  unitPageBtnLoading,
  onUpdate,
  images,
  setImages,
  deletedImages,
  setDeletedImages,
  unitData,
  error,
  setError,
  backendError,
}) => {
  const [imageError, setImageError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [uriError, setUriError] = useState('');
  const openPopOver = Boolean(anchorEl);
  const visibilityId = openPopOver ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setImages([...images, ...imageFiles]);
  };
  const handleRemoveImage = (Image, imageIndex) => {
    const indexVal = unitData?.unit_image_url?.indexOf(Image);
    const id = unitData?.unit_image[indexVal];
    const updatedImage = images?.filter((file, index) => index !== imageIndex);
    setImages([...updatedImage]);
    if (deletedImages?.length === 0 || deletedImages === null) {
      setDeletedImages([id]);
    } else {
      setDeletedImages([...deletedImages, id]);
    }
  };

  // Handle onChange URL
  const handleOnChangeURL = (event) => {
    const inputValue = event.target.value;
    const prefix = unitPageData.url;
    const regex = /[^a-zA-Z0-9-]+/g;
    const value = inputValue.split('/')[3];
    if (!regex.test(value) || value === '') {
      if (inputValue.startsWith(prefix)) {
        const cleanedValue = value.replace(/-+/g, '-');
        setunitPageData((prev) => ({
          ...prev,
          customURI: inputValue
            .substring(prefix.length)
            .replace(value, cleanedValue),
        }));
      }
      setUriError('');
    } else {
      setUriError("You can't use underscores and special characters");
    }
  };

  const onInputClick = (event) => {
    event.target.value = '';
    setImageError('');
  };

  const handleImageChange = (file) => {
    if (file[0]?.size < 2000000) {
      const files = Array.from(file);
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));
      setImages([...(images || []), ...imageFiles]);
    } else {
      setImageError('The image must not be greater than 200KB.');
    }
  };

  const handleVisibilityChange = (event) => {
    setunitPageData((prevUnitData) => ({
      ...prevUnitData,
      unitVisibility: event.target.value.toUpperCase(),
    }));
  };

  return (
    <CustomModal open={open} close={close} title={title} width={550}>
      {loading ? (
        <InsideSpinner />
      ) : (
        <div className=' h-[480px] main-container overflow-y-scroll'>
          <section className='w-full flex flex-col overflow-auto pb-5 pr-3'>
            <div className='w-full pl-1'>
              <TextField
                value={unitPageData?.unitTitle}
                onChange={(e) => {
                  setError((prevError) => ({
                    ...prevError,
                    unitTitle: '',
                  }));
                  setunitPageData((prevUnit) => ({
                    ...prevUnit,
                    unitTitle: e.target.value,
                  }));
                }}
                label={'Unit Title'}
                type='text'
                name='unitTitle'
              />
              {error?.unitTitle !== '' ? (
                <p className='text-red-500 text-xs mt-1 pl-1'>
                  {error?.unitTitle}
                </p>
              ) : null}
            </div>
            <div className='w-full pl-1'>
              <DragDropFile
                accept='.png, .jpg, .jpeg'
                label='Media'
                onDrop={handleDrop}
                removeImage={handleRemoveImage}
                selectedFiles={images}
                onChange={handleImageChange}
                onClick={onInputClick}
                error={imageError}
                setError={setImageError}
                showStaticFiles={true}
              />
            </div>

            <div>
              <p style={Styles.smallTextWhite} className='mb-1 mt-[20px] pl-1'>
                Description
              </p>
              <div className='w-full pl-1 h-[180px] overflow-y-scroll bg-[#1B1B23] rounded-lg'>
                <RichTextInput
                  value={unitPageData?.unitDescription}
                  setValue={(value) => {
                    setError((prevError) => ({
                      ...prevError,
                      description: '',
                    }));
                    setunitPageData((prevUnit) => ({
                      ...prevUnit,
                      unitDescription: value,
                    }));
                  }}
                />
              </div>
              {error?.unitDescription !== '' ? (
                <p className='text-red-500 text-xs mt-1 pl-1'>
                  {error?.unitDescription}
                </p>
              ) : null}
            </div>

            <div
              className='mt-5 text-white rounded-lg pl-1'
              style={{ backgroundColor: secondaryColor }}
            >
              <div className='py-5 px-4'>
                <p className='text-sm'>Summary</p>
                <div className='mt-5 flex flex-col gap-5'>
                  <p className='text-sm flex justify-between'>
                    <span style={{ color: gray }}>Visibility</span>
                    <span
                      style={{ color: yellow }}
                      className='underline cursor-pointer'
                      onClick={handleClick}
                    >
                      {unitPageData?.unitVisibility?.toLowerCase() ===
                      'password_protected'
                        ? 'Private'
                        : 'Public'}
                    </span>
                  </p>
                  <p className='text-sm flex justify-between'>
                    <span style={{ color: gray }}>Publish</span>
                    <span style={{ color: yellow }} className='underline'>
                      Immediately
                    </span>
                  </p>
                  <div className='text-sm flex justify-between'>
                    <p style={{ color: gray }} className='flex-1'>
                      URl
                    </p>
                    <div className='flex items-end justify-end flex-col '>
                      <input
                        className={`bg-transparent text-[${yellow}] shadow-none focus:shadow-none focus:border-b focus:border-[${yellow}]`}
                        type='text'
                        value={`${unitPageData.url}${unitPageData.customURI}`}
                        onChange={handleOnChangeURL}
                      />
                      <span className={`text-[12px] text-red-500`}>
                        {uriError !== '' && uriError}
                        {backendError?.end_url !== '' &&
                          backendError?.end_url?.replace(
                            'unit_page',
                            'Unit page'
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 pl-1'>
              <div className='flex flex-row gap-3 text-white pl-2'>
                <MuiSwtich
                  label={'Save Draft'}
                  checked={Boolean(unitPageData?.unitDraft)}
                  onChange={(e) =>
                    setunitPageData((prevUnitData) => ({
                      ...prevUnitData,
                      unitDraft: e.target.checked,
                    }))
                  }
                  name='autoplay'
                />
              </div>
            </div>
          </section>
          <Popover
            id={visibilityId}
            open={openPopOver}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                color: white,
              },
            }}
          >
            <Box bgcolor={secondaryColor} width={280} padding='15px' pb='40px'>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography
                  color={white}
                  fontSize={14}
                  fontFamily={'Inter-Medium'}
                >
                  Visibility
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseRoundedIcon sx={{ color: white }} fontSize='small' />
                </IconButton>
              </Box>
              <Box display='flex' alignItems='center'>
                <Radio
                  name='visibility'
                  value='public'
                  onChange={handleVisibilityChange}
                  checked={
                    Boolean(
                      unitPageData?.unitVisibility?.toLowerCase() === 'public'
                    ) || Boolean(unitPageData?.unitVisibility === '')
                  }
                />
                <div className='flex  flex-col '>
                  <span className='text-[13px] mt-[15px]'>Public</span>
                  <p className={`text-[11px] text-[${gray}]`}>
                    Visible to everyone.
                  </p>
                </div>
              </Box>
              <Box display='flex' alignItems='center'>
                <Radio
                  name='visibility'
                  value='password_protected'
                  onChange={handleVisibilityChange}
                  checked={Boolean(
                    unitPageData?.unitVisibility?.toLowerCase() ===
                      'password_protected'
                  )}
                />
                <div className='flex flex-col '>
                  <span className='text-[13px] mt-[15px]'>
                    Password protected
                  </span>
                  <p className={`text-[11px] text-[${gray}]`}>
                    Only those the password can view this page.
                  </p>
                </div>
              </Box>
              {unitPageData?.unitVisibility?.toLowerCase() ===
                'password_protected' &&
                unitPageData?.unitVisibility !== '' && (
                  <Box mt='10px'>
                    <input
                      name='password'
                      type='password'
                      placeholder='Enter Password'
                      className={`bg-transparent p-3 text-[12px] w-full !border-[${yellow}] border-[1px] rounded-[8px] `}
                      value={unitPageData?.unitPassword}
                      onChange={(e) =>
                        setunitPageData((prevUnitData) => ({
                          ...prevUnitData,
                          unitPassword: e.target.value,
                        }))
                      }
                    />
                  </Box>
                )}
            </Box>
          </Popover>
        </div>
      )}
      <div className='flex items-center justify-end gap-5 py-2'>
        <div
          className='cursor-pointer'
          style={Styles.cancelBtn}
          onClick={close}
        >
          Cancel
        </div>
        <Button
          className={`!px-8 !normal-case w-24`}
          style={Styles.activeBtn}
          onClick={onUpdate}
          loading={unitPageBtnLoading}
        >
          {!unitPageBtnLoading && 'Update'}
        </Button>
      </div>
    </CustomModal>
  );
};

export default UnitPageEdit;
