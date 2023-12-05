// Library Imports
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, IconButton, Popover, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch } from 'react-redux';

// Local Imports
import BreadCrumb from '../../../../../components/BreadCrumb';
import Button from '../../../../../components/button';
import TextField from '../../../../../components/inputField';
import DragDropFile from '../../../../../components/DragDropFile/DragDropFile';
import {
  yellow,
  gray,
  red,
  secondaryColor,
  white,
  danger,
  darkGray,
  primaryColor,
} from '../../../../../utils/style/GlobalVariables';
import { Styles } from '../../../../../utils/style/GlobalStyles';
import Radio from '../../../../../components/RadioButton/Radio';
import SelectDropdown from '../../../../../components/selectDropdown';
import MuiSwtich from '../../../../../components/MUISwtich';
import { previewReducer } from '../../../../../redux/reducers/previewReducer';
import ApiController from '../../../../../utils/network/api';
import { InsideSpinner } from '../../../../../components/Spinner/Spinner';
import DeleteBlogPage from './DeleteBlogUI';
import {
  toolBar,
  imageSizeList,
  fontSizeList,
  LinkPopover,
} from '../../../../../utils/utils';

const AddNewBlogPage = () => {
  const { id } = useParams();
  const editorRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: '',
    description: '<p>This is a sample text.</p>',
    saveDraft: false,
    publishPost: false,
    publish: 'IMMEDIATELY',
    visibility: 'public',
    url: 'https://luxelocker.com/',
    customURI: 'enter-uri',
    password: '',
    imagesForEdit: [],
    videosForEdit: [],
  });

  const [newPostMedia, setNewPostMedia] = useState({
    featureImage: '',
    blogImages: [],
    blogVideos: [],
    featureFrom: 'onChange',
    featureImgForPayload: '',
  });

  const [newPostVideoSettings, setNewPostVideoSettings] = useState({
    autoplay: false,
    loop: false,
    muted: false,
    playbackControls: false,
    playInline: false,
  });

  const [newPostMediaError, setNewPostMediaError] = useState({
    type: '',
    message: '',
  });

  const [isShowBlock, setIsShowBlock] = useState({
    isTypoOptions: true,
    isImageOptions: false,
    isVideoOptions: false,
  });

  const [activeCommands, setActiveCommands] = useState({});
  const [loading, setLoading] = useState(false);
  const [getBlogPostLoading, setGetBlogPostLoading] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);
  const [tagsList, setTagsList] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);

  // Delete Modal States
  const [deleteBlogData, setDeleteBlogData] = useState({});
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

  const handleRemoveImage = (file, ImageIndex) => {
    const updatedImagesList = newPost?.postImages?.filter((file, index) => {
      return index !== ImageIndex;
    });
    setNewPost((prev) => ({
      ...prev,
      postImages: [...updatedImagesList],
    }));
  };

  const onInputClick = (event) => {
    event.target.value = '';
    setNewPostMediaError({ type: '', message: '' });
  };
  // Handle OnChange Text Fields
  const handleOnChange = (event) => {
    const { name, value } = event;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle onChange URL
  const handleOnChangeURL = (event) => {
    const inputValue = event.target.value;
    const prefix = newPost.url;
    const regex = /[^a-zA-Z0-9-]+/g;
    const value = inputValue.split('/')[3];
    if (!regex.test(value) || value === '') {
      if (inputValue.startsWith(prefix)) {
        const cleanedValue = value.replace(/-+/g, '-');
        setNewPost((prev) => ({
          ...prev,
          customURI: inputValue
            .substring(prefix.length)
            .replace(value, cleanedValue),
        }));
      }
      setNewPostMediaError({
        type: '',
        message: '',
      });
    } else {
      setNewPostMediaError({
        type: 'uriError',
        message: "You can't use underscores and special characters",
      });
    }
  };

  // Hanlde Visibility OnCahnge
  const handleVisibilityChange = (event) => {
    setNewPost((prevData) => ({
      ...prevData,
      visibility: event.target.value,
    }));
  };
  // Hanlde Preview The Post Page
  const handlePreviewPostPage = () => {
    const imageURL =
      newPostMedia.featureFrom === 'link'
        ? newPostMedia.featureImage
        : URL.createObjectURL(newPostMedia?.featureImage);
    const postDetails = {
      title: newPost?.title,
      blog: editorRef.current?.innerHTML,
      featureImage: imageURL,
      tags: tagsList,
      from: 'blog',
    };
    dispatch(previewReducer(postDetails));
    window.open('/preview-page', '_blank');
  };

  // Handle Tabs States And Methods
  const [value, setValue] = useState(0);
  const handleTabValue = (event, newValue) => {
    setValue(newValue);
  };

  // Editor States And Methods
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [letterCases, setLetterCases] = useState({
    underscore: false,
    capitilize: false,
    upperCase: false,
    lowerCase: false,
  });
  const [imageSize, setImageSize] = useState('');
  const [videoSizeError, setVideoSizeError] = useState('');
  const [imageSizeError, setImageSizeError] = useState('');
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedRange, setSelectedRange] = useState(null);
  const [url, setUrl] = useState('');
  const [popoverPositions, setPopoverPosition] = useState({ x: '', y: '' });
  const [isCapitilize, setIsCapitilize] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [fontSize, setFontSize] = useState('');

  // ***************************************  Handle On Change Feature Media Uploads Start    *********************************** //

  const handleOnChangeFeatureImage = (file) => {
    if (file[0]?.size < 200 * 1024) {
      const files = Array.from(file);
      setNewPostMedia((prevData) => ({
        ...prevData,
        featureImage: file[0],
        featureImgForPayload: file[0],
        featureFrom: 'onChange',
      }));
      setNewPostMediaError({ type: '', message: '' });
    } else {
      setNewPostMediaError({
        type: 'featureImage',
        message: 'The image must not be greater than 200KB.',
      });
    }
  };
  // Handle Drop For Feature Image
  const handleDropFeatureImage = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files[0]?.size < 200 * 1024) {
      setNewPostMedia((prevData) => ({
        ...prevData,
        featureImage: files[0],
        featureImgForPayload: file[0],
        featureFrom: 'onChange',
      }));
      setNewPostMediaError({ type: '', message: '' });
    } else {
      setNewPostMediaError({
        type: 'featureImage',
        message: 'The image must not be greater than 200KB.',
      });
    }
  };

  const hideErrorMessages = () => {
    setNewPostMediaError({
      type: '',
      message: '',
    });
  };

  // ***************************************  Handle On Change Feature Media Uploads End    *********************************** //

  const handleOnChangeVideoSetting = (e) => {
    setNewPostVideoSettings((set) => ({
      ...set,
      [e.target.name]: e.target.checked,
    }));
  };

  // ***************************************  Editor States And Methods Start    *********************************** //

  //************************************ Handle Manage Editor  Commands **********************************/ //
  const handleMangeCmd = async (e, item) => {
    e.preventDefault();
    const { exeCmd, absence } = item;
    // For Deselect Alignments
    if (exeCmd?.startsWith('justify')) {
      const alignmentCommands = [
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
      ];
      alignmentCommands.forEach((alignment) => {
        if (alignment !== exeCmd) {
          setActiveCommands((prevState) => ({
            ...prevState,
            [alignment]: false,
          }));
        }
      });
    }
    if (exeCmd === 'insertUnorderedList') {
      document.execCommand(exeCmd, false, absence);
      return;
    }
    // For Other Active Commands
    const isActive = activeCommands[exeCmd];
    setActiveCommands((prevState) => ({
      ...prevState,
      [exeCmd]: !isActive,
    }));
    document.execCommand(exeCmd, false, absence);
  };

  //************************************ Handle Manage Editor IMAGE & VIDEO Commands **********************************/ //
  const handleImageAndVdieoByCMD = (e, item) => {
    editorRef.current?.focus();
    const { exeCmd } = item;

    const isActive = activeCommands[exeCmd];
    setActiveCommands((prevState) => ({
      ...prevState,
      [exeCmd]: !isActive,
    }));
    // Insert Image
    if (exeCmd === 'insertImage') {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file && file.size < 200 * 1024) {
          const url = URL.createObjectURL(file);
          setSelectedImage(file);
          // Create a container div for the image and close button
          const container = document.createElement('div');
          const p = document.createElement('p');
          p.innerText = 'Write Here';
          container.id = 'img-container';
          container.style.width = 'max-content';
          container.style.maxWidth = '100%';
          container.style.position = 'relative';
          container.setAttribute('contentEditable', 'false');
          // Create the image element
          const imgTag = document.createElement('img');
          imgTag.src = url;
          container.appendChild(imgTag);
          // Create the close button
          const closeButton = document.createElement('button');
          closeButton.classList.add('closeButton');
          closeButton.innerHTML = 'X'; // You can style this button as needed
          closeButton.style.position = 'absolute';
          closeButton.style.top = '0';
          closeButton.style.right = '0';
          closeButton.style.backgroundColor = 'transparent';
          closeButton.style.border = 'none';
          closeButton.style.cursor = 'pointer';
          closeButton.style.backgroundColor = '#000';
          closeButton.style.color = '#fff';
          closeButton.style.padding = '10px';
          closeButton.style.borderRadius = '50%';
          closeButton.style.display = 'flex';
          closeButton.style.justifyContent = 'center';
          closeButton.style.alignItems = 'center';
          closeButton.style.width = '25px';
          closeButton.style.height = '25px';
          closeButton.style.margin = '10px';
          closeButton.addEventListener('click', () => {
            setIsShowBlock(() => ({
              isVideoOptions: false,
              isTypoOptions: true,
              isImageOptions: false,
            }));
            container.remove();
            setNewPostMedia((prev) => ({
              ...prev,
              blogImages: prev.blogImages.filter((img) => img !== file),
            }));
          });
          container.appendChild(closeButton);
          // Insert the container with the image at the cursor position
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(container);
          // Move the cursor to the end of the inserted content
          range.setStartAfter(container);
          range.setEndAfter(container);
          selection.removeAllRanges();
          selection.addRange(range);
          // editorRef.current.appendChild(container);
          setNewPostMedia((prev) => ({
            ...prev,
            blogImages: [...prev.blogImages, file],
          }));
          setActiveCommands((prevState) => ({
            ...prevState,
            [exeCmd]: false,
          }));
          editorRef.current.appendChild(p);
        } else {
          setActiveCommands((prevState) => ({
            ...prevState,
            insertImage: false,
          }));
          setImageSizeError('The image must not be greater than 200KB.');
        }
      };
      fileInput.click();
    }
    // Insert Video
    if (exeCmd === 'insertVideo') {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'video/*';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file && file.size < 2097152) {
          const url = URL.createObjectURL(file);
          // Create a container div for the image and close button
          const container = document.createElement('div');
          container.id = 'video-container';
          const p = document.createElement('p');
          p.innerText = 'Write Here';
          container.style.width = '100%';
          container.style.position = 'relative';
          container.setAttribute('contentEditable', 'false');

          // Create the image element
          const videoTag = document.createElement('video');
          videoTag.controls = true;
          videoTag.src = url;
          container.appendChild(videoTag);
          // Create the close button
          const closeButton = document.createElement('button');
          closeButton.innerHTML = 'X'; // You can style this button as needed
          closeButton.style.position = 'absolute';
          closeButton.style.top = '0';
          closeButton.style.right = '0';
          closeButton.style.backgroundColor = 'transparent';
          closeButton.style.border = 'none';
          closeButton.style.cursor = 'pointer';
          closeButton.style.backgroundColor = '#000';
          closeButton.style.color = '#fff';
          closeButton.style.padding = '10px';
          closeButton.style.borderRadius = '50%';
          closeButton.style.display = 'flex';
          closeButton.style.justifyContent = 'center';
          closeButton.style.alignItems = 'center';
          closeButton.style.width = '25px';
          closeButton.style.height = '25px';
          closeButton.style.margin = '10px';
          closeButton.addEventListener('click', () => {
            setIsShowBlock(() => ({
              isVideoOptions: false,
              isTypoOptions: true,
              isImageOptions: false,
            }));
            container.remove();
            setNewPostMedia((prevData) => ({
              ...prevData,
              blogVideos: prevData.blogVideos?.filter((img) => img !== file),
            }));
          });
          container.appendChild(closeButton);
          // Insert the container with the image at the cursor position
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(container);
          // Move the cursor to the end of the inserted content
          range.setStartAfter(container);
          range.setEndAfter(container);
          selection.removeAllRanges();
          selection.addRange(range);
          setNewPostMedia((prevData) => ({
            ...prevData,
            blogVideos: [...prevData.blogVideos, file],
          }));
          setActiveCommands({
            ...activeCommands,
            insertVideo: false,
          });
          editorRef.current.appendChild(p);
        } else {
          setActiveCommands({
            ...activeCommands,
            insertVideo: false,
          });
          setVideoSizeError('The video must not be greater than 2MB');
        }
      };
      fileInput.click();
    }
  };

  // ************************************** Handle Open CreateLink **************************************//
  const handleOpenLinkPopover = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selection.toString());
      setSelectedRange(range);
      setShowLinkPopover(true);
      const tooltipX = rect.x + window.scrollX;
      const tooltipY = rect.y + window.scrollY + rect.height;
      setPopoverPosition({ x: tooltipX, y: tooltipY });
    }
  };

  const handleCloseLinkPopover = () => {
    setShowLinkPopover(false);
  };

  const handleLinkAdded = (url) => {
    if (selectedRange && selectedText) {
      const a = document.createElement('a');
      a.innerHTML = selectedText;
      a.href = url;
      a.target = '_blank';
      selectedRange.deleteContents();
      selectedRange.insertNode(a);
    }
    // Close the popover
    handleCloseLinkPopover();
  };
  const handleBlur = (e) => {};

  // ************************************* Handle Typo Options *************************************//
  const handleTypoOptions = (type) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      if (type === 'underline') {
        setLetterCases((cases) => ({
          ...cases,
          underscore: !letterCases.underscore,
        }));
        document.execCommand('underline', false, null);
      }
      if (type === 'capitalize') {
        setIsCapitilize(!isCapitilize);
        setIsUpperCase(false);
        setIsLowerCase(false);
        if (isCapitilize) {
          document.execCommand('removeFormat', true, null);
        } else {
          document.execCommand('formatblock', false, 'p');
        }
      }
      if (type === 'uppercase') {
        setIsUpperCase(!isUpperCase);
        setIsCapitilize(false);
        if (isUpperCase) {
          document.execCommand('removeFormat', true, null);
        } else {
          document.execCommand('formatblock', false, 'p');
        }
      }
      if (type === 'lowercase') {
        setIsLowerCase(!isLowerCase);
        setIsCapitilize(false);
        setIsUpperCase(false);
        if (isLowerCase) {
          document.execCommand('removeFormat', true, null);
        } else {
          document.execCommand('formatblock', false, 'p');
        }
      }
    }
  };
  // *********************************Handle OnChange FontSize*********************************//
  const handleOnChangeFontSize = (event) => {
    setFontSize(event.target.value);
    if (editorRef.current) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const parentSpan = range.commonAncestorContainer.parentElement;
      if (selection.toString().length > 0 && parentSpan.tagName === 'SPAN') {
        parentSpan.style.fontSize = `${event.target.value}`;
      } else {
        const span = document.createElement('span');
        span.classList.add('heading');
        span.style.fontSize = `${event.target.value}`;
        range.surroundContents(span);
      }
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef?.current?.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
          setValue(1);
          setIsShowBlock(() => ({
            isTypoOptions: false,
            isVideoOptions: false,
            isImageOptions: true,
          }));
          const img = event.target;
          setSelectedImage(img);
          setImageWidth('');
          setImageHeight('');
        } else if (event.target.tagName === 'VIDEO') {
          setValue(1);
          setIsShowBlock(() => ({
            isTypoOptions: false,
            isImageOptions: false,
            isVideoOptions: true,
          }));
        } else if (event.target.tagName === 'A') {
          const getTag = event.target;
          const url = getTag.getAttribute('href');
          setUrl(url);
          setShowLinkPopover(true);
          setPopoverPosition({ x: event.clientX, y: event.clientY });
        } else {
          setValue(1);
          setIsShowBlock(() => ({
            isTypoOptions: true,
            isImageOptions: false,
            isVideoOptions: false,
          }));
          setFontSize('');
        }
      });
      // Check Letter Cases
      if (editorRef.current) {
        editorRef.current?.addEventListener('keydown', (event) => {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer;
            // For Capitalize
            if (
              container.tagName === 'P' ||
              container.parentNode.tagName === 'P'
            ) {
              if (isCapitilize) {
                container.style.textTransform = 'capitalize';
              } else if (isUpperCase) {
                container.style.textTransform = 'uppercase';
              } else if (isLowerCase) {
                container.style.textTransform = 'lowercase';
              } else {
                container.style.textTransform = 'none';
              }
            }
          } else {
            // Move the cursor to the parent <div> in the 'else' condition
            const divElement = container.closest('div');
            if (divElement) {
              const newRange = document.createRange();
              newRange.selectNodeContents(divElement);
              newRange.collapse(false);
              selection.removeAllRanges();
              selection.addRange(newRange);
            }
          }
          if (event.key === 'Enter') {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const parentSpan = range.commonAncestorContainer.parentElement;
            if (parentSpan.tagName === 'SPAN') {
              const span = parentSpan;
              const textNode = document.createTextNode('\u200B');
              span.parentNode.insertBefore(textNode, span.nextSibling);
              const range = document.createRange();
              range.setStart(textNode, 1);
              range.collapse(true);
              const selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
              event.preventDefault();
            }
          }
        });
      }
    }
  }, [editorRef.current, isCapitilize, isLowerCase, isUpperCase]);

  // UseEffect For Change Run Time Image Width And Height
  useEffect(() => {
    if (selectedImage !== null) {
      selectedImage.style.width = `${imageWidth}px`;
      selectedImage.style.height = `${imageHeight}px`;
    }
  }, [imageWidth, imageHeight]);

  // Hide Errors
  useEffect(() => {
    setTimeout(() => {
      setVideoSizeError('');
      setImageSizeError('');
    }, 5000);
  }, [videoSizeError, imageSizeError]);

  // ********************** Create Payload For Add New Blog ********************* //
  const createPayload = (action, id) => {
    const data = {
      title: newPost.title,
      description: editorRef.current?.innerHTML,
      publish: action === 'draft' ? false : true,
      visibility: newPost.visibility?.toUpperCase(),
      password: newPost.password,
      tags: tagsList,
      end_url: newPost.customURI,
    };
    const payload = {
      data,
      blogId: id,
    };
    return payload;
  };

  // ********************** Create Payload For Add New Blog Images Uplaod ********************* //
  const createPayloadForImagesUpload = (id) => {
    let formData = new FormData();
    if (newPostMedia.featureImgForPayload) {
      formData.append('image', newPostMedia.featureImgForPayload);
      formData.append('featured', 'image');
    }
    newPostMedia.blogImages?.forEach((file, index) => {
      formData.append(`image ${index + 1}`, file);
    });
    newPostMedia.blogVideos?.forEach((video, index) => {
      formData.append(`video ${index + 1}`, video);
    });
    formData.append('autoplay', Boolean(newPostVideoSettings?.autoplay));
    formData.append('loop', Boolean(newPostVideoSettings?.loop));
    formData.append('muted', Boolean(newPostVideoSettings?.muted));
    formData.append(
      'playback_controls',
      Boolean(newPostVideoSettings?.playbackControls)
    );
    formData.append('play_inline', Boolean(newPostVideoSettings?.playInline));
    const payload = {
      blogId: id,
      formData: formData,
    };
    return payload;
  };

  // Delete Images Payload
  const deleteImagesPayload = () => {
    const ids = deletedIds?.map((ids) => {
      return ids?.id;
    });
    return {
      ids: ids,
    };
  };
  // Update Video Controls Payload
  const updateVideoControlsPayload = () => {
    let formData = new FormData();
    formData.append('autoplay', Boolean(newPostVideoSettings?.autoplay));
    formData.append('loop', Boolean(newPostVideoSettings?.loop));
    formData.append('muted', Boolean(newPostVideoSettings?.muted));
    formData.append(
      'playback_controls',
      Boolean(newPostVideoSettings?.playbackControls)
    );
    formData.append('play_inline', Boolean(newPostVideoSettings?.playInline));
    const payload = {
      blogId: newPost.videosForEdit?.id,
      formdata: formData,
    };
    return payload;
  };

  // ********************** onSubmit ********************* //
  const handlePublishBlogPage = async (action) => {
    if (!id) {
      setLoading(true);
      ApiController.addNewBlogPageCall(createPayload(action), (response) => {
        if (response.success) {
          if (
            newPostMedia.featureImgForPayload !== '' ||
            newPostMedia.blogImages?.length > 0 ||
            newPostMedia.blogVideos?.length > 0
          ) {
            ApiController.addNewBlogPageUploadImagesCall(
              createPayloadForImagesUpload(response?.data?.blog_id),
              (imgresponse) => {
                if (imgresponse.success) {
                  setLoading(false);
                  navigate('/pages');
                } else {
                  setLoading(false);
                }
              }
            );
          }
        } else {
          setLoading(false);
        }
      });
    }
    if (id) {
      setLoading(true);
      ApiController.updateBlogCall(createPayload(action, id), (response) => {
        if (response.success) {
          if (
            newPostMedia.featureImgForPayload !== '' ||
            newPostMedia.blogImages?.length > 0 ||
            newPostMedia.blogVideos?.length > 0
          ) {
            ApiController.addNewBlogPageUploadImagesCall(
              createPayloadForImagesUpload(id),
              (imgresponse) => {
                if (imgresponse.success) {
                  // Delete Images API START
                  if (deletedIds.length > 0) {
                    ApiController.deleteBlogImagesCall(
                      deleteImagesPayload(),
                      (deleteResponse) => {
                        if (deleteResponse.success) {
                          setLoading(false);
                          navigate('/pages');
                        }
                      }
                    );
                  } else {
                    setLoading(false);
                    navigate('/pages');
                  }
                  // Delete Images API START
                } else {
                  setLoading(false);
                  navigate('/pages');
                }
              }
            );
          } else {
            // Delete Images API START
            if (deletedIds.length > 0) {
              ApiController.deleteBlogImagesCall(
                deleteImagesPayload(),
                (deleteResponse) => {
                  if (deleteResponse.success) {
                    setLoading(false);
                    navigate('/pages');
                  }
                }
              );
            } else {
              setLoading(false);
              navigate('/pages');
            }
            // Delete Images API START
          }
          // Update Video Controls
          if (newPost.videosForEdit) {
            ApiController.updateVideoControlsCall(
              updateVideoControlsPayload(),
              (response) => {
                if (response.success) {
                  console.log('response of video controls');
                }
              }
            );
          }
        } else {
          setLoading(false);
        }
      });
    }
  };
  // ********************** useEffect For Get Single Blog Data ********************* //

  useEffect(() => {
    if (id) {
      setGetBlogPostLoading(true);
      ApiController.getSingleBlogPageDetailsCall(id, (response) => {
        if (response.success) {
          const data = response?.data;
          setGetBlogPostLoading(false);
          const featureImg = data?.blog_images?.filter(
            (item) => item.featured === 'featured'
          )[0];
          setNewPost((prev) => ({
            ...prev,
            title: data?.title,
            description: data?.description,
            visibility: data?.visibility?.toLowerCase(),
            password: data?.password,
            imagesForEdit: data?.blog_images,
            customURI: data?.end_url ? data?.end_url : 'enter-uri',
          }));
          setNewPostMedia((prev) => ({
            ...prev,
            featureImage: featureImg !== undefined ? featureImg : '',
            featureFrom: 'link',
          }));
          setTagsList(data?.tags);
          setEditorLoading(true);
          setDeleteBlogData(data);
        } else {
          setGetBlogPostLoading(false);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (editorLoading) {
      function setEditData() {
        setTimeout(() => {
          if (editorRef.current) {
            const newHTML = fnToSetURLs(
              newPost.description,
              newPost.imagesForEdit
            );
            editorRef.current.innerHTML = newHTML;
          }
        }, 4000);
      }
      setEditData();
    }
  }, [newPost.description, editorLoading]);

  useEffect(() => {
    setTimeout(() => {
      setEditorLoading(false);
    }, 4000);
  }, [editorLoading]);

  // Change Local URLs with Original One
  function fnToSetURLs(html, orignalURls) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = doc.querySelectorAll('img');
    const videos = doc.querySelectorAll('video');
    const updatedURLs = orignalURls.filter(
      (item) => item.featured !== 'featured'
    );
    images.forEach((img, index) => {
      let url;
      url = updatedURLs[index]?.url?.replaceAll('download', 'view');
      img.src = url;
      img.id = updatedURLs[index]?.id;
    });
    videos.forEach((video, index) => {
      if (updatedURLs[index]?.is_video) {
        let url;
        url = updatedURLs[index]?.url?.replaceAll('download', 'view');
        video.src = url;
        video.id = updatedURLs[index]?.id;
        video.autoplay = updatedURLs[index]?.autoplay;
        video.loop = updatedURLs[index]?.loop;
        video.muted = updatedURLs[index]?.muted;
        video.playsInline = updatedURLs[index]?.play_inline;
        video.controls = updatedURLs[index]?.playback_controls;
        setNewPostVideoSettings({
          autoplay: updatedURLs[index]?.autoplay,
          loop: updatedURLs[index]?.loop,
          muted: updatedURLs[index]?.muted,
          playInline: updatedURLs[index]?.play_inline,
          playbackControls: updatedURLs[index]?.playback_controls,
        });
        setNewPost((prev) => ({
          ...prev,
          videosForEdit: updatedURLs[index],
        }));
      }
    });
    return doc.body.innerHTML;
  }

  //************************* DELETE CAMPUS START *******************************//
  const handleOnDelete = (id) => {
    setDeleteLoading(true);
    ApiController.deleteBlogPageCall(id, (response) => {
      if (response?.success) {
        setDeleteLoading(false);
        setDeleteError('');
        setIsOpenDeleteModal(false);
        navigate('/pages');
      } else {
        setDeleteLoading(false);
        setDeleteError(response?.message);
      }
    });
  };

  // Handle Close Delete Modal
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setDeleteError('');
    setDeleteLoading(false);
    setDeleteBlogData({});
  };
  //************************* DELETE CAMPUS START *******************************//

  useEffect(() => {
    if (editorRef.current) {
      const imgContainer = document?.getElementById('img-container');
      const videoContainer = document?.getElementById('video-container');
      imgContainer?.addEventListener('click', (event) => {
        const childNode = imgContainer.childNodes[0];
        const url = imgContainer.childNodes[0]?.src?.split('//')[1];
        const isDriveURL = url?.includes('drive.google');
        if (event.target.tagName === 'BUTTON') {
          if (childNode?.src && isDriveURL) {
            const findImg = newPost?.imagesForEdit?.find(
              (img) => img?.id == childNode?.id
            );
            setDeletedIds((prev) => [...prev, findImg]);
            imgContainer.remove();
          } else {
            console.log('not removing');
          }
        }
      });
      videoContainer?.addEventListener('click', (event) => {
        const childNode = videoContainer.childNodes[0];
        const url = videoContainer.childNodes[0]?.src?.split('//')[1];
        const isDriveURL = url?.includes('drive.google');
        if (event.target.tagName === 'BUTTON') {
          if (childNode?.src && isDriveURL) {
            const findvideo = newPost?.imagesForEdit?.find(
              (vid) => vid?.id == childNode?.id
            );
            setDeletedIds((prev) => [...prev, findvideo]);
            videoContainer.remove();
          } else {
            console.log('not removing');
          }
        }
      });
    }
  }, [editorRef.current]);

  // PREVIEW BUTTON VALIDATION
  const previewButtonValidation = () => {
    const { title, description } = newPost;
    const { featureImage } = newPostMedia;

    if (!title || !description || !featureImage || tagsList.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <div className='main-container '>
        {/* Header BreadCrumb with Buttom Row */}
        <div className='flex flex-row justify-between items-center py-5 px-5'>
          <div>
            <BreadCrumb routes={[{ name: 'Pages' }]} />
            <div
              style={{ fontFamily: 'Inter-Medium', fontSize: 15 }}
              className='text-white pt-1'
            >
              <span>{id ? 'Edit Post' : 'New Post'} </span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <Button
              height={37}
              style={{
                color: previewButtonValidation() ? gray : yellow,
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                textTransform: 'none',
                width: '100px',
                borderRadius: 8,
                boxShadow: 'none',
                backgroundColor: loading ? secondaryColor : 'unset',
              }}
              component='span'
              variant='text'
              loading={loading}
              disabled={previewButtonValidation() || loading}
              onClick={() => handlePublishBlogPage('draft')}
            >
              {!loading && 'Save Draft'}
            </Button>
            <Button
              height={37}
              style={{
                borderColor:
                  previewButtonValidation() || loading ? gray : yellow,
                color: previewButtonValidation() || loading ? gray : yellow,
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                textTransform: 'none',
                width: '100px',
                borderRadius: 8,
              }}
              component='span'
              variant='outlined'
              disabled={previewButtonValidation() || loading}
              onClick={handlePreviewPostPage}
            >
              {'Preview'}
            </Button>
            <Button
              height={37}
              className={`!px-5 text-sm !normal-case`}
              style={
                previewButtonValidation() || loading
                  ? Styles?.disableBtn
                  : Styles.activeBtn
              }
              component='span'
              variant='contained'
              disabled={previewButtonValidation() || loading}
              loading={loading}
            >
              <p
                style={
                  previewButtonValidation() || loading
                    ? Styles?.disableBtnText
                    : Styles.activeBtnText
                }
                onClick={() => handlePublishBlogPage('publish')}
              >
                {!loading && 'Publish'}
              </p>
            </Button>
          </div>
        </div>
        {getBlogPostLoading || editorLoading ? (
          <InsideSpinner />
        ) : (
          <section
            style={{ borderColor: secondaryColor, height: '100vh' }}
            className={`flex border-t gap-5 min-h-[calc(100vh-83px)]`}
          >
            {/* First Section */}
            <div className='w-3/4 flex flex-col overflow-auto pb-5 px-3'>
              <div className='w-full'>
                <TextField
                  value={newPost?.title}
                  onChange={(e) => handleOnChange(e.target)}
                  label='Title'
                  type='text'
                  name='title'
                />
              </div>
              <div>
                <p style={Styles.smallTextWhite} className='mb-1 mt-[20px]'>
                  Description
                </p>
                <div className='w-full min-h-[300px] max-h-max  bg-[#1B1B23] rounded-lg'>
                  <Box
                    display='flex'
                    justifyContent='start'
                    borderBottom={`2px solid ${primaryColor}`}
                  >
                    <select
                      onChange={handleOnChangeFontSize}
                      value={fontSize}
                      className='font-["Inter"] focus:outline-none px-2 rounded-lg'
                      style={{ backgroundColor: secondaryColor, color: gray }}
                    >
                      {fontSizeList.map((font, index) => (
                        <option value={font.value} key={index}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                    {toolBar?.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            style={{
                              borderRight:
                                item?.exeCmd === 'bold'
                                  ? `2px solid ${primaryColor}`
                                  : 'unset',
                              padding: '10px 5px',
                            }}
                          >
                            <button
                              key={index}
                              onMouseDown={
                                item?.exeCmd === 'insertImage'
                                  ? (e) => handleImageAndVdieoByCMD(e, item)
                                  : item?.exeCmd === 'insertVideo'
                                  ? (e) => handleImageAndVdieoByCMD(e, item)
                                  : item?.exeCmd === 'createLink'
                                  ? handleOpenLinkPopover
                                  : (e) => handleMangeCmd(e, item)
                              }
                              style={{
                                backgroundColor: activeCommands[item.exeCmd]
                                  ? `#E7F5FF`
                                  : 'unset',
                              }}
                            >
                              {item?.icon}
                            </button>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </Box>

                  <div
                    ref={editorRef}
                    className='contentEditableArea'
                    id='contentEditableArea'
                    contentEditable={true}
                    role='textbox'
                    style={{
                      border: 'none',
                      outline: 'none',
                      padding: '5px 10px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      fontFamily: 'Inter',
                      fontSize: `16px`,
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Backspace') {
                        console.log('event', event.key);
                      }
                    }}
                    onBlur={handleBlur}
                    onPaste={(event) => {
                      event.preventDefault();
                      const text = event.clipboardData.getData('text/plain');
                      document.execCommand('insertText', false, text);
                    }}
                    onInput={(e) => {
                      setNewPost({
                        ...newPost,
                        description: e.target.innerHTML,
                      });
                      if (e.target.innerText === '<br>') {
                        setActiveCommands({});
                        setIsCapitilize(false);
                        setIsLowerCase(false);
                        setIsUpperCase(false);
                      }
                    }}
                  />
                </div>

                {showLinkPopover && (
                  <LinkPopover
                    onLinkAdded={handleLinkAdded}
                    onClose={handleCloseLinkPopover}
                    position={popoverPositions}
                    url={url}
                    setUrl={setUrl}
                  />
                )}
                {videoSizeError !== '' ? (
                  <p style={{ color: red }} className='text-sm'>
                    {videoSizeError}
                  </p>
                ) : null}
                {imageSizeError !== '' ? (
                  <p style={{ color: red }} className='text-sm'>
                    {imageSizeError}
                  </p>
                ) : null}
              </div>
            </div>
            {/* Second Section */}
            <div
              className='w-1/4 text-white'
              style={{ backgroundColor: secondaryColor }}
            >
              <Tabs
                TabIndicatorProps={{
                  style: {
                    background: yellow,
                  },
                }}
                value={value}
                onChange={handleTabValue}
                aria-label='basic tabs example'
                sx={{ borderBottom: `1px solid ${primaryColor}` }}
              >
                <Tab
                  style={{
                    textTransform: 'none',
                    fontSize: 13,
                    fontFamily: 'Inter-Medium',
                    color: value === 0 ? white : gray,
                  }}
                  label='Post'
                  {...a11yProps(0)}
                />
                <Tab
                  style={{
                    textTransform: 'none',
                    fontSize: 13,
                    fontFamily: 'Inter-Medium',
                    color: value === 1 ? white : gray,
                  }}
                  label='Block'
                  {...a11yProps(1)}
                />
              </Tabs>

              <TabPanel value={value} index={0}>
                <div className={`py-5 px-4 border-b border-[${primaryColor}]`}>
                  <p className='text-sm'>Summary</p>
                  <div className='mt-5 flex flex-col gap-5'>
                    <p className='text-sm flex justify-between'>
                      <span style={{ color: gray }}>Visibility</span>
                      <span
                        style={{ color: yellow }}
                        className='underline cursor-pointer'
                        onClick={handleClick}
                      >
                        {newPost?.visibility === 'public'
                          ? 'Public'
                          : 'Private'}
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
                        value={`${newPost.url}${newPost.customURI}`}
                        onChange={handleOnChangeURL}
                      />
                      <span className={`text-xs mt-1 text-red-500`}>
                        {newPostMediaError.type === 'uriError' &&
                          newPostMediaError.message}
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className={`py-5 px-4 flex justify-between items-center border-b border-[${primaryColor}]`}
                >
                  {id && (
                    <p
                      style={{ color: red }}
                      className={`text-sm font-medium cursor-pointer p-2 hover:bg-red-600/5 rounded-[8px]  duration-200`}
                      onClick={() => setIsOpenDeleteModal(true)}
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
                    onClick={() => navigate('/pages')}
                  >
                    Cancel
                  </Button>
                </div>
                <div className={`py-5 px-4 border-b  border-[${primaryColor}]`}>
                  <p className='text-sm'>Tags</p>

                  <Box>
                    {tagsList.length > 0 && (
                      <Box
                        sx={{
                          margin: '0 0.2rem 0 0',
                          display: 'flex',
                          flexWrap: 'wrap',
                          color: white,
                          gap: '5px',
                          marginBottom: '8px',
                          marginTop: '8px',
                        }}
                      >
                        {tagsList?.map((tag, index) => {
                          return (
                            <Chip
                              variant='filled'
                              size='small'
                              deleteIcon={<CloseRoundedIcon />}
                              key={index}
                              label={tag}
                              onDelete={() =>
                                setTagsList((prev) => {
                                  return prev.filter((t) => t !== tag);
                                })
                              }
                              sx={{
                                color: white,
                                borderRadius: '4px',
                                backgroundColor: primaryColor,
                                '& .MuiChip-deleteIcon': {
                                  color: white,
                                  '&:hover': {
                                    color: yellow,
                                  },
                                },
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                    <input
                      type='text'
                      placeholder='Enter Tag'
                      className={`p-3 text-[13px] mt-2 w-full !border-[${yellow}] border-[1px] rounded-[8px] font-["Inter"]`}
                      style={{
                        backgroundColor: primaryColor,
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (e.target.value !== '') {
                            setTagsList([...tagsList, e.target.value]);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                  </Box>
                </div>
                <div className={`py-5 px-4 border-b border-[${primaryColor}]`}>
                  <p className='text-sm'>Featured Image</p>
                  {newPostMedia.featureImage !== '' ? (
                    <Box component='div'>
                      <img
                        src={
                          newPostMedia?.featureImage !== '' &&
                          (newPostMedia.featureFrom === 'link'
                            ? newPostMedia?.featureImage?.url?.replaceAll(
                                'downlaod',
                                'view'
                              )
                            : URL.createObjectURL(newPostMedia?.featureImage))
                        }
                        alt={'Feature Image'}
                        className='rounded-lg h-[145px] w-[100%] mt-[15px] mb-[15px]'
                        style={{ objectFit: 'cover' }}
                      />
                      {newPostMediaError.type === 'featureImage' ? (
                        <p
                          style={{ color: red }}
                          className='text-[12px] w-full mb-[15px]'
                        >
                          {newPostMediaError.message}
                        </p>
                      ) : null}
                      <div className='flex justify-between flex-row-reverse items-center'>
                        <p
                          style={{ color: red }}
                          className={`text-sm font-medium cursor-pointer p-2 hover:bg-red-600/5 rounded-[8px]  duration-200`}
                          onClick={() => {
                            setDeletedIds((prev) => [
                              ...prev,
                              newPostMedia?.featureImage,
                            ]);
                            setNewPostMedia((pre) => ({
                              ...pre,
                              featureImage: '',
                            }));
                            setNewPostMediaError({ type: '', message: '' });
                          }}
                        >
                          <DeleteOutlineOutlinedIcon
                            size='small'
                            sx={{ color: red }}
                          />
                          Remove
                        </p>
                        <label
                          htmlFor='file-input'
                          className={`border border-[${yellow}] text-[${yellow}] m-aut self-start cursor-pointer text-sm font-medium p-2 rounded-[8px]  duration-200`}
                        >
                          Replace Image
                          <input
                            accept='image/*'
                            id='file-input'
                            type='file'
                            className='hidden'
                            onChange={(e) => {
                              handleOnChangeFeatureImage(e?.target?.files);
                            }}
                            onClick={() => {
                              setNewPostMediaError({ type: '', message: '' });
                            }}
                          />
                        </label>
                      </div>
                    </Box>
                  ) : (
                    <DragDropFile
                      accept='image/*'
                      onDrop={handleDropFeatureImage}
                      removeImage={handleRemoveImage}
                      selectedFiles={[]}
                      onChange={handleOnChangeFeatureImage}
                      onClick={onInputClick}
                      error={
                        newPostMediaError.type === 'featureImage' &&
                        newPostMediaError.message
                      }
                      showStaticFiles={true}
                      hideErrorFn={hideErrorMessages}
                    />
                  )}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* TypoGraphy */}
                <Box display={isShowBlock.isTypoOptions ? 'block' : 'none'}>
                  <div
                    className={`py-5 px-4 border-b border-[${primaryColor}]`}
                  >
                    <p className='text-sm mb-[10px]'>Paragraph</p>
                    <span style={{ color: gray }} className='text-[13px]'>
                      Start with the basic building block of all narrative.
                    </span>
                  </div>
                  <div
                    className={`py-5 px-4 border-b border-[${primaryColor}]`}
                  >
                    <p className='text-sm mb-[10px]'>Typography</p>

                    <div className='mt-[20px]'>
                      <p className='text-[11px] pb-[8px]'>Letter Case</p>
                      <div className='flex gap-2'>
                        <div
                          className={`w-[40px] text-[13px] h-[40px] cursor-pointer rounded-[8px]  text-center flex items-center justify-center`}
                          style={{
                            backgroundColor: Boolean(letterCases.underscore)
                              ? primaryColor
                              : 'unset',
                          }}
                          onClick={() => handleTypoOptions('underline')}
                        >
                          −
                        </div>
                        <div
                          className='w-[40px] h-[40px] text-[13px] cursor-pointer rounded-[8px]  text-center flex items-center justify-center'
                          style={{
                            backgroundColor: Boolean(isCapitilize)
                              ? primaryColor
                              : 'unset',
                          }}
                          onClick={() => handleTypoOptions('capitalize')}
                        >
                          Aa
                        </div>
                        <div
                          className='w-[40px] h-[40px] text-[13px] cursor-pointer rounded-[8px]  text-center flex items-center justify-center'
                          style={{
                            backgroundColor: Boolean(isUpperCase)
                              ? primaryColor
                              : 'unset',
                          }}
                          onClick={() => handleTypoOptions('uppercase')}
                        >
                          AA
                        </div>
                        <div
                          className='w-[40px] h-[40px] text-[13px] cursor-pointer rounded-[8px] text-center flex items-center justify-center'
                          style={{
                            backgroundColor: Boolean(isLowerCase)
                              ? primaryColor
                              : 'unset',
                          }}
                          onClick={() => handleTypoOptions('lowercase')}
                        >
                          aa
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
                {/* ImageGraphy */}
                <Box display={isShowBlock.isImageOptions ? 'block' : 'none'}>
                  <div
                    className={`py-5 px-4 border-b border-[${primaryColor}]`}
                  >
                    <p className='text-sm mb-[10px]'>Image</p>
                    <span style={{ color: gray }} className='text-[13px]'>
                      Insert an image to make a visual statement.
                    </span>
                  </div>
                  <div
                    className={`py-5 px-4 border-b border-[${primaryColor}]`}
                  >
                    <p className='text-sm mb-[10px]'>Settings</p>
                    <div className='mt-[20px]'>
                      <p className='text-[11px] pb-[8px]'>Image Size</p>
                      <SelectDropdown
                        className={'mt-0 '}
                        width={'100%'}
                        popoverWidth={'17vw'}
                        bgColor={primaryColor}
                        list={imageSizeList}
                        value={imageSize === '' ? imageSizeList[0] : imageSize}
                        placeholder='Select'
                        onClick={(value) => {
                          setImageSize(value);
                        }}
                      />
                    </div>
                    {Boolean(imageSize?.value === 'custom') && (
                      <div className='flex gap-5 mt-[20px]'>
                        <div>
                          <p className='text-[11px] pb-[8px]'>Width</p>
                          <input
                            type='text'
                            placeholder='Size'
                            className={`p-3 text-[13px] w-full !border-[${yellow}] border-[1px] rounded-[8px] font-["Inter"]`}
                            style={{
                              backgroundColor: primaryColor,
                            }}
                            value={imageWidth}
                            onChange={(e) => {
                              const value = e.target.value;
                              const numericVal = value.replace(/[^0-9.]/, '');
                              setImageWidth(numericVal);
                            }}
                          />
                        </div>
                        <div>
                          <p className='text-[11px] pb-[8px]'>Height</p>
                          <input
                            type='text'
                            placeholder='Size'
                            className={`p-3 text-[13px] w-full !border-[${yellow}] border-[1px] rounded-[8px] font-["Inter"]`}
                            style={{
                              backgroundColor: primaryColor,
                            }}
                            value={imageHeight}
                            onChange={(e) => {
                              const value = e.target.value;
                              const numericVal = value.replace(/[^0-9.]/, '');
                              setImageHeight(numericVal);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Box>
                {/* Video Graphy */}
                <Box display={isShowBlock.isVideoOptions ? 'block' : 'none'}>
                  <div
                    className={`py-5 px-4 border-b border-[${primaryColor}]`}
                  >
                    <p className='text-sm mb-[10px]'>Video</p>
                    <span style={{ color: gray }} className='text-[13px]'>
                      Embed a video from your media library or insert a new one
                      from URL.
                    </span>
                  </div>
                  <div
                    className={`py-5 px-4 border-b border-[${primaryColor}]`}
                  >
                    <p className='text-sm mb-[10px]'>Settings</p>

                    <div>
                      <MuiSwtich
                        label={'Autoplay'}
                        checked={Boolean(newPostVideoSettings?.autoplay)}
                        onChange={handleOnChangeVideoSetting}
                        name='autoplay'
                      />
                      <MuiSwtich
                        label={'Loop'}
                        checked={Boolean(newPostVideoSettings?.loop)}
                        onChange={handleOnChangeVideoSetting}
                        name='loop'
                      />
                      <MuiSwtich
                        label={'Muted'}
                        checked={Boolean(newPostVideoSettings?.muted)}
                        onChange={handleOnChangeVideoSetting}
                        name='muted'
                      />
                      <MuiSwtich
                        label={'Playback controls'}
                        checked={Boolean(
                          newPostVideoSettings?.playbackControls
                        )}
                        onChange={handleOnChangeVideoSetting}
                        name='playbackControls'
                      />
                      <MuiSwtich
                        label={'Play inline'}
                        checked={Boolean(newPostVideoSettings?.playInline)}
                        onChange={handleOnChangeVideoSetting}
                        name='playInline'
                      />
                    </div>
                  </div>
                </Box>
              </TabPanel>
            </div>
          </section>
        )}
      </div>

      {/* Visibiblity PopOver */}
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
              checked={Boolean(newPost?.visibility === 'public')}
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
              checked={Boolean(newPost?.visibility === 'password_protected')}
            />
            <div className='flex  flex-col '>
              <span className='text-[13px] mt-[15px]'>Password protected</span>
              <p className={`text-[11px] text-[${gray}]`}>
                Only those the password can view this page.
              </p>
            </div>
          </Box>
          {newPost?.visibility === 'password_protected' &&
            newPost?.visibility !== '' && (
              <Box mt='10px'>
                <input
                  name='password'
                  placeholder='Enter Password'
                  className={`bg-transparent p-3 text-[12px] w-full !border-[${yellow}] border-[1px] rounded-[8px] `}
                  value={newPost?.password}
                  onChange={(e) =>
                    setNewPost((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </Box>
            )}
        </Box>
      </Popover>

      {/* Delete Blog Page Modal */}
      <DeleteBlogPage
        open={isOpenDeleteModal}
        data={deleteBlogData}
        close={closeDeleteModal}
        onDelete={handleOnDelete}
        loading={deleteLoading}
        error={deleteError}
      />
    </React.Fragment>
  );
};

export default AddNewBlogPage;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ height: window.innerHeight * 0.86, fontFamily: 'Inter' }}
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
