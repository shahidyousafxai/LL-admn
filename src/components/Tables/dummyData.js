// Local Import
import AssetsImages from '../../assets';

//************************* Amenity Data Start *******************************//
export const amenityTypesColumnData = [
  { name: 'name', title: 'Name' },
  { name: 'description', title: 'Description' },
  { name: 'action', title: 'Action' },
];

export const amenityTypesColumnExtensionsData = [
  { columnName: 'name', width: 350 },
  { columnName: 'description', width: 300 },
  // { columnName: "action", width: 100 },
];

export const amenityTypesRowData = [
  { id: 1, name: 'Dumpster', description: 'N/A' },
  { id: 2, name: 'Common Water & Hose Bibs', description: 'N/A' },
  { id: 3, name: 'Wash Station', description: 'N/A' },
  { id: 4, name: 'Sewer Dump Station', description: 'N/A' },
  { id: 5, name: 'Restroom & Shower Facility', description: 'N/A' },
  { id: 6, name: 'Large Concrete Drive Isles, min 60’', description: 'N/A' },
  { id: 7, name: 'Security Cameras', description: 'N/A' },
  { id: 8, name: 'Gated Facility with 24/7 Access', description: 'N/A' },
  { id: 9, name: 'Quality Controlled CCR’s', description: 'N/A' },
  { id: 10, name: 'Dumpster', description: 'N/A' },
  { id: 11, name: 'Common Water & Hose Bibs', description: 'N/A' },
  { id: 12, name: 'Common Water & Hose Bibs', description: 'N/A' },
  { id: 13, name: 'Wash Station', description: 'N/A' },
  { id: 14, name: 'Sewer Dump Station', description: 'N/A' },
  { id: 15, name: 'Restroom & Shower Facility', description: 'N/A' },
  { id: 16, name: 'Large Concrete Drive Isles, min 60’', description: 'N/A' },
  { id: 17, name: 'Security Cameras', description: 'N/A' },
  { id: 18, name: 'Gated Facility with 24/7 Access', description: 'N/A' },
  { id: 19, name: 'Quality Controlled CCR’s', description: 'N/A' },
  { id: 20, name: 'Sewer Dump Station', description: 'N/A' },
  { id: 21, name: 'Wash Station', description: 'N/A' },
  { id: 22, name: 'Security Cameras', description: 'N/A' },
];
//************************* Amenity Data End *******************************//

//************************* User Data Start *******************************//
export const usersColumnData = [
  { name: 'Sr#', title: 'Sr#' },
  { name: 'fname', title: 'Name' },
  { name: 'email', title: 'Email' },
  { name: 'group', title: 'Group' },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'Action' },
];
export const usersRowData = [
  {
    id: 1,
    name: 'Adam Pakes',
    email: 'arifk@tellmeyourgoal.com',
    group: 'Additional User',
    status: false,
  },
  {
    id: 2,
    name: 'Nicole Caravella',
    email: 'nicole@tellmeyourgoal.com',
    group: 'Admin',
    status: false,
  },
  {
    id: 3,
    name: 'Ashleigh Young',
    email: 'ashyoung05@gmail.com',
    group: 'Lesee',
    status: false,
  },
  {
    id: 4,
    name: 'Calvin Kwang Na',
    email: 'calvin.na@gmail.com',
    group: 'Vendor',
    status: true,
  },
  {
    id: 5,
    name: 'Charley Narcomey',
    email: 'charley.narcomey@luxelocker.com',
    group: 'Owner',
    status: true,
  },
  {
    id: 6,
    name: 'Jack Smith',
    email: 'Jack@example.com',
    group: 'Staff',
    status: true,
  },
  {
    id: 7,
    name: 'May Barnes',
    email: 'hirek@bu.com',
    group: 'Additional User',
    status: true,
  },
  {
    id: 8,
    name: 'Colby Steel',
    email: 'colby@summerlinam.com',
    group: 'Vendor',
    status: true,
  },
  {
    id: 9,
    name: 'Jasmyne Jenkins',
    email: 'jenkinsjasmyne1@gmail.com',
    group: 'Owner',
    status: false,
  },
];
export const usersColumnExtensionsData = [
  { columnName: 'Sr#', width: 100 },
  { columnName: 'fname', width: 250 },
  { columnName: 'action', width: 100 },
];

