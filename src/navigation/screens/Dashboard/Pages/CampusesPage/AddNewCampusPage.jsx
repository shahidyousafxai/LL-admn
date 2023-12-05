// Library Imports
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CloseIcon from '@mui/icons-material/Close';
// Local Imports
import BreadCrumb from '../../../../../components/BreadCrumb';
import Button from '../../../../../components/button';
import TextField from '../../../../../components/inputField';
import SelectDropdown from '../../../../../components/selectDropdown';
import DragDropFile from '../../../../../components/DragDropFile/DragDropFile';
import RichTextInput from '../../../../../components/RichTextInput';
import {
  yellow,
  gray,
  red,
  secondaryColor,
  white,
  danger,
} from '../../../../../utils/style/GlobalVariables';
import { Styles } from '../../../../../utils/style/GlobalStyles';
import ApiController from '../../../../../utils/network/api';
import { previewReducer } from '../../../../../redux/reducers/previewReducer';
import Radio from '../../../../../components/RadioButton/Radio';
import DeleteCampusPage from './DeleteCampusPage';

const AddNewCampusePageUI = () => {
  const dispatch = useDispatch();
  const { state: state } = useLocation();
  const campusData = state?.campusData;
  const campusList = state?.campusList;
  const campuses = state;
  const { id } = useParams();
  const navigate = useNavigate();
  const [newCampus, setNewCampus] = useState({
    title: id ? campusData?.title : '',
    description: id ? campusData?.description : '',
    campusLocation: id
      ? campusList?.find((item) => item.id === campusData?.campus_location)
      : '',
    campusImages: [],
    campusTitle: id ? campusData?.campus_title : '',
    saveDraft: false,
    publishCampus: false,
    publish: 'IMMEDIATELY',
    visibility: id ? campusData?.visibility.toLowerCase() : 'public',
    url: 'https://luxelocker.com/',
    customURI: id ? campusData?.end_url : 'enter-uri',
    password: id ? campusData?.password : '',
  });
  const [editImages, setEditImages] = useState(campusData?.campus_image);
  const [deletedImgIds, setDeletedImgIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [newCampusError, setNewCampusError] = useState({});
  const [uriError, setUriError] = useState('');
  // Delete Modal States
  const [deleteCampusData, setDeleteCampusData] = useState(campusData);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // States and Functions For Visibility Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const visibilityId = open ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files[0]?.size < 200 * 1024) {
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));
      setNewCampus((prevCampusData) => ({
        ...prevCampusData,
        campusImages: [...prevCampusData.campusImages, ...imageFiles],
      }));
    } else {
      setImageError('The image must not be greater than 200KB.');
    }
  };

  const handleRemoveImage = (file, ImageIndex) => {
    const updatedImagesList = newCampus?.campusImages?.filter((file, index) => {
      return index !== ImageIndex;
    });
    setNewCampus((prevCampusData) => ({
      ...prevCampusData,
      campusImages: [...updatedImagesList],
    }));
  };

  const onInputClick = (event) => {
    event.target.value = '';
    setImageError('');
  };
  // Handle OnChange Text Fields
  const handleOnChange = (event) => {
    const { name, value } = event;
    const trimmedValue = value.replace(/\s+/g, ' ');
    setNewCampus((prevCampusData) => ({
      ...prevCampusData,
      [name]: trimmedValue,
    }));
    setNewCampusError('');
  };

  // Handle onChange URL
  const handleOnChangeURL = (event) => {
    const inputValue = event.target.value;
    const prefix = newCampus.url;
    const regex = /[^a-zA-Z0-9-]+/g;
    const value = inputValue.split('/')[3];
    if (!regex.test(value) || value === '') {
      if (inputValue.startsWith(prefix)) {
        const cleanedValue = value.replace(/-+/g, '-');
        setNewCampus((prev) => ({
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

  // Hanlde Visibility OnCahnge
  const handleVisibilityChange = (event) => {
    setNewCampus((prevCampusData) => ({
      ...prevCampusData,
      visibility: event.target.value,
    }));
  };

  const handleImageChange = (file) => {
    if (file[0]?.size < 200 * 1024) {
      const files = Array.from(file);
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));
      setNewCampus((prevCampusData) => ({
        ...prevCampusData,
        campusImages: [...prevCampusData.campusImages, ...imageFiles],
      }));
    } else {
      setImageError('The image must not be greater than 200KB.');
    }
  };

  const handlePreviewBtnCheck = () => {
    if (
      newCampus?.title?.trim() === '' ||
      newCampus?.campusTitle?.trim() === '' ||
      newCampus?.customURI?.trim() === '' ||
      (!editImages?.length && !newCampus?.campusImages?.length) ||
      !Boolean(newCampus?.description?.replaceAll(/<[^>]*>/g, '')?.trim()) ||
      Object.keys(newCampus?.campusLocation)?.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  // Create Payload For Add New Campus Image
  const createPayload = (action, id) => {
    let newPagePayload = {
      title: newCampus?.title,
      description: newCampus?.description,
      campus_title: newCampus?.campusTitle,
      campus_location: newCampus?.campusLocation?.id,
      save_draft: action === 'draft' ? true : false,
      publish_campus: action === 'publish' ? true : false,
      publish: newCampus?.publish,
      visibility: newCampus?.visibility?.toUpperCase(),
      password: newCampus?.password,
      end_url: newCampus?.customURI,
    };
    let editPagePayload = {
      page_id: id,
      update: newPagePayload,
    };
    return id ? editPagePayload : newPagePayload;
  };
  // Create Payload For Images
  const createPayloadImages = (id) => {
    let formData = new FormData();
    newCampus?.campusImages?.forEach((file, index) => {
      formData.append(`image ${index}`, file);
    });
    const payload = {
      page_id: id,
      images: formData,
    };
    return payload;
  };

  // Handle Publish Campus Page BTN
  const handlePublishCampusPage = async (action) => {
    if (!id) {
      setLoading(true);
      ApiController.addNewCampusPageCall(createPayload(action), (response) => {
        if (response?.success) {
          if (newCampus?.campusImages?.length > 0) {
            ApiController.uploadCampusPageImagesCall(
              createPayloadImages(response?.data?.campus_page_id),
              (imgResponse) => {
                if (imgResponse?.success) {
                  navigate('/pages', { state: { from: 'campus' } });
                  setLoading(false);
                  console.log(
                    'imgResponse uploadCampusPageImagesCall',
                    imgResponse
                  );
                }
              }
            );
          } else {
            navigate('/pages', { state: { from: 'campus' } });
            setLoading(false);
          }
        } else {
          setLoading(false);
          const errors = response?.data?.reduce((curr, acc) => {
            return { ...curr, ...acc };
          }, {});
          setNewCampusError(errors);
        }
      });
    }
    if (id) {
      setLoading(true);
      ApiController.updateCampusPageCall(
        createPayload(action, id),
        (response) => {
          if (response?.success) {
            if (newCampus?.campusImages?.length > 0) {
              ApiController.uploadCampusPageImagesCall(
                createPayloadImages(id),
                (imgResponse) => {
                  if (imgResponse?.success) {
                    if (deletedImgIds?.length > 0) {
                      ApiController.deleteCampusPageImageCall(
                        { ids: deletedImgIds },
                        (response) => {
                          if (response?.success) {
                            setDeletedImgIds([]);
                            setLoading(false);
                            navigate('/pages', { state: { from: 'campus' } });
                          }
                        }
                      );
                    } else {
                      setLoading(false);
                      navigate('/pages', { state: { from: 'campus' } });
                    }
                  }
                }
              );
            } else {
              if (deletedImgIds?.length > 0) {
                ApiController.deleteCampusPageImageCall(
                  { ids: deletedImgIds },
                  (response) => {
                    if (response?.success) {
                      setDeletedImgIds([]);
                      setLoading(false);
                      navigate('/pages', { state: { from: 'campus' } });
                    }
                  }
                );
              } else {
                setLoading(false);
                navigate('/pages', { state: { from: 'campus' } });
              }
            }
          } else {
            setLoading(false);
            const errors = response?.data?.reduce((curr, acc) => {
              return { ...curr, ...acc };
            }, {});
            setNewCampusError(errors);
          }
        }
      );
    }
  };

  // Hanlde Preview The Campus Page
  const handlePreviewCampusPage = () => {
    const linksImage = newCampus?.campusImages?.map((file) => {
      const imageURL = URL.createObjectURL(file);
      return imageURL;
    });
    const campusDetails = {
      title: newCampus?.title,
      description: newCampus?.description,
      campusTitle: newCampus?.campusTitle,
      campusLocation: newCampus?.campusLocation,
      campusImages:
        linksImage.length > 0
          ? linksImage
          : editImages.map((file) => file?.url),
      from: 'campus',
    };
    dispatch(previewReducer(campusDetails));
    window.open('/preview-page', '_blank');
  };

  // Functions Delete Campus Page
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setDeleteError('');
    setDeleteLoading(false);
    setDeleteCampusData({});
  };
  const onDeleteCampusPage = (id) => {
    setDeleteLoading(true);
    ApiController.deleteCampusPageCall(id, (response) => {
      if (response?.success) {
        setDeleteLoading(false);
        setDeleteError('');
        setIsOpenDeleteModal(false);
        navigate('/pages', { state: { from: 'campus' } });
      } else {
        setDeleteLoading(false);
        setDeleteError(response?.message);
      }
    });
  };

  // Handle Remove Images When Edit Campus Page
  const handleRemoveIamgesEdit = (item) => {
    setEditImages((prev) => {
      const updatedImagesList = prev?.filter((file) => {
        return file?.id !== item?.id;
      });
      return [...updatedImagesList];
    });
    setDeletedImgIds((prev) => [...prev, item?.id]);
  };

  // UseEffect For Hide Errors
  useEffect(() => {
    setTimeout(() => {
      setNewCampusError({});
    }, 4000);
  }, [newCampusError]);

  return (
    <React.Fragment>
      <div className='main-container'>
        {/* Header BreadCrumb with Buttom Row */}
        <div className='flex flex-row justify-between items-center py-5 px-5'>
          <div>
            <BreadCrumb routes={[{ name: 'Pages' }]} />
            <div
              style={{ fontFamily: 'Inter-Medium', fontSize: 15 }}
              className='text-white pt-1'
            >
              <span> {id ? 'Edit Campus Page' : 'New Campus Page'} </span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <Button
              height={37}
              style={{
                color: handlePreviewBtnCheck() ? gray : yellow,
                backgroundColor: handlePreviewBtnCheck() ? 'unset' : 'unset',
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                textTransform: 'none',
                width: '100px',
                borderRadius: 8,
                boxShadow: 'none',
              }}
              component='span'
              variant='contained'
              onClick={() => handlePublishCampusPage('draft')}
              disabled={handlePreviewBtnCheck() || loading}
              loading={loading}
            >
              {!loading && 'Save Draft'}
            </Button>
            <Button
              height={37}
              style={{
                borderColor: handlePreviewBtnCheck() || loading ? gray : yellow,
                color: handlePreviewBtnCheck() || loading ? gray : yellow,
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                textTransform: 'none',
                width: '100px',
                borderRadius: 8,
              }}
              component='span'
              variant='outlined'
              disabled={handlePreviewBtnCheck() || loading}
              onClick={handlePreviewCampusPage}
              loading={loading}
            >
              {!loading && 'Preview'}
            </Button>
            <Button
              height={37}
              className={`!px-5 text-sm !normal-case`}
              style={
                handlePreviewBtnCheck() || loading
                  ? Styles?.disableBtn
                  : Styles.activeBtn
              }
              component='span'
              variant='contained'
              disabled={handlePreviewBtnCheck() || loading}
              loading={loading}
            >
              <p
                style={
                  handlePreviewBtnCheck() || loading
                    ? Styles?.disableBtnText
                    : Styles.activeBtnText
                }
                onClick={() => handlePublishCampusPage('publish')}
              >
                {!loading && 'Publish'}
              </p>
            </Button>
          </div>
        </div>

        <section
          style={{ borderColor: secondaryColor }}
          className={`flex border-t gap-5 h-[calc(100vh-83px)]`}
        >
          <div className='w-3/4 flex flex-col overflow-auto pb-5 px-3'>
            <div className='w-full'>
              <TextField
                value={newCampus?.title}
                onChange={(e) => handleOnChange(e.target)}
                label='Title'
                type='text'
                name='title'
              />
            </div>
            <div className='w-full'>
              <div style={Styles.smallTextWhite} className='mb-1 mt-5'>
                Campus Location
              </div>
              <SelectDropdown
                className={'mt-0'}
                width={'auto'}
                popoverWidth={'57vw'}
                list={id ? campusList : campuses}
                name='campusLocation'
                value={newCampus?.campusLocation}
                placeholder={'Select'}
                disabled={id ? true : false}
                onClick={(value) => {
                  setNewCampus((prev) => ({ ...prev, campusLocation: value }));
                  setNewCampusError({});
                }}
              />
              {newCampusError?.campus_location !== '' && (
                <Typography
                  color={danger}
                  fontFamily='Inter'
                  variant='caption'
                  fontSize='12px'
                >
                  {newCampusError?.campus_location}
                </Typography>
              )}
            </div>

            <div className='w-full'>
              <DragDropFile
                accept='.png, .jpg, .jpeg'
                label='Media'
                onDrop={handleDrop}
                removeImage={handleRemoveImage}
                selectedFiles={newCampus?.campusImages}
                onChange={handleImageChange}
                onClick={onInputClick}
                error={imageError}
                setError={setImageError}
                showStaticFiles={true}
              />
              {id && editImages?.length > 0 && (
                <div className='mt-3'>
                  <ul className='flex gap-3 flex-wrap'>
                    {editImages?.map((file, index) => {
                      const img = file?.url?.replace('download', 'view');
                      return (
                        <li key={index} className='relative rounded'>
                          <img
                            src={file?.url?.replace('download', 'view')}
                            alt={file?.id}
                            className='rounded-lg h-[115px] w-[115px]'
                            style={{ objectFit: 'cover' }}
                          />
                          <div onClick={() => handleRemoveIamgesEdit(file)}>
                            <CloseIcon
                              fontSize='small'
                              className='cursor-pointer text-white bg-black rounded-full p-1 absolute top-1 right-1'
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className='w-full'>
              <TextField
                value={newCampus?.campusTitle}
                onChange={(e) => handleOnChange(e.target)}
                label={'Campus Title'}
                type='text'
                name='campusTitle'
              />
            </div>
            <div>
              <p style={Styles.smallTextWhite} className='mb-1 mt-[20px]'>
                Description
              </p>
              <div className='w-full h-60 overflow-y-scroll bg-[#1B1B23] rounded-lg'>
                <RichTextInput
                  value={newCampus?.description}
                  setValue={(value) =>
                    setNewCampus((prevCampus) => ({
                      ...prevCampus,
                      description: value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div
            className='w-1/4 text-white'
            style={{ backgroundColor: secondaryColor }}
          >
            <div className='py-5 px-4 border-b border-black'>
              <p className='text-sm'>Summary</p>
              <div className='mt-5 flex flex-col gap-5'>
                <p className='text-sm flex justify-between'>
                  <span style={{ color: gray }}>Visibility</span>
                  <span
                    style={{ color: yellow }}
                    className='underline cursor-pointer'
                    onClick={handleClick}
                  >
                    {newCampus?.visibility === 'public' ? 'Public' : 'Private'}
                  </span>
                </p>
                <p className='text-sm flex justify-between'>
                  <span style={{ color: gray }}>Publish</span>
                  <span style={{ color: yellow }} className='underline'>
                    Immediately
                  </span>
                </p>
                <p className='text-sm flex justify-between flex-col'>
                  <span style={{ color: gray }}>URl</span>
                  <input
                    className={`bg-transparent text-[${yellow}] shadow-none focus:shadow-none focus:border-b focus:border-[${yellow}]`}
                    type='text'
                    value={`${newCampus.url}${newCampus.customURI}`}
                    onChange={handleOnChangeURL}
                  />
                  <span className={`text-[12px] mt-1 text-red-500`}>
                    {uriError !== '' && uriError}
                    {newCampusError?.end_url !== '' &&
                      newCampusError?.end_url?.replace(
                        'campus_page',
                        'Campus page'
                      )}
                    {newCampusError?.non_field_errors !== '' &&
                      newCampusError?.non_field_errors}
                  </span>
                </p>
              </div>
            </div>
            <div className='py-5 px-4 flex justify-between items-center'>
              {id && (
                <p
                  style={{ color: red }}
                  className={`text-sm font-medium cursor-pointer p-2 hover:bg-red-600/5 rounded-[8px]  duration-200`}
                  onClick={() => {
                    setIsOpenDeleteModal(true);
                    setDeleteCampusData(campusData);
                  }}
                >
                  Move to Trash
                </p>
              )}

              <Button
                height={37}
                style={{
                  color: yellow,
                  fontFamily: 'Inter-Medium',
                  fontSize: 13,
                  textTransform: 'none',
                  borderRadius: 8,
                  boxShadow: 'none',
                  borderColor: yellow,
                }}
                component='span'
                variant='outlined'
                onClick={() =>
                  navigate('/pages', { state: { from: 'campus' } })
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Popover
        id={visibilityId}
        open={open}
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
            <Typography color={white} fontSize={17} fontFamily={'Inter-Medium'}>
              Visibility
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon sx={{ color: white }} fontSize='medium' />
            </IconButton>
          </Box>
          <Box display='flex' alignItems='center'>
            <Radio
              name='visibility'
              value='public'
              onChange={handleVisibilityChange}
              checked={Boolean(newCampus?.visibility === 'public')}
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
              checked={Boolean(newCampus?.visibility === 'password_protected')}
            />
            <div className='flex  flex-col '>
              <span className='text-[13px] mt-[15px]'>Password protected</span>
              <p className={`text-[11px] text-[${gray}]`}>
                Only those the password can view this page.
              </p>
            </div>
          </Box>
          {newCampus?.visibility === 'password_protected' &&
            newCampus?.visibility !== '' && (
              <Box mt='10px'>
                <input
                  name='password'
                  // type='password'
                  placeholder='Enter Password'
                  className={`bg-transparent p-3 text-[12px] w-full !border-[${yellow}] border-[1px] rounded-[8px] `}
                  value={newCampus?.password}
                  onChange={(e) =>
                    setNewCampus((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </Box>
            )}
        </Box>
      </Popover>
      {/* Delete Campus Page */}
      <DeleteCampusPage
        open={isOpenDeleteModal}
        close={closeDeleteModal}
        data={deleteCampusData}
        onDelete={onDeleteCampusPage}
        loading={deleteLoading}
        error={deleteError}
      />
    </React.Fragment>
  );
};

export default AddNewCampusePageUI;
