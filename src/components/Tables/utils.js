// Library Imports
import React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {
  darkGray,
  green,
  lightGray,
  primaryColor,
  secondaryColor,
} from '../../utils/style/GlobalVariables';
import { Typography } from '@mui/material';
import moment from 'moment';

export const Action = (restProps, callBack, isAdmin) => {
  return (
    <>
      {restProps?.row?.group?.includes('Superadmin') ||
      (isAdmin && restProps?.row?.group?.includes('Admin')) ? null : (
        <div className='flex flex-row justify-end pr-5 '>
          <span
            className='cursor-pointer'
            onClick={() => callBack('edit', restProps.row)}
          >
            <Edit fontSize='small' color='secondary' className='mr-5 ' />
          </span>
          {restProps?.row?.zone ? null : (
            <span
              className='cursor-pointer'
              onClick={() => callBack('delete', restProps.row)}
            >
              <Delete fontSize='small' color='secondary' className='' />
            </span>
          )}
        </div>
      )}
    </>
  );
};

export const EditAction = (restProps, callBack) => {
  return (
        <div className='flex flex-row justify-end pr-5 '>
          <span
            className='cursor-pointer'
            onClick={() => callBack('edit', restProps.row)}
          >
            <Edit fontSize='small' color='secondary' className='mr-5 ' />
          </span>
        </div>
  );
};

export const ForSale = (restProps) => {
  return (
    <div className='flex flex-row justify-start pl-2'>
      <span className='cursor-pointer'>
        {restProps.row.forSale ? (
          <DoneIcon fontSize='small' color='green' />
        ) : (
          <CloseIcon fontSize='small' color='danger' />
        )}
      </span>
    </div>
  );
};

export const ForLease = (restProps) => {
  return (
    <div className='flex flex-row justify-start pl-2'>
      <span className='cursor-pointer'>
        {restProps.row.forLease ? (
          <DoneIcon fontSize='small' color='green' />
        ) : (
          <CloseIcon fontSize='small' color='danger' />
        )}
      </span>
    </div>
  );
};

export const Status = (restProps) => {
  return (
    <div className='flex flex-row justify-start pl-2'>
      <span className='cursor-pointer'>
        {restProps.row.status ? (
          <DoneIcon fontSize='small' color='green' />
        ) : (
          <CloseIcon fontSize='small' color='danger' />
        )}
      </span>
    </div>
  );
};

export const AnnouncementsAction = (restProps, callBack) => {
  return (
    <div className='flex flex-row justify-end pr-5 '>
      <span
        className='cursor-pointer'
        onClick={() =>
          callBack(!restProps?.row?.status ? 'play' : 'pause', restProps.row)
        }
      >
        {!restProps?.row?.status ? (
          <PlayArrowIcon fontSize='small' color='secondary' className='mr-5 ' />
        ) : (
          <PauseIcon fontSize='small' color='secondary' className='mr-5 ' />
        )}
      </span>
      <span
        className='cursor-pointer'
        onClick={() => callBack('restart', restProps.row)}
      >
        <ReplayIcon fontSize='small' color='secondary' className='mr-5 ' />
      </span>
      <span
        className='cursor-pointer'
        onClick={() => callBack('delete', restProps.row)}
      >
        <Delete fontSize='small' color='secondary' className='' />
      </span>
    </div>
  );
};

export const CampusPageStatus = (restProps) => {
  return (
    <div className='flex flex-row justify-start pl-2'>
      <span className='cursor-pointer'>
        {restProps.row.status ? (
          <Typography
            border={`1px solid ${green}`}
            fontSize='12px'
            fontWeight='normal'
            padding='4px 6px'
            borderRadius='8px'
            color={green}
          >
            Published
          </Typography>
        ) : (
          <Typography
            border={`1px solid ${lightGray}`}
            fontSize='12px'
            fontWeight='normal'
            padding='4px 6px'
            borderRadius='8px'
            color={lightGray}
          >
            Draft
          </Typography>
        )}
      </span>
    </div>
  );
};

export const CampusPageDate = (restProps) => {
  const date = restProps.row.date;
  const inputDate = moment(date);
  const formattedDate = inputDate.format('MMMM D, YYYY, h:mm a');

  return (
    <div>
      <span>{formattedDate}</span>
    </div>
  );
};

export const tags = (restProps) => {
  return (
    <div className='flex gap-2'>
      {restProps.row.tags?.slice(0, 3)?.map((tag, index) => (
        <span
          key={index}
          className={`rounded-[4px] w-fit px-2 py-[2px]`}
          style={{ backgroundColor: `${darkGray}` }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