//************************* User Data End *******************************//

//************************* Personal Setting Data Start *******************************//
// Account Settings Screen Side Bar Data
export const settingsList = [
  {
    id: 1,
    title: 'Personal Information',
    idName: 'Personal_Information',
    icon: (
      <img
        className='h-6 w-6'
        style={{ filter: 'brightness(0) invert(1)' }}
        alt='LUXE LOCKER'
        src={AssetsImages.users}
      />
    ),
    iconActive: (
      <img
        className='h-6 w-6'
        style={{ filter: 'brightness(0) invert(0)' }}
        alt='LUXE LOCKER'
        src={AssetsImages.users}
      />
    ),
    desp: 'Update your personal details here.',
    component: <h1>hello</h1>,
  },
  {
    id: 2,
    title: 'Password',
    idName: 'Password',
    icon: (
      <img
        className='h-6 w-6'
        style={{ filter: 'brightness(0) invert(1)' }}
        alt='LUXE LOCKER'
        src={AssetsImages.access}
      />
    ),
    iconActive: (
      <img
        className='h-6 w-6'
        style={{ filter: 'brightness(0) invert(0)' }}
        alt='LUXE LOCKER'
        src={AssetsImages.access}
      />
    ),
    desp: 'Please enter your current password to change your password',
    component: <h1>Personal In</h1>,
  },
  // {
  //   id: 3,
  //   title: 'Email',
  //   idName: 'Email',
  //   icon: (
  //     <img
  //       className="h-6 w-6"
  //       style={{ filter: 'brightness(0) invert(1)' }}
  //       alt="LUXE LOCKER"
  //       src={AssetsImages.email}
  //     />
  //   ),
  //   iconActive: (
  //     <img
  //       className="h-6 w-6"
  //       style={{ filter: 'brightness(0) invert(0)' }}
  //       alt="LUXE LOCKER"
  //       src={AssetsImages.email}
  //     />
  //   ),
  //   desp: 'Please enter your current password to change your password',
  //   component: <h1>hello</h1>,
  // },
  // {
  //   id: 4,
  //   title: 'Notification Settings',
  //   idName: 'Notification_Settings',
  //   icon: (
  //     <img
  //       className="h-6 w-6"
  //       style={{ filter: 'brightness(0) invert(1)' }}
  //       alt="LUXE LOCKER"
  //       src={AssetsImages.notification}
  //     />
  //   ),
  //   iconActive: (
  //     <img
  //       className="h-6 w-6"
  //       style={{ filter: 'brightness(0) invert(0)' }}
  //       alt="LUXE LOCKER"
  //       src={AssetsImages.notification}
  //     />
  //   ),
  //   desp: 'Set your notification preference for when you are in of away from the system.',
  //   component: <h1>hello</h1>,
  // },
];
//************************* Personal Setting Data End *******************************//

//************************* Edit User Data Start *******************************//
export const editUserNav = [
  {
    id: 1,
    title: 'General Information',
  },
  {
    id: 2,
    title: 'Group Settings',
  },
  // {
  //   id: 3,
  //   title: 'Other Information',
  // },
  {
    id: 3,
    title: 'Payments',
  },
];

export const groupsList = [
  {
    id: 1,
    title: 'Additional User',
    desp: 'The quick brox jumps over the lazy dog',
  },
  {
    id: 2,
    title: 'Owner',
    desp: 'The quick brox jumps over the lazy dog',
  },
  {
    id: 3,
    title: 'Vendor',
    desp: 'The quick brox jumps over the lazy dog',
  },
  {
    id: 4,
    title: 'Lessee',
    desp: 'The quick brox jumps over the lazy dog',
  },
  {
    id: 5,
    title: 'Staff',
    desp: 'The quick brox jumps over the lazy dog',
  },
  {
    id: 6,
    title: 'Admin',
    desp: 'The quick brox jumps over the lazy dog',
  },
  {
    id: 7,
    title: 'Superadmin',
    desp: 'The quick brox jumps over the lazy dog',
  },
];
//************************* Edit User Data End *******************************//

