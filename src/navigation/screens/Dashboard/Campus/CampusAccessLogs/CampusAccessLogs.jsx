// Library Imports
import React, { useState, useEffect } from "react";

// Local Imports
import CampusAccessLogsUI from "./CampusAccessLogsUI";
import {
	CampusAccessLogsColumnData,
	CampusAccessLogsColumnExtensionsData,
} from "../../../../../components/Tables/dummyData";
import ApiController from "../../../../../utils/network/api";
import moment from "moment/moment";

const CampusAccessLogs = () => {
	//************************* Campuse Main Screen Start *******************************//

	//***** States *****//
	const [selectionIds, setSelectionIds] = useState([]);
	const [networkError, setNetworkError] = useState(false);

	const [accessLogs, setAccessLogs] = useState([]);
	const [accessLogsLoading, setAccessLogsLoading] = useState(true);

	//***** Methods *****//
	useEffect(() => {
		getAccessLogsListing();
		getCampusesListing();
		// eslint-disable-next-line
	}, []);

	// Fetching And Setting User Listing Data
	const filterString = (campus, date) => {
		let campusStr;
		// making string for campus filter
		if (campus) {
			// eslint-disable-next-line
			campus.map((item) => {
				if (item.value) {
					campusStr = campusStr ? campusStr + "," + item.title : item.title;
				}
			});
		}

		let obj = {
			campus: campusStr,
			date: date === "" ? undefined : date,
		};
		return obj;
	};

	const getAccessLogsListing = (search, campus, date) => {
        setAccessLogsLoading(true);
		let filters = filterString(campus, date);

		ApiController.fetchAccessLogsCall(
			search,
			filters.campus,
			filters.date,
			(response) => {
				if (response?.success) {
					// sort response array
					const sortArray = response.data.sort(function (a, b) {
						return a.id - b.id || a.name.localeCompare(b.name);
					});
					if (sortArray.length > 0) {
						let data = sortArray
							?.map((item) => {
								if (item?.status_code === 1) {
									let obj = {
										id: item?.id,
										campus: item?.campus_name,
										user: item?.unit_user,
										created: moment(item?.updated_at).format("LLL"),
										completeItem: item,
									};
									return obj;
								}
							})
							.filter((item) => item !== undefined);
						setAccessLogs(data);
					} else {
						setAccessLogs([]);
					}
					setAccessLogsLoading(false);
				} else {
					setAccessLogsLoading(false);
				}
			}
		);
	};

	// Again Call For Listing
	const reCallListing = () => {
		getAccessLogsListing();
		setNetworkError(false);
	};

	//************************* Campuse Main Screen End *******************************//

	//************************* Search Bar Start *******************************//

	//***** States *****//
	const [searchText, setSearchText] = useState("");

	//***** Methods *****//

	// Search User Method
	const onChangeSearch = (e) => {
		if (e.target.value !== "") {
			setSearchText(e.target.value);
		} else {
			setSearchText("");
			getAccessLogsListing();
		}
	};
	const onCampusSearch = () => {
		if (searchText) {
			getAccessLogsListing(searchText);
		}
	};
	// onSearch Clear
	const onClear = () => {
		setSearchText("");
		getAccessLogsListing();
	};
	//************************* Search Bar End *******************************//

	//************************* Filter Start *******************************//
	//***** States *****//
	const [listOpen, setListOpen] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const [filters, setFilters] = useState({
		Campus: [],
		Date: "",
	});
	//***** Methods *****//
	const getCampusesListing = (name, zones, status,) => {
		ApiController.fetchCampusesCall(name, zones, status, (response) => {
			if (response?.success) {
				// sort response array
				const sortArray = response.data.sort(function (a, b) {
					return a.id - b.id || a.name.localeCompare(b.name);
				});
				let data = sortArray.map((item) => {
					let obj = {
						id: item.id,
						title: item.name,
						value: false,
						Date: item.is_active,
						maintenanceFee: item.maintenance_fee,
					};
					return obj;
				});
				let Date = filters.Date.slice();
				let campus = data;
				setFilters(() => {
					const newObj = { Campus: campus, Date: Date };
					return newObj;
				});
			}
		});
	};
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const clickAwayHandler = () => {
		setAnchorEl(false);
	};
	// Closing Filter  Modal DropDown
	const handleClickForParent = (title) => {
		setListOpen({
			...listOpen,
			[title]: !listOpen[title],
		});
	};
	// onChange Filter States
	const onChangeFilter = (item, index) => {
		if (index === "date") {
			let date = filters.Date.slice();
			let campus = filters.Campus.slice();
			setFilters(() => {
				// eslint-disable-next-line
				date = item;

				const newObj = { Campus: campus, Date: date };
				return newObj;
			});
			// Calling Listing
			getAccessLogsListing("", campus, date);
		} else {
			let date = filters.Date.slice();
			let campus = filters.Campus.slice();
			setFilters(() => {
				// eslint-disable-next-line
				campus.map((gItem) => {
					if (item.id === gItem.id) {
						return (gItem.value = !gItem.value);
					}
				});

				const newObj = { Campus: campus, Date: date };
				return newObj;
			});
			// Calling Listing
			getAccessLogsListing("", campus, date);
		}
	};

	// OnClear Filters
	const onClearFilter = () => {
		setFilters(() => {
			let date = filters.Date.slice();
			let campus = filters.Campus.slice();

			date = "";
			campus?.map((item) => {
				return (item.value = false);
			});

			const newObj = { Campus: campus, Date: date };
			return newObj;
		});

		// Calling Listing
		getAccessLogsListing();

		// Closing Filter Modal
		handleClose();

		// To Close DropDown
		setListOpen([]);
	};
	//************************* Filter End *******************************//

	return (
		<>
			<CampusAccessLogsUI
				// Selestion State
				selectionIds={selectionIds}
				setSelectionIds={setSelectionIds}
				// Table Data
				CampusAccessLogsColumnData={CampusAccessLogsColumnData}
				CampusAccessLogsColumnExtensionsData={
					CampusAccessLogsColumnExtensionsData
				}
				CampusAccessLogsRowData={accessLogs}
				// Filter Modal States
				anchorEl={anchorEl}
				id={id}
				open={open}
				listOpen={listOpen}
				filters={filters}
				// Filter Modal Methods
				handleClick={handleClick}
				handleClose={handleClose}
				clickAwayHandler={clickAwayHandler}
				handleClickForParent={handleClickForParent}
				onChangeFilter={onChangeFilter}
				onClearFilter={onClearFilter}
				// SearchBar States
				searchText={searchText}
				// SearchBar Method
				onChangeSearch={onChangeSearch}
				onCampusAccessLogsSearch={onCampusSearch}
				onClear={onClear}
				// Loading to show view after API Call
				loading={accessLogsLoading}
				networkError={networkError}
				reCallListing={reCallListing}
			/>
		</>
	);
};

export default CampusAccessLogs;
