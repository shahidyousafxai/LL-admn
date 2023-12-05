// Library Imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Local Imports
import CampusesUI from "./CampusesUI";
import { Action, Status } from "../../../../../../components/Tables/utils";
import {
	campusesColumnData,
	campusesColumnExtensionsData,
} from "../../../../../../components/Tables/dummyData";
import AddCampuse from "../AddCampus/AddCampus";
import DeleteCampuse from "../DeleteCampus/DeleteCampus";
import ApiController from "../../../../../../utils/network/api";
import EditCampus from "../EditCampus/EditCampus";

const CampusesTab = ({ addCampusModal, toggleAddCampusModal }) => {
	//************************* Campuse Main Screen Start *******************************//

	//***** States *****//
	const [ColumnSetting1] = useState(["action"]);
	const [ColumnSetting2] = useState(["status"]);
	const [selectionIds, setSelectionIds] = useState([]);
	const [campuses, setCampuses] = useState([]);
	const [campusesListLoading, setCampusesLoading] = useState(false);

	const [networkError, setNetworkError] = useState(false);

	useEffect(() => {
		setZones();
		getCampusesListing();
	}, []);

	//***** Methods *****//
	const dataProviders = [
		{
			columnName: ColumnSetting1,
			func: (restProps) => Action(restProps, onActionClick),
		},
		{
			columnName: ColumnSetting2,
			func: Status,
		},
	];
	// Action Click From Table
	const onActionClick = (type, campuseData) => {
		console.log("🚀 ~ file: Campuses.jsx:46 ~ campuseData:", campuseData);
		if (type === "edit") {
			setEditCampusData(campuseData);
			setnewCampus({
				zone: campuseData?.zone,
				name: campuseData?.campusName,
				street: campuseData?.streetAddress,
				postalCode: campuseData?.postalCode,
				phone: campuseData?.rawItem?.phone_no,
				startDay: campuseData?.rawItem?.weekday_from,
				endDay: campuseData?.rawItem?.weekday_to,
				startingHour: campuseData?.rawItem?.from_hour,
				endingHour: campuseData?.rawItem?.to_hour,
				numOfUnits: campuseData?.numOfUnits,
				longitude: campuseData?.longitude,
				latitude: campuseData?.latitude,
				baseStationIP: campuseData?.rawItem?.base_station_ip,
				status: campuseData?.status,
				maintenanceFee: campuseData?.rawItem?.maintenance_fee,
				amenities: campuseData?.rawItem?.amenities?.map((item) => {
					return item?.amenity_id;
				}),
			});
			setEditCampus(true);
		} else {
			setDeleteCampuse(campuseData);
			toggledeleteCampuseModal(true);
		}
	};

	const filterString = (zones, status) => {
		let zonesStr, statusStr;
		// making string for zones filter
		if (zones) {
			// eslint-disable-next-line
			zones.map((item) => {
				if (item.value) {
					zonesStr = zonesStr ? zonesStr + "," + item.title : item.title;
				}
			});
		}
		// making string for status filter
		if (status) {
			// eslint-disable-next-line
			status.map((item) => {
				if (item.value) {
					statusStr = item.title.toLowerCase() === "active" ? true : false;
				}
			});
		}

		let obj = {
			zones: zonesStr,
			status: statusStr,
		};
		return obj;
	};
	const getCampusesListing = (name, zones, status) => {
		let filters = filterString(zones, status);
		setCampusesLoading(true);

		ApiController.fetchCampusesCall(
			name,
			filters.zones,
			filters.status,
			(response) => {
				if (response?.success) {
					// sort response array
					const sortArray = response.data.sort(function (a, b) {
						return a.id - b.id || a.name.localeCompare(b.name);
					});
					// create object to render table
					let data = sortArray.map((item) => {
						let obj = {
							id: item.id,
							zone: item.zone_name,
							campusName: item.name,
							streetAddress: item.facility_street,
							postalCode: item.facility_postalcode,
							latitude: item.facility_latitude,
							longitude: item.facility_longitude,
							numOfUnits: item.number_of_units ? item.number_of_units : 0,
							status: item.is_active,
							rawItem: item,
						};
						return obj;
					});
					setCampuses(data);
					setCampusesLoading(false);
				} else {
					setCampusesLoading(false);
					setNetworkError(true);
				}
			}
		);
	};
	// Again Call For Listing
	const reCallListing = () => {
		setNetworkError(false);

		getCampusesListing();
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
			getCampusesListing();
		}
	};
	const onCampusSearch = () => {
		if (searchText) {
			getCampusesListing(searchText);
		}
	};
	// onSearch Clear
	const onClear = () => {
		setSearchText("");
		getCampusesListing();
	};
	//************************* Search Bar End *******************************//

	//************************* Filter Start *******************************//
	//***** States *****//
	// Filter Modal States
	const [listOpen, setListOpen] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const [filters, setFilters] = useState({
		Zone: [],
		Status: [
			{
				from: "Status",
				title: "Active",
				value: false,
			},
			{
				from: "Status",
				title: "Inactive",
				value: false,
			},
		],
	});

	//***** Methods *****//

	// Sorting function
	const sortArray = (array) => {
		return array.sort((a, b) => a.id - b.id || a.name.localeCompare(b.name));
	};
	// Create data object
	const createDataObject = (from, array) => {
		return array.map((item) => ({
			id: item.id,
			title: item.name,
			from: from,
			value: false,
		}));
	};
	// Process response
	const processResponse = (from, response) => {
		if (response?.success) {
			const sortedArray = sortArray(response.data);
			const data = createDataObject(from, sortedArray);
			return data;
		} else {
			throw new Error("Failed to fetch data.");
		}
	};

	// Get Zones
	const getZonesListing = () => {
		return new Promise((resolve, reject) => {
			ApiController.fetchZonesCall("", (response) => {
				try {
					const data = processResponse("Zone", response);
					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		});
	};
	// Set Zone && Campus List in the Filters
	const setZones = async () => {
		try {
			const [zones] = await Promise.all([getZonesListing()]);

			let status = filters.Status.slice();
			setFilters(() => ({
				Zone: zones,
				Status: status,
			}));
		} catch (error) {
			console.error(error);
		}
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
		let zones = filters.Zone.slice();
		let status = filters.Status.slice();

		if (item?.from === "Status") {
			setFilters(() => {
				status.map((sItem) => {
					if (item.title === sItem.title) {
						return (sItem.value = !sItem.value);
					} else {
						sItem.value = false;
					}
				});

				const newObj = {
					Zone: zones,
					Status: status,
				};
				return newObj;
			});
			// Calling Listing
			getCampusesListing("", zones, status);
		} else if (item?.from === "Zone") {
			setFilters(() => {
				// eslint-disable-next-line
				zones.map((zItem) => {
					if (item.title === zItem.title) {
						return (zItem.value = !zItem.value);
					}
				});
				const newObj = {
					Zone: zones,
					Status: status,
				};
				return newObj;
			});
			// Calling Listing
			getCampusesListing("", zones, status);
		}
	};

	// OnClear Filters
	const onClearFilter = () => {
		setFilters(() => {
			let zones = filters.Zone.slice();
			let status = filters.Status.slice();

			zones.map((zItem) => {
				return (zItem.value = false);
			});
			status.map((sItem) => {
				return (sItem.value = false);
			});

			const newObj = {
				Zone: zones,
				Status: status,
			};
			return newObj;
		});

		// Calling Listing
		getCampusesListing();

		// Closing Filter Modal
		handleClose();

		// To Close DropDown
		setListOpen([]);
	};
	//************************* Filter End *******************************//

	//************************* Add Campuse Start *******************************//

	// initial Values
	const initCampuse = {
		newCampus: {
			zone: "",
			name: "",
			street: "",
			postalCode: "",
			phone: "",
			startDay: "",
			endDay: "",
			startingHour: "",
			endingHour: "",
			numOfUnits: "",
			longitude: "",
			latitude: "",
			baseStationIP: "",
			maintenanceFee: "",
			status: false,
			amenities: [],
		},
		campuseError: {
			name: "",
			msg: "",
		},
	};

	//***** States *****//
	const statesWithCities = useSelector(
		(state) => state?.statesAndCities?.statesAndCities
	);

	// const [addCampusModal, toggleAddCampusModal] = useState(false)
	const [campuseLoading, setCampuseLoading] = useState(false);

	const [newCampusError, setnewCampusError] = useState(
		initCampuse.campuseError
	);
	const [newCampus, setnewCampus] = useState(initCampuse.newCampus);

	//***** Methods *****//
	const addCampuseClose = () => {
		setnewCampus(initCampuse.newCampus);
		setnewCampusError(initCampuse.campuseError);
		setCampuseLoading(false);
		toggleAddCampusModal(false);
	};

	// Add New User Input OnChange
	const handlenewCampusOnChange = (e) => {
		if (e.target.name === "startingHour") {
			setnewCampus({
				...newCampus,
				startingHour: "",
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "endingHour") {
			const newHour = e.target.value.slice(0, 2);
			setnewCampus({
				...newCampus,
				endingHour: "",
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "phone") {
			const digitsOnly = e.target.value.replace(/[^\d+]/g, "");
			setnewCampus({
				...newCampus,
				phone: "",
				[e.target.name]: digitsOnly,
			});
		} else if (e.target.name === "state") {
			setnewCampus({
				...newCampus,
				city: "",
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "maintenanceFee") {
			e.target.value = e.target.value.replace(/[^\d $ .]/g, "");
			if (e.target.value.length === 1) {
				e.target.value = `$ ${e.target.value}`;
			}
			if (e.target.value === "$ ") {
				e.target.value = "";
			}
			setnewCampus({
				...newCampus,
				[e.target.name]: e.target.value,
			});
		} else if (
			e.target.name === "postalCode" ||
			e.target.name === "numOfUnits"
		) {
			e.target.value = e.target.value.replace(/[^\d]/g, "");
			setnewCampus({
				...newCampus,
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "longitude" || e.target.name === "latitude") {
			// Adding "." after 3 digits
			e.target.value = e.target.value?.includes(".")
				? e.target.value
				: e.target.value
						.replace(/[^\d]/g, "")
						.replace(/(.{3})/g, "$1.")
						.trim()
						.replace(/\/$/, "")
						.trim();
			setnewCampus({
				...newCampus,
				[e.target.name]: e.target.value,
			});
		} else {
			setnewCampus({
				...newCampus,
				[e.target.name]: e.target.value,
			});
		}
	};

	const addnewCampusSave = () => {
		setCampuseLoading(true);

		if (newCampus.title === "Edit Campuse") {
			editCampuse();
		} else {
			addCampuse();
		}
	};
	// Add New Campuse
	const addCampuse = () => {
		ApiController.addNewCampusCall(addCampusePayload(), (response) => {
			if (response.success) {
				setnewCampus(initCampuse.newCampus);
				setnewCampusError(initCampuse.campuseError);
				setCampuseLoading(false);
				toggleAddCampusModal(false);
				getCampusesListing();
			} else {
				if ("facility_name" in response?.data[0]) {
					setnewCampusError({
						name: "name",
						msg: response?.data[0].facility_name,
					});
				}
				setCampuseLoading(false);
			}
		});
	};

	const addCampusePayload = () => {
		let payload = {
			zone_id: newCampus?.zone.id,
			street: newCampus?.street,
			postalcode: newCampus?.postalCode,
			number_of_units: newCampus?.numOfUnits,
			name: newCampus?.name,
			latitude: newCampus?.latitude,
			longitude: newCampus?.longitude,
			base_station_ip: newCampus?.baseStationIP,
			maintenance_fee: newCampus?.maintenanceFee.replace(/^\D+/g, ""),
			amenity_ids: newCampus?.amenities,
			is_active: newCampus?.status,
			phone_no: newCampus?.phone,
			weekday_from: newCampus?.startDay,
			weekday_to: newCampus?.endDay,
			from_hour: newCampus?.startingHour,
			to_hour: newCampus?.endingHour,
		};
		return payload;
	};

	//************************* Add Campuse End *******************************//

	//************************* Edit Campuse Start *******************************//

	const [editCampus, setEditCampus] = useState(false);
	const [editCampusData, setEditCampusData] = useState([]);

	const editCampuseClose = () => {
		setnewCampus(initCampuse.newCampus);
		setnewCampusError(initCampuse.campuseError);
		setCampuseLoading(false);
		setEditCampus(false);
	};
	const editCampuse = () => {
		setCampuseLoading(true);
		ApiController.updateCampusCall(
			editCampusData?.id,
			addCampusePayload(),
			(response) => {
				if (response.success) {
					setnewCampus(initCampuse.newCampus);
					setnewCampusError(initCampuse.campuseError);
					setCampuseLoading(false);
					setEditCampus(false);
					getCampusesListing();
				} else {
					if ("facility_name" in response?.data[0]) {
						setnewCampusError({
							name: "name",
							msg: response?.data[0].facility_name,
						});
					}
					setCampuseLoading(false);
				}
			}
		);
	};
	//************************* Edit Campuse End *******************************//

	//************************* Delete Campuse Start *******************************//

	//***** States *****//
	const [deleteCampuseModal, toggledeleteCampuseModal] = useState(false);
	const [deleteCampuseLoading, setDeleteCampuseLoading] = useState(false);

	const [deleteCampuse, setDeleteCampuse] = useState({});

	//***** Methods *****//

	const onDelete = (id) => {
		setDeleteCampuseLoading(true);

		// ApiController.deleteCampuseCall(id, (response) => {
		//   if (response.success) {
		//     setDeleteCampuse({})
		//     getCampusesListing();
		//     setDeleteCampuseLoading(false)
		toggledeleteCampuseModal(false);
		//   }
		//   else {
		setDeleteCampuseLoading(false);
		//   }
		// })
	};

	//************************* Delete Campuse End *******************************//

	return (
		<>
			<CampusesUI
				// Selestion State
				selectionIds={selectionIds}
				setSelectionIds={setSelectionIds}
				// Table Data
				campusesColumnData={campusesColumnData}
				campusesColumnExtensionsData={campusesColumnExtensionsData}
				campusesRowData={campuses.length > 0 ? campuses : []}
				// Table Methods
				dataProviders={dataProviders}
				// SearchBar States
				searchText={searchText}
				// SearchBar Method
				onChangeSearch={onChangeSearch}
				onCampusSearch={onCampusSearch}
				onClear={onClear}
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
				// Loading to show view after API Call
				loading={campusesListLoading}
				networkError={networkError}
				reCallListing={reCallListing}
			/>

			{/************************* Modals *******************************/}

			{/* Add Campuse */}
			<AddCampuse
				open={addCampusModal}
				close={addCampuseClose}
				newCampus={newCampus}
				onChange={handlenewCampusOnChange}
				loading={campuseLoading}
				setnewCampus={setnewCampus}
				error={newCampusError}
				onSave={addnewCampusSave}
				states={statesWithCities}
			/>

			{/* Edit Campuse */}
			<EditCampus
				open={editCampus}
				close={editCampuseClose}
				newCampus={newCampus}
				onChange={handlenewCampusOnChange}
				loading={campuseLoading}
				setnewCampus={setnewCampus}
				error={newCampusError}
				onSave={editCampuse}
			/>

			{/* Delete Campuse */}
			<DeleteCampuse
				open={deleteCampuseModal}
				close={() => toggledeleteCampuseModal(false)}
				data={deleteCampuse}
				onDelete={onDelete}
				loading={deleteCampuseLoading}
			/>
		</>
	);
};

export default CampusesTab;
