import TextField from '../../../../../../components/inputField';
import { Styles } from '../../../../../../utils/style/GlobalStyles';
import RichTextInput from '../../../../../../components/RichTextInput';
import { useState } from 'react';
import {
  gray,
  primaryColor,
  red,
  secondaryColor,
  white,
  yellow,
} from '../../../../../../utils/style/GlobalVariables';
import { TextField as MuiTextField } from '@mui/material';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Radio from '../../../../../../components/RadioButton/Radio';
import MuiSwtich from '../../../../../../components/MUISwtich';

const Unit = ({
  newUnit,
  setNewUnit,
  onDeleteUnitPage,
  isEmpty,
  onChange,
  setIsEmptyToInit,
  uriError,
  onChangeURI,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const visibilityId = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVisibilityChange = (event) => {
    setNewUnit((prevUnitData) => ({
      ...prevUnitData,
      unitVisibility: event.target.value.toUpperCase(),
    }));
  };
  console.log(newUnit);
  return (
    <div className='-mt-4 h-[480px] main-container overflow-y-scroll'>
      <section className='w-full flex flex-col overflow-auto pb-5 px-3'>
        <div className='w-full'>
          <TextField
            value={newUnit?.unitTitle}
            onChange={onChange}
            label={'Unit Title'}
            type='text'
            name='unitTitle'
            error={isEmpty?.unitPage?.title ? true : false}
          />
        </div>

        <div>
          <p style={Styles.smallTextWhite} className='mb-1 mt-[20px]'>
            Description
          </p>
          <div className='w-full h-[200px] overflow-y-scroll bg-[#1B1B23] rounded-lg'>
            <RichTextInput
              value={newUnit?.unitDescription}
              setValue={(value) => {
                setIsEmptyToInit();
                setNewUnit((prevUnit) => ({
                  ...prevUnit,
                  unitDescription: value,
                }));
              }}
            />
          </div>
          {isEmpty?.unitPage?.description ? (
            <p className='text-red-500 text-xs mt-1 pl-1'>
              {isEmpty?.unitPage?.description
                ? 'Description is required'
                : null}
            </p>
          ) : null}
        </div>

        <div
          className='mt-5 text-white rounded-lg'
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
                  {newUnit?.unitVisibility?.toLowerCase() ===
                  'password_protected'
                    ? 'Private'
                    : 'Public'}
                </span>
              </p>
              <div className='flex justify-between items-center'>
                <p className='text-sm flex justify-between'>
                  <span style={{ color: gray }}>Publish</span>
                </p>
                <div className='flex justify-start item-end'>
                  <input
                    type='date'
                    name='publishDate'
                    onChange={(event) => onChangeURI(event)}
                    value={newUnit?.publishDate}
                    className={`bg-transparent hideIcon -mr-3 text-[${yellow}] shadow-none focus:shadow-none focus:border-b focus:border-[${yellow}]`}
                  />
                </div>
              </div>
              <div className='text-sm flex justify-between'>
                <p style={{ color: gray }} className='flex-1'>
                  URl
                </p>
                <div className='flex items-end justify-end flex-col '>
                  <input
                    className={`bg-transparent text-[${yellow}] shadow-none focus:shadow-none focus:border-b focus:border-[${yellow}]`}
                    type='text'
                    value={`${newUnit.url}${newUnit?.customURI}`}
                    onChange={(event) => onChangeURI(event)}
                  />
                  <span className={`text-[12px] text-red-500`}>
                    {uriError !== '' && uriError}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {newUnit?.title === 'Edit Unit' &&
          newUnit?.unitDescription !== undefined &&
          newUnit?.unitPassword !== undefined &&
          newUnit?.unitTitle !== undefined &&
          newUnit?.unitVisibility !== undefined ? (
            <div
              className='py-3 px-4 flex justify-between items-center'
              style={{ borderTopWidth: 1, borderTopColor: primaryColor }}
            >
              <p
                style={{ color: red }}
                className={`text-sm font-medium cursor-pointer p-2 hover:bg-red-600/5 rounded-[8px]  duration-200`}
                onClick={onDeleteUnitPage}
              >
                Move to Trash
              </p>
            </div>
          ) : null}
        </div>

        <div className='mt-5'>
          <div className='flex flex-row gap-3 text-white'>
            <MuiSwtich
              label={'Save Draft'}
              checked={Boolean(newUnit?.unitDraft)}
              onChange={(e) =>
                setNewUnit((prevUnitData) => ({
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
            <Typography color={white} fontSize={14} fontFamily={'Inter-Medium'}>
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
                Boolean(newUnit?.unitVisibility?.toLowerCase() === 'public') ||
                Boolean(newUnit?.unitVisibility === '')
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
                newUnit?.unitVisibility?.toLowerCase() === 'password_protected'
              )}
            />
            <div className='flex flex-col '>
              <span className='text-[13px] mt-[15px]'>Password protected</span>
              <p className={`text-[11px] text-[${gray}]`}>
                Only those the password can view this page.
              </p>
            </div>
          </Box>
          {newUnit?.unitVisibility?.toLowerCase() === 'password_protected' &&
            newUnit?.unitVisibility !== '' && (
              <Box mt='10px'>
                <input
                  name='password'
                  type='password'
                  placeholder='Enter Password'
                  className={`bg-transparent p-3 text-[12px] w-full !border-[${yellow}] border-[1px] rounded-[8px] `}
                  value={newUnit?.unitPassword}
                  onChange={(e) =>
                    setNewUnit((prevUnitData) => ({
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
  );
};

export default Unit;
