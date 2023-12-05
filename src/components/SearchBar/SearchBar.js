// Library Imports
import React from 'react'
import Close from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';


// Local Imports
import './style.css'
import { gray, secondaryColor } from '../../utils/style/GlobalVariables';


export const SearchBar = ({ onChange, value, onSearch, disabled, onClear, fromDropDown }) => {

  return (
    <div style={{ background: secondaryColor, height: 38, width: '100%', borderBottomRightRadius: fromDropDown ? 0 : 8, borderBottomLeftRadius: fromDropDown ? 0 : 8 }} className="flex flex-row align-items-center rounded-lg pointer p-2">
      <div onClick={onSearch} className="-mt-1 cursor-pointer"><SearchIcon fontSize='small' color='secondary' /></div>
      <input
        disabled={disabled} onChange={onChange} value={value}
        className={`textarea pl-2 ${disabled ? "cursor-not-allowed" : ""}`} placeholder="Search" type="text"
        id='Search'
        style={{
          color: gray,
          fontFamily: 'Inter-Regular',
          fontSize: 13
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch()
          }
        }}
      />
      <div onClick={onClear} className="flex items-center ms-2 cursor-pointer">
        {value && <Close fontSize='small' color='secondary' />}
      </div>
    </div>
  );

}
