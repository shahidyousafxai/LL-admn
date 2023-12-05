// Library Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

// Local Imports
import { authUser } from "../../redux/reducers/authReducer";
import { gray, secondaryColor, white, yellow } from "../style/GlobalVariables";
import { Styles } from "../style/GlobalStyles";


export default function AccountMenu() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const user = useSelector((state) => state?.authUser?.authUser)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const clickAwayHandler = () => { setAnchorEl(false) }


  const MyPopper = () => (
    <ClickAwayListener onClickAway={clickAwayHandler}>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div
          style={{ boxShadow: "0px 0px 5px 0px #0F0F14", backgroundColor: secondaryColor }}
          className={`h-20 w-48 p-3 rounded-lg flex flex-col justify-around`}>
          <div
            className="flex flex-row cursor-pointer mb-3"
            onClick={() => navigate("/account-settings")}
          >
            <SettingsIcon
              sx={{
                color: white,
                fontSize: 20
              }}
            />
            <p style={{ color: white, fontFamily: 'Inter-Medium', fontSize: 13, paddingLeft: 10 }}>Account Settings</p>
          </div>
          <div
            className="flex flex-row cursor-pointer"
            onClick={() => {
              dispatch(authUser(null));
              navigate("/", { replace: true })
            }}
          >
            <LogoutSharpIcon
              sx={{
                color: white,
                fontSize: 20
              }}
            />
            <p style={{ color: white, fontFamily: 'Inter-Medium', fontSize: 13, paddingLeft: 10 }}>Log Out</p>
          </div>
        </div>
      </Popper>
    </ClickAwayListener>
  )


  return (
    <>
      {
        anchorEl && <MyPopper />
      }
      <div className="flex flex-row align-middle mx-2 mb-2">
        <div className={`w-10 h-10 rounded-[20px] bg-[${yellow}]`}>
          <p className="pt-[8px]" style={Styles.sideBarAccountDetails}>
            {`${user?.first_name.charAt(0).toUpperCase()}`}
          </p>
        </div>
        <div style={{ flexDirection: 'column', marginTop: 3, marginLeft: 10 }}>
          <p style={Styles.normalLeftTextWhite}>
            {
              (user?.first_name && user?.last_name) ?
                `${user?.first_name.charAt(0).toUpperCase() + user?.first_name.slice(1)} 
                ${user?.last_name.charAt(0).toUpperCase() + user?.last_name.slice(1)}`
                : user?.first_name ? `${user?.first_name.charAt(0).toUpperCase() + user?.first_name.slice(1)}` : ''
            }
          </p>
          <p style={Styles.sideBarEmailText}>
            {`${user?.email}`}
          </p>
        </div>
        <div
          onClick={handleClick}
          style={Styles.sideBarDots}>
          <MoreHorizIcon
            sx={{
              color: gray,
              fontSize: 20,
            }}
          />
        </div>
      </div>
    </>
  );
}