//************************* Zones Data Start *******************************//
export const zonesColumnData = [
  { name: 'name', title: 'Name' },
  { name: 'city', title: 'City' },
  { name: 'state', title: 'State' },
  { name: 'action', title: 'Action' },
];

export const zonesColumnExtensionsData = [
  { columnName: 'name', width: 500 },
  { columnName: 'city', width: 300 },
  { columnName: 'state', width: 300 },
];

export const zonesRowData = [
  { id: 1, name: 'Albuquerque', city: 'Albuquerque', state: 'Ne' },
  { id: 2, name: 'Glendale', city: 'Glendale', state: 'AZ' },
  { id: 3, name: 'Chandler', city: 'Chandler', state: 'AZ' },
  { id: 4, name: 'Prescott', city: 'Prescott', state: 'AZ' },
  { id: 5, name: 'Boise', city: 'Boise', state: 'ID' },
  { id: 6, name: 'Washington', city: 'Richland', state: 'WA' },
  { id: 7, name: 'Henderson', city: 'Henderson', state: 'NV' },
  { id: 8, name: 'Nevada', city: 'Spanish Springs', state: 'NV' },
  { id: 9, name: 'Glendale', city: 'Glendale', state: 'AZ' },
  { id: 10, name: 'Albuquerque', city: 'Albuquerque', state: 'Ne' },
  { id: 11, name: 'Glendale', city: 'Glendale', state: 'AZ' },
  { id: 13, name: 'Chandler', city: 'Chandler', state: 'AZ' },
  { id: 14, name: 'Prescott', city: 'Prescott', state: 'AZ' },
  { id: 15, name: 'Boise', city: 'Boise', state: 'ID' },
  { id: 16, name: 'Washington', city: 'Richland', state: 'WA' },
  { id: 17, name: 'Henderson', city: 'Henderson', state: 'NV' },
  { id: 18, name: 'Nevada', city: 'Spanish Springs', state: 'NV' },
  { id: 19, name: 'Glendale', city: 'Glendale', state: 'AZ' },
  { id: 20, name: 'Prescott', city: 'Prescott', state: 'AZ' },
  { id: 21, name: 'Chandler', city: 'Chandler', state: 'AZ' },
  { id: 22, name: 'Henderson', city: 'Henderson', state: 'NV' },
];
//************************* Zones Data End *******************************//

//************************* Campuses Data Start *******************************//
export const campusesColumnData = [
  { name: 'zone', title: 'Zone' },
  { name: 'campusName', title: 'Name' },
  { name: 'streetAddress', title: 'Street' },
  { name: 'postalCode', title: 'Postalcode' },
  { name: 'latitude', title: 'Latitude' },
  { name: 'longitude', title: 'Longitude' },
  { name: 'numOfUnits', title: 'Number of Units' },
  { name: 'status', title: 'Active' },
  { name: 'action', title: 'Action' },
];
export const campusesColumnExtensionsData = [
  { columnName: 'zone', width: 200 },
  { columnName: 'campusName', width: 200 },
  { columnName: 'streetAddress', width: 250 },
  { columnName: 'postalCode', width: 150 },
  { columnName: 'latitude', width: 150 },
  { columnName: 'longitude', width: 150 },
  { columnName: 'numOfUnits', width: 150 },
  { columnName: 'status', width: 100 },
];
export const campusesRowData = [
  {
    id: 1,
    zone: 'Arizona West',
    campusName: 'Lake Havasu, AZ',
    streetAddress: '3204 Sweet Water Ave',
    postalCode: '-',
    latitude: 0.0,
    longitude: 0.0,
    numOfUnits: 1,
    status: true,
  },
  {
    id: 2,
    zone: 'Albuquerque',
    campusName: 'Albuquerque, NM',
    streetAddress: '133 Riverwood St',
    postalCode: '85232',
    latitude: 36.52633,
    longitude: -112.17672,
    numOfUnits: 120,
    status: false,
  },
  {
    id: 3,
    zone: 'Glendale',
    campusName: 'Glendale, AZ',
    streetAddress: '6123 55th Ave',
    postalCode: '85421',
    latitude: 34.65275,
    longitude: -111.9168,
    numOfUnits: 153,
    status: true,
  },
];
//************************* Campuses Data End *******************************//

