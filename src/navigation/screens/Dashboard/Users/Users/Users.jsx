// Library Imports
import React, { useState, useEffect } from "react";

// Local Imports
import UsersUI from "./UsersUI";
import AddUser from "../AddUser.jsx";
import EditUser from "../EditUser.jsx";
import DeleteUser from "../DeleteUser";
import UserDetails from "../UserDetails";
import { Action, Status } from "../../../../../components/Tables/utils";
import {
	usersColumnData,
	usersColumnExtensionsData,
} from "../../../../../components/Tables/dummyData";
import {
	camalize,
	compareStrings,
	toUpperCase,
	validateEmail,
	validatePassword,
	validatePasswordInput,
} from "../../../../../utils/validations/localValidations";
import ApiController from "../../../../../utils/network/api";
import { useSelector } from "react-redux";

const Users = () => {
	//************************* User Main Screen Start *******************************//

	const authUser = useSelector((state) => state?.authUser?.authUser);
	// Checking for Admin
	const isAdmin =
		authUser?.all_user_permissions[0] === "admin" &&
		authUser?.all_user_permissions[1] !== "superadmin"
			? true
			: false;
	// Checking for SuperAdmin
	const isSuperAdmin =
		authUser?.all_user_permissions[0] === "superadmin" ||
		authUser?.all_user_permissions[1] === "superadmin"
			? true
			: false;

	//***** States *****//
	const [selectionIds, setSelectionIds] = useState([]);
	// User Data For Table
	const [users, setUsers] = useState([]);
	const [userLoading, setUserLoading] = useState(true);

	const [networkError, setNetworkError] = useState(false);

	// DataProvider Column Data
	const [ColumnSetting1] = useState(["action"]);
	const [ColumnSetting2] = useState(["status"]);

	useEffect(() => {
		setZoneAndCampus();
		getUserListing();
		// eslint-disable-next-line
	}, []);

	//***** Methods *****//

	// Fetching And Setting User Listing Data
	const filterString = (zones, campus, group, status) => {
		let zonesStr, campusStr, groupStr, statusStr;
		// making string for zones filter
		if (zones) {
			// eslint-disable-next-line
			zones.map((item) => {
				if (item.value) {
					zonesStr = zonesStr ? zonesStr + "," + item.title : item.title;
				}
			});
		}
		// making string for campus filter
		if (campus) {
			// eslint-disable-next-line
			campus.map((item) => {
				if (item.value) {
					campusStr = campusStr ? campusStr + "," + item.title : item.title;
				}
			});
		}
		// making string for group filter
		if (group) {
			// eslint-disable-next-line
			group.map((item) => {
				item.title = item.title.includes(" ")
					? item.title.replace(" ", "_").toLowerCase()
					: item.title.toLowerCase();
				if (item.value) {
					groupStr = groupStr ? groupStr + "," + item.title : item.title;
				}
			});
		}
		// making string for status filter
		if (status) {
			// eslint-disable-next-line
			status.map((item) => {
				if (item.value) {
					statusStr = item.title.toLowerCase();
				}
			});
		}

		let obj = {
			zones: zonesStr,
			campus: campusStr,
			group: groupStr,
			status: statusStr,
		};
		return obj;
	};
	const getUserListing = (name, zones, campus, group, status) => {
		let filters = filterString(zones, campus, group, status);
		setUserLoading(true);

		ApiController.fetchUsersCall(
			name,
			filters.zones,
			filters.campus,
			filters.group,
			filters.status,
			(response) => {
				if (response?.success) {
					let users = response?.data?.map((item, index) => {
						// setting one string for group
						let group;
						// eslint-disable-next-line
						item.all_user_permissions.length > 0 &&
							item.all_user_permissions.map((role, index) => {
								role = role?.includes("_")
									? camalize(role?.replace("_", " "))
									: toUpperCase(role);
								group = index === 0 ? role : group + ", " + role;
							});
						// creating object
						let obj = {
							id: item.id,
							"Sr#": index + 1,
							fname: camalize(item.full_name),
							email: item.email,
							group: group,
							status: item.is_active,
							phone: item.phone_no,
							address: item.mailing_address,
						};
						return obj;
					});
					setUsers(users);
					setUserLoading(false);
				} else {
					setUserLoading(false);
					setNetworkError(true);
				}
			}
		);
	};

	// Again Call For Listing
	const reCallListing = () => {
		setNetworkError(false);

		getUserListing();
	};

	// Action Click From Table
	const onActionClick = (type, userData) => {
		if (type === "edit") {
			fetchUserDetails(userData.id);
			toggleEditUserModal(true);
		} else {
			setUserDeleteData(userData);
			toggleDeleteUserModal(true);
		}
	};
	// Data Provider
	const dataProviders = [
		{
			columnName: ColumnSetting1,
			func: (restProps) => Action(restProps, onActionClick, isAdmin),
		},
		{
			columnName: ColumnSetting2,
			func: Status,
		},
	];
	// onSelect User Row User Details Modal
	const onRowSelect = (userData) => {
		if (
			(isSuperAdmin && !userData?.group?.includes("Superadmin")) ||
			(isAdmin && !userData?.group?.includes("Admin"))
		) {
			fetchUserDetails(userData.id);
			toggleUserDetailsModal(true);
		}
	};
	//************************* User Main Screen End *******************************//

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
			getUserListing();
		}
	};
	const onUserSearch = () => {
		if (searchText && users) {
			getUserListing(searchText);
		}
	};
	// onSearch Clear
	const onClear = () => {
		setSearchText("");
		getUserListing();
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
		Campus: [],
		Group: [
			{
				from: "Group",
				title: "Admin",
				value: false,
			},
			{
				from: "Group",
				title: "Additional User",
				value: false,
			},
			{
				from: "Group",
				title: "Owner",
				value: false,
			},
			{
				from: "Group",
				title: "Lessee",
				value: false,
			},
			{
				from: "Group",
				title: "Vendor",
				value: false,
			},
			{
				from: "Group",
				title: "Staff",
				value: false,
			},
		],
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
	// Get Campuses
	const getCampusesListing = (name, zones, status,) => {
		return new Promise((resolve, reject) => {
			ApiController.fetchCampusesCall(name, zones, status, (response) => {
				try {
					const data = processResponse("Campus", response);
					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		});
	};
	// Set Zone && Campus List in the Filters
	const setZoneAndCampus = async () => {
		try {
			const [zones, campus] = await Promise.all([
				getZonesListing(),
				getCampusesListing(),
			]);

			let group = filters.Group.slice();
			let status = filters.Status.slice();
			setFilters(() => ({
				Zone: zones,
				Group: group,
				Campus: campus,
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
		let campus = filters.Campus.slice();
		let group = filters.Group.slice();
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
					Group: group,
					Campus: campus,
					Status: status,
				};
				return newObj;
			});
			// Calling Listing
			getUserListing("", zones, campus, group, status);
		} else if (item?.from === "Group") {
			setFilters(() => {
				// eslint-disable-next-line
				group.map((gItem) => {
					if (item.title === gItem.title) {
						return (gItem.value = !gItem.value);
					}
				});
				const newObj = {
					Zone: zones,
					Group: group,
					Campus: campus,
					Status: status,
				};
				return newObj;
			});
			// Calling Listing
			getUserListing("", zones, campus, group, status);
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
					Group: group,
					Campus: campus,
					Status: status,
				};
				return newObj;
			});
			// Calling Listing
			getUserListing("", zones, campus, group, status);
		} else if (item?.from === "Campus") {
			setFilters(() => {
				// eslint-disable-next-line
				campus.map((cItem) => {
					if (item.title === cItem.title) {
						return (cItem.value = !cItem.value);
					}
				});
				const newObj = {
					Zone: zones,
					Group: group,
					Campus: campus,
					Status: status,
				};
				return newObj;
			});
			// Calling Listing
			getUserListing("", zones, campus, group, status);
		}
	};

	// OnClear Filters
	const onClearFilter = () => {
		setFilters(() => {
			let zones = filters.Zone.slice();
			let campus = filters.Campus.slice();
			let group = filters.Group.slice();
			let status = filters.Status.slice();

			zones.map((zItem) => {
				return (zItem.value = false);
			});
			campus.map((cItem) => {
				return (cItem.value = false);
			});
			group.map((gItem) => {
				return (gItem.value = false);
			});
			status.map((sItem) => {
				return (sItem.value = false);
			});

			const newObj = {
				Zone: zones,
				Group: group,
				Campus: campus,
				Status: status,
			};
			return newObj;
		});

		// Calling Listing
		getUserListing();

		// Closing Filter Modal
		handleClose();

		// To Close DropDown
		setListOpen([]);
	};
	//************************* Filter End *******************************//

	//************************* Add New User Start *******************************//

	//***** Initial value *****//
	const addUserStates = {
		newUser: {
			fName: "",
			lName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		errors: {
			name: "",
			msg: "",
		},
		pwdValidation: {
			minLength: null,
			number: null,
			isLowerCase: null,
			isUpperCase: null,
			isSpecialChar: null,
		},
	};
	//***** States *****//
	const [addUserModal, toggleAddUserModal] = useState(false);
	// OnSave Add New User State
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(addUserStates.errors);
	// Add New User States
	const [newUser, setNewUser] = useState(addUserStates.newUser);
	const [pwdValidation, setPwdValidation] = useState(
		addUserStates.pwdValidation
	);

	//***** Methods *****//

	// To Check Input Not Containing Special Charactrers
	const validateInput = (name, text) => {
		// Only Accept Characters
		var characters = /^[a-zA-Z]*$/;

		if (name === "fName" || name === "lName") {
			return characters.test(text);
		} else {
			return true;
		}
	};
	// Add New User Input OnChange
	const handleOnChange = (e) => {
		if (
			validateInput(e.target.name, e.target.value) &&
			e.target.name !== "password"
		) {
			setNewUser({
				...newUser,
				[e.target.name]: e.target.value,
			});
		}

		if (e.target.name === "password") {
			setNewUser({
				...newUser,
				[e.target.name]: e.target.value,
			});
			validatePasswordInput(e.target.value, setPwdValidation);
		}

		// resetting Error State
		resetErrors();
	};

	// To Reset Errors
	const resetErrors = () => {
		setErrors(addUserStates.errors);
	};

	// Add New User On Close
	const addUserOnClose = () => {
		setNewUser(addUserStates.newUser);
		setErrors(addUserStates.errors);
		setPwdValidation("");
		toggleAddUserModal(false);
	};

	// Add New User On Save Press
	const addNewUser = async () => {
		setLoading(true);

		if (
			!(await validateEmail(
				newUser.email.toLocaleLowerCase().trim(),
				setErrors
			))
		) {
			return setLoading(false);
		} else if (!(await validatePassword(newUser.password, setErrors))) {
			return setLoading(false);
		} else if (
			!compareStrings(newUser.password, newUser.confirmPassword, setErrors)
		) {
			return setLoading(false);
		} else {
			ApiController.addNewUserCall(addUserPayload(), (response) => {
				if (response.success) {
					setLoading(false);
					setNewUser(addUserStates.newUser);
					setErrors(addUserStates.errors);
					setPwdValidation("");
					toggleAddUserModal(false);
					getUserListing();
				} else {
					if ("email" in response?.data[0]) {
						setErrors({
							name: "email",
							msg: response?.data[0].email,
						});
						setLoading(false);
					}
				}
			});
		}
	};
	// Create Payload
	const addUserPayload = () => {
		let payload = {
			first_name: newUser.fName,
			last_name: newUser.lName,
			email: newUser.email.toLocaleLowerCase().trim(),
			password: newUser.password,
		};
		return payload;
	};
	//************************* Add New User End *******************************//

	//************************* Edit User Start *******************************//
	//***** States *****//
	const groupInitValue = [
		{
			id: 1,
			title: "Additional User",
			desp: "A guest user invited by a owner or lessee to access a unit",
			value: false,
		},
		{
			id: 2,
			title: "Owner",
			desp: "A user who has purchased a unit",
			value: false,
		},
		{
			id: 3,
			title: "Vendor",
			desp: "A guest invited by a owner or lessee to service a unit",
			value: false,
		},
		{
			id: 4,
			title: "Lessee",
			desp: "A user who has leased a unit",
			value: false,
		},
		{
			id: 5,
			title: "Staff",
			desp: "A Luxelocker team member",
			value: false,
		},
		{
			id: 6,
			title: "Admin",
			desp: "System administrator for the admin panel",
			value: false,
		},
		// {
		// 	id: 7,
		// 	title: "Superadmin",
		// 	desp: "Administrator who has complete rights over the system",
		// 	value: false,
		// },
	];
	const editUserInitValue = {
		fName: "",
		lName: "",
		phone: "",
		password: "",
		id: "",
		address: "",
		email: "",
		driverLicense: "",
		documents: [],
		lastLogin: "",
		registerOn: "",
		group: [],
		groupSectionStatus: false,
		unit: [],
		cards: [],
		stripeCustomerId: "",
	};
	const [editUserModal, toggleEditUserModal] = useState(false);
	const [userDetailsLLoading, setUserDetailsLoading] = useState(false);
	const [editUserInfo, setEditUserInfo] = useState(editUserInitValue);
	const [groupStatus, setGroupStatus] = useState(false);
	const [groupsList, setGroupList] = useState(groupInitValue);

	//***** Methods *****//

	const fetchUserDetails = (UserID) => {
		setUserDetailsLoading(true);

		ApiController.userDetailsCall(UserID, (response) => {
			if (response.success) {
				let data = response?.data;

				setEditUserInfo({
					fName: data?.first_name,
					lName: data?.last_name,
					phone: data?.phone_no,
					password: data?.password,
					id: UserID,
					address: concatAddress(data?.mailing_address),
					email: data?.email,
					driverLicense: data?.license_number,
					documents: data?.documents,
					lastLogin: data?.last_login,
					registerOn: data?.created_at,
					group: data?.all_user_permissions,
					groupSectionStatus: data?.is_active,
					unit: data?.user_units,
					cards: data?.user_cards,
					stripeCustomerId: data?.stripe_customer_id,
				});
				setGroupStatus(data?.is_active);

				setGroupList(() => {
					let array = groupsList;

					if (data?.all_user_permissions?.length > 0) {
						// eslint-disable-next-line
						array.map((group) => {
							if (
								data?.all_user_permissions?.some(
									(item) => item.toLowerCase() === group.title.toLowerCase()
								)
							) {
								return (group.value = true);
							}
						});
						return array;
					} else {
						return groupsList;
					}
				});

				setUserDetailsLoading(false);
			} else {
				setUserDetailsLoading(false);
				setNetworkError(true);
			}
		});
	};
	// Create Address String From Object
	const concatAddress = (userAddress) => {
		let address;
		if (userAddress) {
			if (valNotNull(userAddress?.street_address)) {
				address = userAddress?.street_address + ", ";
			}
			if (valNotNull(userAddress?.city?.name)) {
				address = address + userAddress?.city?.name + ", ";
			}
			if (valNotNull(userAddress?.state?.name)) {
				address = address + userAddress?.state?.name + ", ";
			}
			if (valNotNull(userAddress?.zipcode)) {
				address = address + userAddress?.zipcode;
			}
		}
		return address;
	};
	// Checking That Value Not Null
	const valNotNull = (string) => {
		if (string !== null || string !== undefined) {
			return string;
		}
	};

	// Close User Details Modal && Open Edit User Modal
	const onClickEdit = () => {
		// close User Details Modal
		toggleUserDetailsModal(false);
		// Open Edit User Modal
		setTimeout(() => {
			toggleEditUserModal(true);
		}, 100);
	};
	// EditUser Group Setting OnChange
	const onChangeGroupList = (item, index) => {
		console.log("🚀 ~ file: Users.jsx:602 ~ item:", item);
		setGroupList((prevState) => {
			const array = [...prevState];
			array[index].value = item.value === false ? true : false;
			return array;
		});
	};

	//************************* Edit User End *******************************//

	//************************* User Details Start *******************************//
	//***** States *****//
	const [userDetailsModal, toggleUserDetailsModal] = useState(false);
	const [userDeleteData, setUserDeleteData] = useState([]);
	//************************* User Details End *******************************//

	//************************* Delete User Start *******************************//
	//***** States *****//
	const [deleteUserModal, toggleDeleteUserModal] = useState(false);

	//***** Methods *****//

	// Delete User Method
	const deleteUser = (id) => {
		setLoading(true);

		ApiController.deleteUserCall(id, (response) => {
			if (response.success) {
				getUserListing();
				setLoading(false);
				toggleDeleteUserModal(false);
			} else {
				setLoading(false);
			}
		});
	};
	//************************* Delete User End *******************************//

	//************************* UI Components *******************************//

	return (
		<>
			<UsersUI
				// Selestion State
				selectionIds={selectionIds}
				setSelectionIds={setSelectionIds}
				// Table Data
				loading={userLoading}
				usersColumnData={usersColumnData}
				usersColumnExtensionsData={usersColumnExtensionsData}
				usersRowData={users.length > 0 ? users : []}
				// SearchBar States
				searchText={searchText}
				// SearchBar Method
				onChangeSearch={onChangeSearch}
				onUserSearch={onUserSearch}
				onClear={onClear}
				// Table Methods
				dataProviders={dataProviders}
				// Openeing Add User Modal
				openAddUserModal={() => toggleAddUserModal(true)}
				// Open User Details Modal
				onRowSelect={(userDate) => onRowSelect(userDate)}
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
				// Network Error
				networkError={networkError}
				reCallListing={reCallListing}
			/>

			{/************************* Modals *******************************/}

			<AddUser
				open={addUserModal}
				close={addUserOnClose}
				loading={loading}
				error={errors}
				pwdValidation={pwdValidation}
				newUser={newUser}
				setNewUser={setNewUser}
				onChange={handleOnChange}
				onSave={addNewUser}
				resetErrors={resetErrors}
			/>

			{/* Edit User */}
			<EditUser
				open={editUserModal}
				close={() => toggleEditUserModal(false)}
				groupInitValue={groupInitValue}
				data={editUserInfo}
				setEditUserInfo={setEditUserInfo}
				recallUserDetails={fetchUserDetails}
				setGroupList={setGroupList}
				groupStatus={groupStatus}
				setGroupStatus={setGroupStatus}
				dataLoading={userDetailsLLoading}
				groupsList={groupsList}
				onChangeGroupList={onChangeGroupList}
				reCallListing={reCallListing}
			/>

			{/* User Details */}
			<UserDetails
				open={userDetailsModal}
				close={() => {
					setGroupList(groupInitValue);
					setEditUserInfo(editUserInitValue);
					toggleUserDetailsModal(false);
				}}
				data={editUserInfo}
				onClickEdit={onClickEdit}
				loading={userDetailsLLoading}
			/>

			{/* Delete User */}
			<DeleteUser
				open={deleteUserModal}
				close={() => toggleDeleteUserModal(false)}
				data={userDeleteData}
				deleteUser={deleteUser}
				loading={loading}
			/>
		</>
	);
};

export default Users;
