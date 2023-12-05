// Library Imports
import React, { useState, useEffect, useCallback } from "react";

// Local Imports
import AnnouncementsUI from "./AnnouncementsUI";
import { AnnouncementsAction } from "../../../../components/Tables/utils";
import {
	announcementsColumnData,
	announcementsColumnExtensionsData,
	announcementsRowData,
} from "../../../../components/Tables/dummyData";
import {
	camalize,
	toUpperCase,
} from "../../../../utils/validations/localValidations";
import ApiController from "../../../../utils/network/api";
import moment from "moment";

const Announcements = () => {
	//************************* Announcements Main Screen Start *******************************//

	//***** States *****//
	const [selectionIds, setSelectionIds] = useState([]);
	// Announcements Data For Table
	const [announcements, setAnnouncements] = useState([]);
	const [campuses, setCampuses] = useState([]);
	const [users, setUsers] = useState([]);
	const [announcementsLoading, setAnnouncementsLoading] = useState(true);
	const [campusSelectAll, setCampusSelectAll] = useState(false);
	const [groupSelectAll, setGroupSelectAll] = useState(false);

	const [networkError, setNetworkError] = useState(false);

	// DataProvider Column Data
	const [ColumnSetting1] = useState(["action"]);

	useEffect(() => {
		getAnnouncementsListing();
		getCampusesListing();
		// eslint-disable-next-line
	}, []);

	//***** Methods *****//
	const getAnnouncementsListing = (name) => {
		setAnnouncementsLoading(true);

		ApiController.fetchAnnouncementsCall(name, (response) => {
			if (response?.success) {
				// sort response array
				const sortArray = response?.data?.sort(function (a, b) {
					return a.id - b.id || a.title.localeCompare(b.title);
				});
				let announcements = sortArray?.map((item, index) => {
					// creating object
					return {
						id: item?.id,
						announcement: item?.title,
						groups:
							item?.groups !== null
								? item?.groups
										?.map((item) => {
											return item?.includes("_")
												? camalize(item?.replace("_", " "))
												: toUpperCase(item);
										})
										.join(", ")
								: "",
						startDate: moment(item?.start_date).format("LL"),
						endDate: moment(item?.end_date).format("LL"),
						status: item?.is_active,
						completeItem: item,
					};
				});
				setAnnouncements(announcements);
				setAnnouncementsLoading(false);
			} else {
				setAnnouncementsLoading(false);
				setNetworkError(true);
			}
		});
	};
	// Get Campuses
	const getCampusesListing = (name, zones, status = "true") => {
		ApiController.fetchCampusesCall(name, zones, status, (response) => {
			if (response.success) {
				// sort response array
				const sortArray = response.data.sort(function (a, b) {
					return a.id - b.id || a.name.localeCompare(b.name);
				});
				let data = sortArray.map((item) => {
					let obj = {
						id: item.id,
						name: item.name,
						rawItem: item,
					};
					return obj;
				});
				setCampuses(data);
			}
		});
	};
	// Get Campuses
	const getUsersListing = (campusArray, groupArray) => {
		const payload = {
			campuses: campusSelectAll
				? []
				: campusArray?.map((item) => {
						return item?.id;
				  }),
			groups: groupSelectAll
				? ["all_user"]
				: groupArray?.map((item) => {
						return item?.name?.includes(" ")
							? item.name.replace(" ", "_").toLowerCase()
							: item.name.toLowerCase();
				  }),
		};
		ApiController.fetcAnnouncementUsersCall(payload, (response) => {
			if (response.success) {
				// sort response array
				const sortArray = response.data.sort(function (a, b) {
					return a.id - b.id || a.name.localeCompare(b.name);
				});
				let data = sortArray.map((item) => {
					let obj = {
						id: item?.id,
						name: item?.name?.first_name + " " + item?.name?.last_name,
						rawItem: item,
					};
					return obj;
				});
				setUsers(data);
			}
		});
	};

	// Again Call For Listing

	const reCallListing = () => {
		setNetworkError(false);

		getAnnouncementsListing();
	};

	// Action Click From Table
	const onActionClick = async (type, announcementData) => {
		setEditAnnouncementData(announcementData);
		if (type === "play") {
			console.log(
				"🚀 ~ file: Users.jsx:118 ~ from:",
				type,
				"\ndata",
				announcementData
			);
			onPressPlayPause(announcementData?.id, true);
		} else if (type === "pause") {
			console.log(
				"🚀 ~ file: Users.jsx:118 ~ from:",
				type,
				"\ndata",
				announcementData
			);
			onPressPlayPause(announcementData?.id, false);
		} else if (type === "restart") {
			console.log(
				"🚀 ~ file: Users.jsx:118 ~ from:",
				type,
				"\ndata",
				announcementData
			);

			const campus = announcementData?.completeItem?.campuses?.map((item) => {
				return { id: item };
			});
			const groups = announcementData?.completeItem?.groups?.map((item) => {
				return { name: item };
			});
			getUsersListing(campus, groups);

			setAddAnnouncementData({
				title: announcementData?.completeItem?.title,
				body: announcementData?.completeItem?.body,
				startDate: announcementData?.completeItem?.start_date,
				endDate: announcementData?.completeItem?.end_date,
				campus: announcementData?.completeItem?.campuses?.map((campusID) => {
					return campuses.find((obj) => obj.id === campusID);
				}),
				group: announcementData?.completeItem?.groups?.map((groupName) => {
					groupName = groupName?.includes("_")
						? camalize(groupName?.replace("_", " "))
						: toUpperCase(groupName);
					return group.find((obj) => obj.name === groupName);
				}),
				repeat: announcementData?.completeItem?.repeat.includes("_")
					? camalize(
							announcementData?.completeItem?.repeat.replace("_", " ")
					  ).replace(" ", "-")
					: toUpperCase(announcementData?.completeItem?.repeat),
			});
			setFromEdit(true);
			setAddEditAnnouncementModal(true);
		} else {
			console.log(
				"🚀 ~ file: Users.jsx:118 ~ from:",
				type,
				"\ndata",
				announcementData
			);
			setDeleteAnnouncementModal(true);
		}
	};
	// Data Provider
	const dataProviders = [
		{
			columnName: ColumnSetting1,
			func: (restProps) => AnnouncementsAction(restProps, onActionClick),
		},
	];

	//************************* Announcements Main Screen End *******************************//

	//************************* Search Bar Start *******************************//
	//***** States *****//
	const [searchText, setSearchText] = useState("");

	//***** Methods *****//

	// Search Announcements Method
	const onChangeSearch = (e) => {
		if (e.target.value !== "") {
			setSearchText(e.target.value);
		} else {
			setSearchText("");
			getAnnouncementsListing();
		}
	};
	const onAnnouncementSearch = () => {
		if (searchText) {
			getAnnouncementsListing(searchText);
		}
	};
	// onSearch Clear
	const onClear = () => {
		setSearchText("");
		getAnnouncementsListing();
	};
	//************************* Search Bar End *******************************//

	//************************* Add / Edit Announcement Start *******************************//
	const [editAnnouncementData, setEditAnnouncementData] = useState("");
	const [addEditAnnouncementModal, setAddEditAnnouncementModal] =
		useState(false);
	const [fromEdit, setFromEdit] = useState(false);
	const [arrayLength, setArrayLength] = useState({
		campus: 0,
		group: 0,
	});
	const [addAnnouncementData, setAddAnnouncementData] = useState({
		title: "",
		body: "",
		campus: [],
		group: [],
		startDate: "",
		endDate: "",
		repeat: "",
	});
	const group = [
		{ id: 1, name: "Owner" },
		{ id: 2, name: "Lessee" },
		{ id: 3, name: "Additional User" },
		{ id: 4, name: "Vendor" },
	];

	const repeat = [
		{ name: "Daily" },
		{ name: "Weekly" },
		{ name: "Bi-Weekly" },
		{ name: "Monthly" },
		{ name: "Yearly" },
	];

	useCallback(() => {});
	// Multiselect Dropdown
	const onChangeMultiSelect = (from, value) => {
		setAddAnnouncementData(() => {
			let array = [...addAnnouncementData?.[from]];
			if (array?.find((item) => item?.id === value?.id)) {
				const valueIndex = array.findIndex((item) => item.id === value.id);
				array?.splice(valueIndex, 1);
			} else {
				array?.push(value);
			}
			if (from === "campus"){
				array?.length === arrayLength?.[from] ? setCampusSelectAll(true) : setCampusSelectAll(false);
			} else{
				array?.length === arrayLength?.[from] ? setGroupSelectAll(true) : setGroupSelectAll(false);
			}
			return {
				...addAnnouncementData,
				[from]: array,
			};
		});
		// Get Users
		getUsersListing(addAnnouncementData?.campus, addAnnouncementData?.group);
	};
	// Multiselect Dropdown Selecta All
	const onChangeAllMultiselect = (from, select, array) => {
		if (select) {
			setArrayLength({
				...arrayLength,
				[from]: array?.length,
			})
			setAddAnnouncementData({
				...addAnnouncementData,
				[from]: array,
			});
			from === "campus" ? setCampusSelectAll(true) : setGroupSelectAll(true);
		} else {
			setArrayLength({
				...arrayLength,
				[from]: 0,
			})
			setAddAnnouncementData({
				...addAnnouncementData,
				[from]: [],
			});
			from === "campus" ? setCampusSelectAll(false) : setGroupSelectAll(false);
		}
		// Get Users
		getUsersListing(addAnnouncementData?.campus, addAnnouncementData?.group);
	};

	const onClose = () => {
		setAddEditAnnouncementModal(false);
		setFromEdit(false);
		setModalLoading(false);
		setCampusSelectAll(false);
		setGroupSelectAll(false);
		setAddAnnouncementData({
			title: "",
			body: "",
			campus: [],
			group: [],
			startDate: "",
			endDate: "",
			repeat: "",
		});
		setUsers([]);
		setEditAnnouncementData("");
	};

	const modalSaveBtnCheck = () => {
		const { title, body, campus, group, users, startDate, endDate, repeat } =
			addAnnouncementData;
		if (
			title?.trim() &&
			body?.replaceAll(/<[^>]*>/g, "") &&
			campus !== [] &&
			group !== [] &&
			startDate &&
			endDate &&
			repeat
		) {
			return false;
		} else {
			return true;
		}
	};

	const createAddEditPayload = () => {
		const payload = {
			title: addAnnouncementData?.title,
			body: addAnnouncementData?.body,
			start_date: addAnnouncementData?.startDate,
			end_date: addAnnouncementData?.endDate,
			campuses: campusSelectAll ? [] : addAnnouncementData?.campus?.map((item) => {
				return item?.id;
			}),
			groups: groupSelectAll ? ['all_user'] : addAnnouncementData?.group?.map((item) => {
				return item?.name?.includes(" ")
					? item.name.replace(" ", "_").toLowerCase()
					: item.name.toLowerCase();
			}),
			user_ids: users?.map((item) => {
				return item?.id;
			}),
			repeat: addAnnouncementData?.repeat.toLowerCase().includes("-")
				? addAnnouncementData?.repeat.toLowerCase().replace("-", "_")
				: addAnnouncementData?.repeat.toLowerCase(),
		};
		return payload;
	};
	const onSavePress = () => {
		setModalLoading(true);
		if (fromEdit) {
			ApiController?.updateAnnouncementCall(
				editAnnouncementData?.id,
				createAddEditPayload(),
				(res) => {
					if (res?.success) {
						onClose();
						setModalLoading(false);
						getAnnouncementsListing();
					} else {
						setModalLoading(false);
					}
				}
			);
		} else {
			ApiController?.addNewAnnouncementCall(createAddEditPayload(), (res) => {
				if (res?.success) {
					onClose();
					setModalLoading(false);
					getAnnouncementsListing();
				} else {
					setModalLoading(false);
				}
			});
		}
	};
	const onPressPlayPause = (id, action) => {
		ApiController?.updateAnnouncementCall(id, { is_active: action }, (res) => {
			if (res?.success) {
				getAnnouncementsListing();
			}
		});
	};

	//************************* Add / Edit Announcement End *******************************//

	//************************* Delete Announcement Start *******************************//
	const [deleteAnnouncementModal, setDeleteAnnouncementModal] = useState(false);
	const [modalLoading, setModalLoading] = useState(false);

	const [deleteAnnouncementError, setDeleteAnnouncementError] = useState("");

	const deleteAnnouncement = (id) => {
		setModalLoading(true);
		setDeleteAnnouncementError("");
		ApiController.deleteAnnouncementCall(id, (response) => {
			if (response?.success) {
				setDeleteAnnouncementModal(false);
				setModalLoading(false);
				getAnnouncementsListing();
			} else {
				setModalLoading(false);
				setDeleteAnnouncementError("Live Announcement can't be deleted");
			}
		});
	};
	//************************* Delete Announcement End *******************************//

	//************************* UI Components *******************************//

	return (
		<>
			<AnnouncementsUI
				// Selestion State
				selectionIds={selectionIds}
				setSelectionIds={setSelectionIds}
				// Table Data
				loading={announcementsLoading}
				announcementsColumnData={announcementsColumnData}
				announcementsColumnExtensionsData={announcementsColumnExtensionsData}
				// announcementsRowData={announcementsRowData}
				announcementsRowData={announcements.length > 0 ? announcements : []}
				// SearchBar States
				searchText={searchText}
				// SearchBar Method
				onChangeSearch={onChangeSearch}
				onAnnouncementSearch={onAnnouncementSearch}
				onClear={onClear}
				// Table Methods
				dataProviders={dataProviders}
				// Filter Modal States

				// Add / Edit Modal
				addEditAnnouncementModal={addEditAnnouncementModal}
				setAddEditAnnouncementModal={setAddEditAnnouncementModal}
				onClose={onClose}
				fromEdit={fromEdit}
				campuses={campuses}
				group={group}
				onChangeMultiSelect={onChangeMultiSelect}
				onChangeAllMultiselect={onChangeAllMultiselect}
				repeat={repeat}
				addAnnouncementData={addAnnouncementData}
				setAddAnnouncementData={setAddAnnouncementData}
				modalSaveBtnCheck={modalSaveBtnCheck}
				onSavePress={onSavePress}
				// Delete Modal
				deleteAnnouncementModal={deleteAnnouncementModal}
				setDeleteAnnouncementModal={setDeleteAnnouncementModal}
				deleteAnnouncementError={deleteAnnouncementError}
				setDeleteAnnouncementError={setDeleteAnnouncementError}
				modalLoading={modalLoading}
				editAnnouncementData={editAnnouncementData}
				deleteAnnouncement={deleteAnnouncement}
				// Network Error
				networkError={networkError}
				reCallListing={reCallListing}
				campusSelectAll={campusSelectAll}
				setCampusSelectAll={setCampusSelectAll}
				groupSelectAll={groupSelectAll}
				setGroupSelectAll={setGroupSelectAll}
			/>

			{/************************* Modals *******************************/}
		</>
	);
};

export default Announcements;