//************************* Page Campuses Data Start *******************************//
export const pageCampusesColumnData = [
  { name: 'campus', title: 'Campus Title' },
  { name: 'author', title: 'Author' },
  { name: 'created', title: 'Created' },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'Action' },
];
export const pageCampusesColumnExtensionsData = [
  { columnName: 'campus', width: 300 },
  { columnName: 'created', width: 280 },
  { columnName: 'action', width: 100 },
];
export const pageCampusesRowData = [
  {
    id: 1,
    campus: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 2,
    campus: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 3,
    campus: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 4,
    campus: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 5,
    campus: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 6,
    campus: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 7,
    campus: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
];
//************************* Page Campuses Data End *******************************//

//************************* Meet The Team Data Start *******************************//
export const teamColumnData = [
  { name: 'name', title: 'Name' },
  { name: 'title', title: 'Title' },
  { name: 'summary', title: 'Summary' },
  { name: 'action', title: 'Action' },
];
export const teamColumnExtensionsData = [
  { columnName: 'name', width: 290 },
  { columnName: 'title', width: 290 },
  { columnName: 'summary', width: 350 },
  { columnName: 'action' },
];
export const teamRowData = [
  {
    id: 1,
    name: 'Arizona West',
    title: 'John Doe',
    summary: 'June 10, 2022, 11:17 a.m.',
  },
];
//************************* Meet The Team Data End *******************************//

//************************* Unit Page Data Start *******************************//
export const unitPageColumnData = [
  { name: 'unit', title: 'Unit Title' },
  { name: 'author', title: 'Author' },
  { name: 'created', title: 'Created' },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'Action' },
];
export const unitPageColumnExtensionsData = [
  { columnName: 'unit', width: 300 },
  { columnName: 'created', width: 280 },
  { columnName: 'action' },
];
export const unitPageRowData = [
  {
    id: 1,
    unit: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 2,
    unit: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: false,
  },
  {
    id: 3,
    unit: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: false,
  },
  {
    id: 4,
    unit: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 5,
    unit: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 6,
    unit: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: false,
  },
  {
    id: 7,
    unit: 'Arizona West',
    author: 'John Doe',
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
];
//************************* Unit Page Data End *******************************//

//************************* Campuses Access Logs Data Start *******************************//
export const CampusAccessLogsColumnData = [
  { name: 'campus', title: 'Campus' },
  { name: 'user', title: 'User' },
  { name: 'created', title: 'Access Date' },
];
export const CampusAccessLogsColumnExtensionsData = [
  { columnName: 'campus', width: 400 },
  { columnName: 'user', width: 300 },
];
export const CampusAccessLogsRowData = [
  {
    id: 1,
    campus: 'Spanish Springs',
    user: 'LuxeLesee5',
    created: 'June 10, 2022, 11:17 a.m.',
  },
  {
    id: 2,
    campus: 'Henderson',
    user: 'LuxeLesee6',
    created: 'June 25, 2022, 11:17 a.m.',
  },
  {
    id: 3,
    campus: 'Lake Havasu',
    user: 'LuxeLesee7',
    created: 'June 21, 2022, 23:22 a.m.',
  },
];
//************************* Campuses Access Logs Data End *******************************//

//************************* Unit Access Logs Data Start *******************************//
export const UnitAccessLogsColumnData = [
  { name: 'unit', title: 'Unit' },
  { name: 'user', title: 'User' },
  { name: 'created', title: 'Access Date' },
];
export const UnitAccessLogsColumnExtensionsData = [
  { columnName: 'unit', width: 400 },
  { columnName: 'user', width: 300 },
];
export const UnitAccessLogsRowData = [
  {
    id: 1,
    unit: 'Unit TB5',
    user: 'LuxeLesee5',
    created: 'June 10, 2022, 11:17 a.m.',
  },
  {
    id: 2,
    unit: 'Unit TB6',
    user: 'LuxeLesee6',
    created: 'June 25, 2022, 11:17 a.m.',
  },
  {
    id: 3,
    unit: 'Unit TB7',
    user: 'LuxeLesee7',
    created: 'June 21, 2022, 23:22 a.m.',
  },
];
//************************* Unit Access Logs Data End *******************************//

//************************* Units Data Start *******************************//
export const unitsColumnData = [
  { name: 'facility', title: 'Campus' },
  { name: 'owner', title: 'Owner' },
  { name: 'lessee', title: 'Lessee' },
  { name: 'unitNumber', title: 'Unit Number' },
  { name: 'length', title: 'Length' },
  { name: 'width', title: 'Width' },
  { name: 'sqFt', title: 'Sq Ft' },
  { name: 'buyPrice', title: 'Buy Price' },
  { name: 'leasePrice', title: 'Lease Price' },
  { name: 'forSale', title: 'For Sale' },
  { name: 'forLease', title: 'For Lease' },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'Action' },
];

