// Library Imports
import React from 'react'
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Checkbox from "@mui/material/Checkbox";
import Slider from '@mui/material/Slider';

// Local Imports
import { gray, white, yellow, primaryColor } from "../utils/style/GlobalVariables";
import Radio from "./RadioButton/Radio";

// To Show Value Of Range
function valuetext(value) {
    return `$${value}`;
}

export const Dropdown = ({
    options, title, handleClickForParent, listOpen, type, onChangeFilter,
    rangeValue, minValue, maxValue, handleChanges, clearPriceRange, listingCallWithPriceRange

}) => {

    return (
        <div>
            <ListItemButton
                onClick={() => handleClickForParent(title)}
                className='dropdown'
            >
                <ListItemText
                    primary={title}
                    sx={{ opacity: 1 }}
                    primaryTypographyProps={{
                        fontSize: 13,
                        fontFamily: 'Inter-Regular',
                        letterSpacing: "normal",
                        align: "left",
                        color: white,
                    }}
                />
                {Object.values(options).length > 0 &&
                    (listOpen[title] ? (
                        <ExpandLessIcon
                            sx={{
                                color: gray,
                                fontSize: 18,
                            }}
                            className="mr-[-3px]"
                        />
                    ) : (
                        <ExpandMoreIcon
                            sx={{
                                color: gray,
                                fontSize: 18
                            }}
                            className="mr-[-3px]"
                        />
                    ))}
            </ListItemButton>
            <div className='max-h-44 overflow-y-scroll'>
                {
                    Object.values(options).map((item, index) => (
                        <div className={`${type === "radio" ? 'px-3' : 'px-4'}`} key={index}>
                            <Collapse
                                in={listOpen[title]}
                                timeout="auto"
                                unmountOnExit>
                                {type === "checkbox" && (
                                    <div key={index} className="flex flex-row mb-1">
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
                                            onChange={() => onChangeFilter(item, index)}
                                            checked={item.value}
                                            name={item.title}
                                            color={"success"}
                                        />
                                        <p className={`interRegular_11 ${item.value ? 'ml-[-0.5px]' : 'ml-2'} capitalize text-white`}>
                                            {item?.title?.includes('_') ? item.title?.replace("_", " ") : item?.title}
                                        </p>
                                    </div>
                                )}
                                {type === "radio" && <Radio
                                    onChange={() => onChangeFilter(item, index)} name={item.title}
                                    label={item.title} checked={item.value}
                                />}
                                {type === "range" && <div className='px-4 mt-4'>
                                    <Slider
                                        sx={{
                                            '& .MuiSlider-rail': {
                                                backgroundColor: gray,
                                            },
                                            '& .MuiSlider-thumb': {
                                                height: 8,
                                                width: 8,
                                                backgroundColor: yellow,
                                            },
                                            '& .MuiSlider-track': {
                                                height: 5.5,
                                                backgroundColor: yellow,
                                            },
                                            '& .MuiSlider-valueLabel': {
                                                width: 60,
                                                height: 24,
                                                backgroundColor: primaryColor,
                                                color: yellow
                                            }
                                        }}
                                        value={rangeValue}
                                        min={minValue}
                                        max={maxValue}
                                        onChange={handleChanges}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                        valueLabelFormat={valuetext}
                                    />
                                    <div className='flex flex-row justify-end'>
                                        <p onClick={() => clearPriceRange(title?.includes("Sale") ? "buy" : "lease")}
                                            className='breadCrumbsYellowText cursor-pointer mr-5'>
                                            Reset
                                        </p>
                                        <p onClick={listingCallWithPriceRange}
                                            className='breadCrumbsYellowText cursor-pointer'>
                                            Apply
                                        </p>
                                    </div>
                                </div>}

                            </Collapse>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}