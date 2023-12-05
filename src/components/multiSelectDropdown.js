import React, { useState, useEffect } from 'react'
import Popover from "@material-ui/core/Popover";
import { ClickAwayListener, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';

import './style.css';
import { secondaryColor, gray, white, red } from '../utils/style/GlobalVariables'
import { Styles } from '../utils/style/GlobalStyles';
import { SearchBar } from './SearchBar/SearchBar';
import Checkbox from './checkBox';

const MultiSelectDropdown = ({
    width, placeholder, list, value, label, isCampusEmpty, onClick, className, onClickSelectAll, selectAll, setSelectAll
}) => {

    useEffect(() => {
        setSearchArray(list)
    }, [list])

    //***** States *****//
    const [searchText, setSearchText] = useState("");
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
        onClear()
    };
    const clickAwayHandler = () => { setAnchorEl(false) }


    // Search User Method
    const onChangeSearch = (e) => {
        if (e.target.value !== "") {
            setSearchText(e.target.value);
            let searchedArray = [];
            // eslint-disable-next-line
            list?.map(item => {
                if (
                    item?.title?.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item?.full_name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item?.name?.toLowerCase().includes(e.target.value.toLowerCase())
                ) {
                    return searchedArray.length > 0 ? searchedArray.push(item) : searchedArray[0] = item;
                }
            })
            setSearchArray(searchedArray)
        } else {
            setSearchText("");
            setSearchArray(list);
        }
    };
    // onSearch Clear
    const onClear = () => {
        setSearchText("");
        setSearchArray(list);
    };

    return (
        <div className={`${className ? className : 'mt-5'}`}>
            {label && (
                <p style={{ fontFamily: 'Inter-Regular', fontSize: 11 }} className={`text-white mb-1`}>
                    {label}
                </p>
            )}

            <div
                style={{ background: secondaryColor, cursor: 'pointer', width: width }}
                onClick={handleClick}
                className={`
                h-11 flex flex-row items-center justify-between rounded-lg pl-4 pr-2
                ${anchorEl && '!border-[1px] p-0 rounded-lg !border-[#CDA950]'}
                ${isCampusEmpty && '!border-2 p-0 rounded-lg !border-red-900'}`}
            >
                <p className='h-10 flex items-center overflow-y-scroll' style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: gray, }}>
                    {
                        value?.length > 0 ?
                            value?.map((item, index) => {
                                const lastIndex = value?.length - 1;
                                return `${item?.name}${index !== lastIndex ? ", " : ""}`
                            }) : (
                                `${placeholder}`
                            )
                    }
                </p>

                <ArrowDropDownIcon fontSize='small' color='secondary' />
            </div>

            {/* Select Options Modal */}
            {
                anchorEl && (
                    <ClickAwayListener onClickAway={clickAwayHandler}>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            className='mt-[6px] h-48'
                        >
                            <div className={`flex flex-col rounded-lg`}>
                                <div style={{ width: width }}>
                                    <div className='border-b-[1px] border-[#0F0F14]'>
                                        <SearchBar
                                            onClear={() => onClear()}
                                            onChange={onChangeSearch} value={searchText}
                                            fromDropDown
                                        />
                                    </div>
                                    <div
                                        className={`h-11 w-full flex flex-row items-center justify-between pl-4 pr-2 bg-[${secondaryColor}] border-b-[1px] border-[#0F0F14]`}
                                    >
                                        <Checkbox
                                            size={'small'}
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    ...(!selectAll ? {
                                                        width: 16,
                                                        height: 16,
                                                        borderStyle: "solid",
                                                        borderRadius: 1,
                                                        borderWidth: 1,
                                                        borderColor: gray,
                                                        position: 'absolute',
                                                    } : {
                                                        width: 18,
                                                        height: 18,
                                                        marginLeft: -1.2,
                                                        marginTop: -1.25,
                                                        marginBottom: -1,
                                                    })
                                                },
                                                "& .PrivateSwitchBase-input .MuiButtonBase-root": {
                                                    width: 18,
                                                    height: 18,
                                                    position: 'relative'
                                                },

                                            }}
                                            onChange={() => { onClickSelectAll(!selectAll); setSelectAll(!selectAll) }}
                                            checked={selectAll}
                                            label={"Select All"}
                                            color={white}
                                        />
                                    </div>
                                    {searchArray.length !== 0 ? (<>
                                        {searchArray?.map((item, index) => {
                                            return (
                                                <div key={index}
                                                    className={`h-11 w-full flex flex-row items-center justify-between pl-4 pr-2 bg-[${secondaryColor}] border-b-[1px] border-[#0F0F14]`}
                                                >
                                                    <Checkbox
                                                        size={'small'}
                                                        sx={{
                                                            "& .MuiSvgIcon-root": {
                                                                ...(!item.value ? {
                                                                    width: 16,
                                                                    height: 16,
                                                                    borderStyle: "solid",
                                                                    borderRadius: 1,
                                                                    borderWidth: 1,
                                                                    borderColor: gray,
                                                                    position: 'absolute',
                                                                } : {
                                                                    width: 18,
                                                                    height: 18,
                                                                    marginLeft: -1.2,
                                                                    marginTop: -1.25,
                                                                    marginBottom: -1,
                                                                })
                                                            },
                                                            "& .PrivateSwitchBase-input .MuiButtonBase-root": {
                                                                width: 18,
                                                                height: 18,
                                                                position: 'relative'
                                                            },

                                                        }}
                                                        onChange={() => onClick(item)}
                                                        checked={value?.some((value) => value?.id === item?.id)}
                                                        label={item.name ? item.name : item.title}
                                                        color={white}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </>) : (
                                        <div
                                            style={{ background: secondaryColor, cursor: 'pointer', width: width }}
                                            className='flex flex-col items-center py-5'>
                                            <DescriptionIcon fontSize='large' color='info' />
                                            <p className='mt-2' style={{ color: white, fontFamily: 'Inter-Regular', fontSize: 13 }}>
                                                No data found.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popover>
                    </ClickAwayListener>
                )
            }

        </div >
    )
}

export default MultiSelectDropdown