export const unitsColumnExtensionsData = [
  { columnName: 'facility', width: 250 },
  { columnName: 'owner', width: 150 },
  { columnName: 'lessee', width: 150 },
  { columnName: 'unitNumber', width: 120 },
  { columnName: 'length', width: 80 },
  { columnName: 'width', width: 80 },
  { columnName: 'sqFt', width: 80 },
  { columnName: 'buyPrice', width: 100 },
  { columnName: 'leasePrice', width: 100 },
  { columnName: 'forSale', width: 100 },
  { columnName: 'forLease', width: 100 },
  { columnName: 'status', width: 100 },
];
export const unitsRowData = [
  {
    id: 1,
    facility: 'Spanish Springs',
    owner: 'LuxeOwner',
    lessee: 'LuxeLesee',
    unitNumber: 'TU04',
    length: 50.0,
    width: 15.0,
    sqFt: 750.0,
    buyPrice: '$100.0',
    leasePrice: '$25.0',
    forSale: false,
    forLease: false,
    status: false,
  },
  {
    id: 2,
    facility: 'Boise, ID Phase 2',
    owner: 'LuxeOwner2',
    lessee: 'LuxeLesee2',
    unitNumber: 'TU03',
    length: 15.0,
    width: 50.0,
    sqFt: 750.0,
    buyPrice: '$100.0',
    leasePrice: '$25.0',
    forSale: true,
    forLease: true,
    status: true,
  },
  {
    id: 3,
    facility: 'Henderson, NV',
    owner: 'LuxeOwner3',
    lessee: 'LuxeLesee3',
    unitNumber: 'L173',
    length: 14.3,
    width: 50.0,
    sqFt: 753.0,
    buyPrice: '$100.0',
    leasePrice: '$25.0',
    forSale: false,
    forLease: false,
    status: false,
  },
];
//************************* Units Data End *******************************//

//************************* Category Data Start *******************************//
export const CategoryColumnData = [
  { name: 'category', title: 'Category' },
  { name: 'action', title: 'Action' },
];
export const CategoryColumnExtensionsData = [
  { columnName: 'category', width: 400 },
  { columnName: 'action' },
];
export const CategoryRowData = [
  {
    id: 1,
    category: 'Camera',
  },
  {
    id: 2,
    category: 'Settings',
  },
  {
    id: 3,
    category: 'Support',
  },
];
//************************* Category Data End *******************************//

//************************* FAQ Data Start *******************************//
export const FAQColumnData = [
  { name: 'FAQs', title: 'FAQs' },
  { name: 'action', title: 'Action' },
];
export const FAQColumnExtensionsData = [
  { columnName: 'FAQs', width: 400 },
  { columnName: 'action' },
];
export const FAQRowData = [
  {
    id: 1,
    FAQs: 'How much will my property taxes be?',
  },
  {
    id: 2,
    FAQs: 'How much does it cost for Luxelocker to lease it for me?',
  },
  {
    id: 3,
    FAQs: 'What are the rental rates?',
  },
];
//************************* FAQ Data End *******************************//

