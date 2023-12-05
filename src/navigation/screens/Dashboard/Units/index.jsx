// Library Imports
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { Add } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
// Local Imports

import Button from '../../../../components/button';
import BreadCrumb from '../../../../components/BreadCrumb';
import {
  gray,
  primaryColor,
  secondaryColor,
  white,
  yellow,
} from '../../../../utils/style/GlobalVariables';
import UnitsTab from './Units/UnitsTab/Units';
import UnitAccessLogs from './AccessLogTab/UnitAccessLogs';
import ImportUnitsModal from './Units/UnitsTab/ImportData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ height: window.innerHeight * 0.86 }}
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Units = () => {
  //************************* Campuse Main Screen Start *******************************//

  //***** States *****//
  const [value, setValue] = useState(0);

  //***** Methods *****//
  const handleTabValue = (event, newValue) => {
    setValue(newValue);
  };

  //************************* Campuse Main Screen End *******************************//

  //************************* Add / Edit Unit Start *******************************//

  //***** States *****//
  const [addEditUnitModal, toggleAddEditUnitModal] = useState(false);

  //***** Methods *****//
  const addEditUnitOnClose = () => {
    toggleAddEditUnitModal(false);
  };

  //************************* Add / Edit Unit End *******************************//

  //************************* States Import Data Modal *******************************//
  const [importDataModal, setImportDataModal] = useState(false);

  const openImportDataModal = () => {
    setImportDataModal(true);
  };
  const closeImportDataModal = () => {
    setImportDataModal(false);
  };

  return (
    <div className='main-container'>
      {/* Header BreadCrumb with Buttom Row */}
      <div className='flex flex-row justify-between items-center pt-5 px-5'>
        <div>
          <BreadCrumb routes={[{ name: 'Units' }]} />
          <div
            style={{ fontFamily: 'Inter-Medium', fontSize: 15 }}
            className='text-white pt-1'
          >
            {value === 0
              ? 'Units'
              : value === 1
              ? 'Unit Access Logs'
              : 'Payment history'}
          </div>
        </div>
        {value === 0 && (
          <div className='flex gap-2'>
            <Button
              startIcon={<FileDownloadIcon />}
              style={{
                borderColor: yellow,
                color: yellow,
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                textTransform: 'none',
                width: '150px',
                borderRadius: 8,
              }}
              component='span'
              variant='outlined'
              //   disabled={loading}
              onClick={() => openImportDataModal()}
            >
              <p style={{ fontFamily: 'Inter-Medium', fontSize: 13 }}>
                Import Units
              </p>
            </Button>
            <Button
              startIcon={<Add fontSize='small' />}
              height={38}
              style={{
                backgroundColor: yellow,
                color: primaryColor,
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                textTransform: 'none',
                width: '150px',
                borderRadius: 8,
              }}
              onClick={() => toggleAddEditUnitModal(true)}
              component='span'
              variant='contained'
              //   disabled={loading}
            >
              New Unit
            </Button>
          </div>
        )}
      </div>

      <div className='overflow-y-hidden'>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: secondaryColor,
              background: primaryColor,
            }}
          >
            <Tabs
              TabIndicatorProps={{ style: { background: yellow } }}
              variant='scrollable'
              value={value}
              className='px-3 pt-2'
              onChange={handleTabValue}
              aria-label='basic tabs example'
            >
              <Tab
                style={{
                  textTransform: 'none',
                  fontSize: 13,
                  fontFamily: 'Inter-Medium',
                  color: value === 0 ? white : gray,
                }}
                label='Units'
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  fontSize: 13,
                  fontFamily: 'Inter-Medium',
                  color: value === 1 ? white : gray,
                }}
                label='Unit Access Logs'
                {...a11yProps(1)}
              />
              {/* <Tab
								style={{
									textTransform: "none",
									fontSize: 13,
									fontFamily: "Inter-Medium",
									color: value === 2 ? white : gray,
								}}
								label="Payment history"
								{...a11yProps(2)}
							/> */}
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <UnitsTab
              openAddEditUnit={addEditUnitModal}
              toggleAddEditUnitModal={toggleAddEditUnitModal}
              closeAddEditUnit={addEditUnitOnClose}
              //CSV Modal States
              openCSVModal={importDataModal}
              closeImportDataModal={closeImportDataModal}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UnitAccessLogs />
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
						<div></div>
					</TabPanel> */}
        </Box>
      </div>
    </div>
  );
};

export default Units;
