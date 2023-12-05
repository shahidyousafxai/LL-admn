import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../../../components/BreadCrumb';
import {
  gray,
  primaryColor,
  secondaryColor,
  white,
  yellow,
} from '../../../../utils/style/GlobalVariables';
import { useState } from 'react';
import PageCampuses from './CampusesPage/CampusesPage';
import MeetTheTeam from './MeetTheTeamPage';
import Blog from './BlogPage/BlogPage';
import Units from './UnitPage';

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

const Pages = () => {
  const { state } = useLocation();
  const [value, setValue] = useState(state?.from === 'campus' ? 1 : 0);

  const handleTabValue = (event, newValue) => {
    setValue(newValue);
  };

  // Payload

  return (
    <div className='main-container'>
      {/* Header BreadCrumb with Buttom Row */}
      <div className='flex flex-row justify-between items-center pt-5 px-5'>
        <div>
          <BreadCrumb routes={[{ name: 'Pages' }]} />
          <div
            style={{ fontFamily: 'Inter-Medium', fontSize: 15 }}
            className='text-white pt-1'
          >
            {value === 0
              ? 'Blogs'
              : value === 1
              ? 'Campuses'
              : value === 2
              ? 'Units'
              : value === 3
              ? 'Meet The Team'
              : ''}
          </div>
        </div>
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
                label='Blogs'
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  fontSize: 13,
                  fontFamily: 'Inter-Medium',
                  color: value === 1 ? white : gray,
                }}
                label='Campuses'
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  fontSize: 13,
                  fontFamily: 'Inter-Medium',
                  color: value === 2 ? white : gray,
                }}
                label='Units'
                {...a11yProps(2)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  fontSize: 13,
                  fontFamily: 'Inter-Medium',
                  color: value === 3 ? white : gray,
                }}
                label='Meet The Team'
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Blog />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PageCampuses />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Units />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MeetTheTeam />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Pages;
