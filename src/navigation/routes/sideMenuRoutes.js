// Library Imports
import React from "react";

// Local Imports
import Users from '../screens/Dashboard/Users/Users/Users'
import Campuses from "../screens/Dashboard/Campus";
import FAQ from "../screens/Dashboard/FAQ";

import AssetsImages from "../../assets";
import Units from "../screens/Dashboard/Units";
import Announcements from "../screens/Dashboard/Announcements/Announcements";
import Pages from "../screens/Dashboard/Pages"

const routes = [

  {
    text: "Campus",
    icon: <img className='h-5 w-5' alt='LUXE LOCKER' src={AssetsImages.campus} />,
    activeIcon: <img className='h-[14px] w-[14px] ml-[3.8px] mr-[2.48px]' alt='LUXE LOCKER' src={AssetsImages.campusActive} />,
    component: <Campuses />,
    path: "/campus",
    childs: [],
  },

  {
    text: "Units",
    icon: <img className='h-5 w-5' alt='LUXE LOCKER' src={AssetsImages.unit} />,
    activeIcon: <img className='h-[14px] w-[14px] ml-[3.8px] mr-[2.48px]' alt='LUXE LOCKER' src={AssetsImages.unitActive} />,
    path: "/units",
    component: <Units />,
    childs: [],
  },

  {
    text: 'Users',
    icon: <img className="h-5 w-5" alt="LUXE LOCKER" src={AssetsImages.users} />,
    activeIcon: <img className='h-[14px] w-[11px] ml-[4.2px] mr-[4.6px]' alt="LUXE LOCKER" src={AssetsImages.usersActive} />,
    component: <Users />,
    path: '/users',
    childs: [],
  },

  {
    text: "FAQ",
    icon: <img className='h-5 w-5' alt='LUXE LOCKER' src={AssetsImages.faq} />,
    activeIcon: <img className='h-[14px] w-[14px] ml-[3.8px] mr-[2.48px]' alt='LUXE LOCKER' src={AssetsImages.faqActive} />,
    component: <FAQ />,
    path: "/faq",
    childs: [

    ],
  },

  {
    text: "Announcements",
    icon: <img className='h-5 w-5' alt='LUXE LOCKER' src={AssetsImages.announcement} />,
    activeIcon: <img className='h-[20px] w-[20px] ml-[0.2px] mr-[0.2px]' alt='LUXE LOCKER' src={AssetsImages.announcementActive} />,
    component: <Announcements />,
    path: "/announcements",
    childs: [],
  },

  {
    text: "Pages",
    icon: <img className='h-5 w-5' alt='LUXE LOCKER' src={AssetsImages.site} />,
    activeIcon: <img className='h-[16px] w-[16px] ml-[3px] mr-[0.2px]' alt='LUXE LOCKER' src={AssetsImages.siteActive} />,
    component: <Pages />,
    path: "/pages",
    childs: [],
  },

];

export default routes;
