// Library Imports
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


// Local Imports
import "./Layout.css";
import items from "../../navigation/routes/sideMenuRoutes";
import AssetsImages from "../../assets";
import { primaryColor, secondaryColor, white, gray, yellow } from "../style/GlobalVariables";
import AccountMenu from './AccountMenu'

const Layout = ({ children }) => {


  const navigate = useNavigate();
  const location = useLocation();

  const [listOpen, setListOpen] = useState([]);

  useEffect(() => {
    let path = location.pathname.substring(1, location.pathname.lastIndexOf("/"));
    let pathFirstLetterCap = path.charAt(0).toUpperCase();
    let finalPath = pathFirstLetterCap + location.pathname.substring(1, location.pathname.lastIndexOf("/")).slice(1);

    setListOpen({
      ...listOpen,
      [finalPath]: true,
    })
    
    // eslint-disable-next-line
  }, [])

  const handleClickForParent = (obj) => {

    obj.childs.length === 0 && navigate(obj.path);
    if (obj.childs.length > 0) {
      setListOpen({
        ...listOpen,
        [obj.text]: !listOpen[obj.text],
      });
    }

  };

  const handleClickForChild = (child) => {
    navigate(child.path);
  };


  return (

    <div className="flex h-screen">
      {/* Side Menu */}
      <div style={{ backgroundColor: secondaryColor, width: 300 }} className="item overflow-y-scroll flex flex-col pt-5">
        <img className='h-14 w-48 self-center mb-8' alt='LUXE LOCKER' src={AssetsImages.logo} />
        <List style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {items.map((item, index) => {
              return (
                <div className="" key={item.text}>
                  <ListItemButton
                    onClick={() => handleClickForParent(item)}
                    className={listOpen[item.text] ? (
                      listOpen[item.text], location.pathname.substring(1, location.pathname.lastIndexOf("/")) === item.path.substring(1) &&
                      "active"
                    ) : (
                      location.pathname === item.path && "active"
                    )}
                    sx={{
                      minHeight: 48,
                      px: ((listOpen[item.text] && location.pathname.substring(1, location.pathname.lastIndexOf("/")) === item.path.substring(1)) || location.pathname === item.path)
                        ? 1.2 : 2.5,
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 1,
                        justifyContent: "center",
                      }}>
                      {listOpen[item.text] ? (
                        listOpen[item.text], location.pathname.substring(1, location.pathname.lastIndexOf("/")) === item.path.substring(1) ?
                          item.activeIcon : item.icon
                      ) : location.pathname === item.path ? item.activeIcon : item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: 1 }}
                      primaryTypographyProps={{
                        fontSize: 12.5,
                        fontFamily: 'Inter-Medium',
                        letterSpacing: "normal",
                        align: "left",
                        color: listOpen[item.text] ? (
                          listOpen[item.text], location.pathname.substring(1, location.pathname.lastIndexOf("/")) === item.path.substring(1) ?
                            yellow : white
                        ) : location.pathname === item.path ? yellow : white,
                      }}
                    />
                    {item.childs.length > 0 &&
                      (listOpen[item.text] ? (
                        <ExpandLessIcon
                          sx={{
                            color: gray,
                            fontSize: 20
                          }}
                        // fontSize="small"
                        />
                      ) : (
                        <ExpandMoreIcon
                          sx={{
                            color: gray,
                            fontSize: 20
                          }}
                        // fontSize="small"
                        />
                      ))}
                  </ListItemButton>
                  {item.childs.map((child, index1) => (
                    <div key={index1}>
                      <Collapse
                        in={listOpen[item.text]}
                        timeout="auto"
                        unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton
                            className={`${location.pathname === child.path
                              ? "active"
                              : null} left-8 w-[245px]`}
                            sx={{ mt: 0.7 }}
                            onClick={() => handleClickForChild(child)}>
                            <ListItemText
                              primary={child.text}
                              primaryTypographyProps={{
                                fontSize: 13,
                                fontFamily: 'Inter-Medium',
                                color: location.pathname === child.path ? yellow : white,
                                marginLeft: location.pathname !== child.path && 1.25
                              }}
                              className="sm:ml-0 ml-1"
                            />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="profile-container">
            <div className="d-flex flex-row align-items-center pb-3 pl-3">
              <AccountMenu />

            </div>

          </div>
        </List>
      </div>
      {/* Screen View */}
      <div style={{ backgroundColor: primaryColor, width: `calc(100% - 300px)` }} className="item overflow-y-scroll">
        {children}
      </div>
    </div>

  );
};

export default Layout;
