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
import {
	gray,
	primaryColor,
	secondaryColor,
	white,
	yellow,
} from "../../../../utils/style/GlobalVariables";
import FAQs from "./FAQs/FAQs";
import Category from "./Category/Category";

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

const FAQ = () => {
	//************************* Campuse Main Screen Start *******************************//

	//***** States *****//
	const [value, setValue] = useState(0);

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
					<BreadCrumb routes={[{ name: "FAQ" }]} />
					<div
						style={{ fontFamily: "Inter-Medium", fontSize: 15 }}
						className="text-white pt-1"
					>
						{value === 0 ? "FAQs" : "Category"}
					</div>
				</div>
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
								label="FAQs"
								{...a11yProps(0)}
							/>
							<Tab
								style={{
									textTransform: "none",
									fontSize: 13,
									fontFamily: "Inter-Medium",
									color: value === 1 ? white : gray,
								}}
								label="Categories"
								{...a11yProps(1)}
							/>
						</Tabs>
					</Box>

					<TabPanel value={value} index={0}>
						<FAQs />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Category />
					</TabPanel>
				</Box>
			</div>
		</div>
	);
};

export default FAQ;
