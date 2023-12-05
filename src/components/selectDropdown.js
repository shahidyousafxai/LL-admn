import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import { ClickAwayListener } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';

import './style.css';
import {
  secondaryColor,
  gray,
  white,
  red,
} from '../utils/style/GlobalVariables';
import { Styles } from '../utils/style/GlobalStyles';
import { SearchBar } from './SearchBar/SearchBar';

const SelectDropdown = ({
  width,
  placeholder,
  name,
  list,
  value,
  label,
  isStateEmpty,
  isCampusEmpty,
  onClick,
  className,
  type,
  popoverWidth,
  bgColor,
  disabled,
}) => {
  useEffect(() => {
    setSearchArray(list);
  }, [list]);

  //***** States *****//
  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState([]);

  // Select Modal States
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //***** Methods *****//

  // Select Modal Methods
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    onClear();
  };
  const clickAwayHandler = () => {
    setAnchorEl(false);
  };

  // Search User Method
  const onChangeSearch = (e) => {
    if (e.target.value !== '') {
      setSearchText(e.target.value);
      let searchedArray = [];
      // eslint-disable-next-line
      list?.map((item) => {
        if (
          item?.title?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item?.full_name
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item?.name?.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return searchedArray.length > 0
            ? searchedArray.push(item)
            : (searchedArray[0] = item);
        }
      });
      setSearchArray(searchedArray);
    } else {
      setSearchText('');
      setSearchArray(list);
    }
  };
  // onSearch Clear
  const onClear = () => {
    setSearchText('');
    setSearchArray(list);
  };

  return (
    <div className={`${className ? className : 'mt-5'}`}>
      {label && (
        <p
          style={{ fontFamily: 'Inter-Regular', fontSize: 11 }}
          className={`text-white mb-1`}
        >
          {label}
        </p>
      )}

      <div
        style={{
          background: bgColor ? bgColor : secondaryColor,
          cursor: 'pointer',
          width: width,
        }}
        onClick={!disabled ? handleClick : null}
        className={`
                h-11 flex flex-row items-center justify-between rounded-lg pl-4 pr-2
                ${anchorEl && '!border-[1px] p-0 rounded-lg !border-[#CDA950]'}
                ${isCampusEmpty && '!border-2 p-0 rounded-lg !border-red-900'}`}
      >
        <p style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: gray }}>
          {value !== ''
            ? value?.name
              ? value?.name
              : value?.title
              ? value?.title
              : value !== undefined
              ? value
              : placeholder
            : placeholder}
        </p>
        <ArrowDropDownIcon fontSize='small' color='secondary' />
      </div>

      {isStateEmpty && (
        <p
          style={{ fontFamily: 'Inter-Regular', fontSize: 11, color: white }}
          className={` mb-1`}
        >
          Note: Please select state first.
        </p>
      )}
      {list?.length === 0 && name !== 'city' ? (
        <p
          style={{ fontFamily: 'Inter-Regular', fontSize: 11, color: white }}
          className={` mb-1`}
        >
          Note: Please add relevant record first.
        </p>
      ) : null}

      {/* Select Options Modal */}
      {anchorEl && (
        <ClickAwayListener onClickAway={clickAwayHandler}>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className='mt-[6px] h-48'
            PaperProps={{
              style: {
                width: popoverWidth,
              },
            }}
          >
            <div className={`flex flex-col rounded-lg`}>
              <div
                style={{ width: width }}
                className='border-b-[1px] border-[#0F0F14]'
              >
                <SearchBar
                  onClear={() => onClear()}
                  onChange={onChangeSearch}
                  value={searchText}
                  fromDropDown
                />
              </div>
              <div style={{ width: width }}>
                {searchArray.length !== 0 ? (
                  <>
                    {searchArray?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            background: secondaryColor,
                            cursor: 'pointer',
                            width: width,
                          }}
                          onClick={() => {
                            onClick(item, name);
                            handleClose();
                          }}
                          className='h-11 w-full flex flex-row items-center justify-between pl-4 pr-2 border-b-[1px] border-[#0F0F14]'
                        >
                          {type === 'switchDropdown' ? (
                            <>
                              <div
                                style={{
                                  flexDirection: 'column',
                                  marginTop: 3,
                                  marginLeft: 10,
                                }}
                              >
                                <p style={Styles.normalLeftTextWhite}>
                                  {item?.full_name && item?.full_name}
                                  {/* For Edit User Payment Section Units */}
                                  {item?.title && item?.title}
                                </p>
                                <p style={Styles.sideBarEmailText}>
                                  {item?.email && item?.email}
                                  {/* For Edit User Payment Section Units */}
                                  {item?.type && item?.type}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <p style={Styles.normalLeftTextWhite}>
                                {item.name ? item.name : item.title}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div
                    style={{
                      background: secondaryColor,
                      cursor: 'pointer',
                      width: width,
                    }}
                    className='flex flex-col items-center py-5'
                  >
                    <DescriptionIcon fontSize='large' color='info' />
                    <p
                      className='mt-2'
                      style={{
                        color: white,
                        fontFamily: 'Inter-Regular',
                        fontSize: 13,
                      }}
                    >
                      No data found.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Popover>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default SelectDropdown;
