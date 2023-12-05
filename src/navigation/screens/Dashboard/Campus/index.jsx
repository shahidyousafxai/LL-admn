// Library Imports
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import { Add } from "@mui/icons-material";

// Local Imports

import Button from "../../../../components/button";
import BreadCrumb from "../../../../components/BreadCrumb";
import CampusesTab from "./Campuses/CampusesTab/Campuses";
import {
	gray,
	primaryColor,
	secondaryColor,
	white,
	yellow,
} from "../../../../utils/style/GlobalVariables";
import Amenities from "./CampusAmenityTypes/AmenityTypes/amenityTypes";
import CampusAccessLogs from "./CampusAccessLogs/CampusAccessLogs";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			style={{ height: window.innerHeight * 0.86 }}
			role="tabpanel"
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
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const Campuses = () => {
	//************************* Campuse Main Screen Start *******************************//

	//***** States *****//
	const [value, setValue] = useState(0);

	const [addCampusModal, toggleAddCampusModal] = useState(false);
	const [addAmenityModal, toggleAddAmenityModal] = useState(false);

	//***** Methods *****//
	const handleTabValue = (event, newValue) => {
		setValue(newValue);
	};

	//************************* Campuse Main Screen End *******************************//

	return (
		<div className="main-container">
			{/* Header BreadCrumb with Buttom Row */}
			<div className="flex flex-row justify-between items-center pt-5 px-5">
				<div>
					<BreadCrumb routes={[{ name: "Campus" }]} />
					<div
						style={{ fontFamily: "Inter-Medium", fontSize: 15 }}
						className="text-white pt-1"
					>
						{value === 0
							? "Campuses"
							: value === 1
							? "Campus Access Logs"
							: "Campus Amenity Type"}
					</div>
				</div>
				{value !== 1 && (
					<Button
						startIcon={<Add fontSize="small" />}
						height={38}
						style={{
							backgroundColor: yellow,
							color: primaryColor,
							fontFamily: "Inter-Medium",
							fontSize: 13,
							textTransform: "none",
							width: "180px",
							borderRadius: 8,
						}}
						onClick={() => {
							value === 2
								? toggleAddAmenityModal(true)
								: toggleAddCampusModal(true);
						}}
						component="span"
						variant="contained"
						//   disabled={loading}
					>
						{value === 2 ? "New Amenity Type" : "New Campus"}
					</Button>
				)}
			</div>

			<div className="overflow-y-hidden">
				<Box sx={{ width: "100%" }}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: secondaryColor,
							background: primaryColor,
						}}
					>
						<Tabs
							TabIndicatorProps={{ style: { background: yellow } }}
							variant="scrollable"
							value={value}
							className="px-3 pt-2"
							onChange={handleTabValue}
							aria-label="basic tabs example"
						>
							<Tab
								style={{
									textTransform: "none",
									fontSize: 13,
									fontFamily: "Inter-Medium",
									color: value === 0 ? white : gray,
								}}
								label="Campuses"
								{...a11yProps(0)}
							/>
							<Tab
								style={{
									textTransform: "none",
									fontSize: 13,
									fontFamily: "Inter-Medium",
									color: value === 1 ? white : gray,
								}}
								label="Campus Access Logs"
								{...a11yProps(1)}
							/>
							<Tab
								style={{
									textTransform: "none",
									fontSize: 13,
									fontFamily: "Inter-Medium",
									color: value === 2 ? white : gray,
								}}
								label="Campus Amenity Type"
								{...a11yProps(2)}
							/>
						</Tabs>
					</Box>

					<TabPanel value={value} index={0}>
						<CampusesTab
							addCampusModal={addCampusModal}
							toggleAddCampusModal={toggleAddCampusModal}
						/>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<CampusAccessLogs />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Amenities
							addAmenityModal={addAmenityModal}
							toggleAddAmenityModal={toggleAddAmenityModal}
						/>
					</TabPanel>
				</Box>
			</div>
		</div>
	);
};

export default Campuses;