//************************* Announcements Data Start *******************************//
export const announcementsColumnData = [
  { name: 'announcement', title: 'Announcement' },
  { name: 'groups', title: 'Groups' },
  { name: 'startDate', title: 'Start Date' },
  { name: 'endDate', title: 'End Date' },
  { name: 'action', title: 'Action' },
];
export const announcementsColumnExtensionsData = [
  { columnName: 'announcement', width: 300 },
  { columnName: 'groups', width: 200 },
  { columnName: 'startDate', width: 150 },
  { columnName: 'endDate', width: 150 },
  { columnName: 'action' },
];
export const announcementsRowData = [
  {
    id: 1,
    announcement: 'What are Conditional Orders?',
    customers: 'All Users',
    startDate: 'Jun 11, 2022',
    endDate: 'Jun 13, 2022',
    status: 'play',
  },
  {
    id: 2,
    announcement: 'Big News',
    customers: 'All Users',
    startDate: 'Jun 15, 2022',
    endDate: 'Jun 17, 2022',
    status: 'pause',
  },
  {
    id: 3,
    announcement: 'New Version 1.6',
    customers: 'All Users',
    startDate: 'Jun 15, 2022',
    endDate: 'Jun 22, 2022',
    status: 'play',
  },
];
//************************* FAQ Data End *******************************//

//************************* Add / Edit Units Data Start *******************************//
export const addEditUnitNav = [
  {
    id: 1,
    title: 'Unit Information',
  },
  {
    id: 2,
    title: 'Owner Information',
  },
  {
    id: 3,
    title: 'Lessee Information',
  },
  {
    id: 4,
    title: 'Payments',
  },
  {
    id: 5,
    title: 'Amenities',
  },
  {
    id: 6,
    title: 'Unit Page',
  },
];
//************************* Add / Edit Units Data End *******************************//

//************************* Blogs Table Data *******************************//
export const blogPageColumnData = [
  { name: 'blogTitle', title: 'Title' },
  { name: 'author', title: 'Author' },
  { name: 'tags', title: 'Tags' },
  { name: 'created', title: 'Created' },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'Action' },
];
export const blogPageColumnExtensionsData = [
  { columnName: 'blogTitle', width: 350 },
  { columnName: 'created', width: 200 },
  { columnName: 'tags', width: 200 },
  { columnName: 'action', width: 100 },
];

export const blogPageRowData = [
  {
    id: 1,
    blogTitle: 'How to use Luxelocker',
    author: 'LuxeLesee',
    tags: ['Luxelocker', 'Camera'],
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 2,
    blogTitle: 'How to use Luxelocker',
    author: 'LuxeLesee',
    tags: ['Luxelocker', 'Camera'],
    created: 'June 10, 2022, 11:17 a.m.',
    status: false,
  },
  {
    id: 3,
    blogTitle: 'How to use Luxelocker',
    author: 'LuxeLesee',
    tags: ['Luxelocker', 'Camera'],
    created: 'June 10, 2022, 11:17 a.m.',
    status: true,
  },
  {
    id: 4,
    blogTitle: 'How to use Luxelocker',
    author: 'LuxeLesee',
    tags: ['Luxelocker', 'Camera'],
    created: 'June 10, 2022, 11:17 a.m.',
    status: false,
  },
];
//************************* Blogs Table Extensions *******************************//

//************************* CSV Static Headers Start *******************************//

export const staticHeaders = [
  'facility',
  'unit_number',
  'length',
  'width',
  'lease_price',
  'buy_price',
  'is_active',
  'is_available_for_sale',
  'is_available_for_lease',
  'unit_description',
  'title',
  'description',
  'publish',
  'visibility',
  'password',
  'end_url',
];

//************************* CSV Static Headers End *******************************//
