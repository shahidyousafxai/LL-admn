// Library Imports
import React, { useState, useEffect } from "react";
import {
	FAQColumnData,
	FAQColumnExtensionsData,
	FAQRowData,
} from "../../../../../components/Tables/dummyData";
import { Action } from "../../../../../components/Tables/utils";
import ApiController from "../../../../../utils/network/api";
import { camalize } from "../../../../../utils/validations/localValidations";

// Local Imports
import FAQsUI from "./FAQsUI";

const FAQs = () => {
	useEffect(() => {
		getFAQsListing();
		getCategoryListing();
	}, []);

	//************************* FAQs Main Screen Start *******************************//

	//***** States *****//
	const [ColumnSetting1] = useState(["action"]);
	const [selectionIds, setSelectionIds] = useState([]);
	const [FAQs, setFAQs] = useState([]);

	const [FAQsListLoading, setFAQsListLoading] = useState(false);
	const [networkError, setNetworkError] = useState(false);

	//***** Methods *****//
	// Table Action UI
	const dataProviders = [
		{
			columnName: ColumnSetting1,
			func: (restProps) => Action(restProps, onActionClick),
		},
	];
	// Action Click From Table
	const onActionClick = (type, FAQData) => {
		console.log("🚀 ~ file: FAQs.jsx:41 ~ FAQData:", FAQData);
		setEditFAQsData(FAQData);
		if (type === "edit") {
			setFromEditFAQ(true);
			const categoryName = categories?.filter((item) => {
				if (item?.id === FAQData?.completeItem?.category) {
					return item;
				}
			});
			const answer = FAQData?.completeItem?.image_url
				? FAQData?.completeItem?.answer +
				  `<img src=${FAQData?.completeItem?.image_url} />`
				: FAQData?.completeItem?.answer;
			setAddFAQsData({
				categoryName: categoryName?.[0]?.name ? categoryName?.[0]?.name : "",
				categoryID: FAQData?.completeItem?.category
					? FAQData?.completeItem?.category
					: "",
				question: FAQData?.completeItem?.question
					? FAQData?.completeItem?.question
					: "",
				answer: answer ? answer : "",
				status: FAQData?.completeItem?.is_active,
			});
			setAddFAQModal(true);
		} else {
			setDeleteFAQModal(true);
		}
	};

	const getFAQsListing = (name) => {
		setFAQsListLoading(true);

		ApiController.fetchFAQsCall(name, (response) => {
			if (response?.success) {
				// sort response array
				const sortArray = response.data.sort(function (a, b) {
					return a.id - b.id || a.question.localeCompare(b.question);
				});
				// create object to render table
				let data = sortArray.map((item) => {
					let obj = {
						id: item.id,
						FAQs: item.question,
						completeItem: item,
					};
					return obj;
				});
				setFAQs(data);
				setFAQsListLoading(false);
			} else {
				setFAQsListLoading(false);
				setNetworkError(true);
			}
		});
	};
	// Again Call For Listing
	const reCallListing = () => {
		setNetworkError(false);
		getFAQsListing();
	};
	//************************* FAQs Main Screen End *******************************//

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
			getFAQsListing();
		}
	};
	const onFAQsSearch = () => {
		if (searchText) {
			getFAQsListing(searchText);
		}
	};
	// onSearch Clear
	const onClear = () => {
		setSearchText("");
		getFAQsListing();
	};
	//************************* Search Bar End *******************************//

	//************************* Add / Edit FAQ Start *******************************//
	const [addFAQModal, setAddFAQModal] = useState(false);
	const [modalLoading, setModalLoading] = useState(false);
	const [fromEditFAQ, setFromEditFAQ] = useState(false);
	const [editFAQsData, setEditFAQsData] = useState("");
	const [categories, setCategories] = useState([]);
	const [addFAQsData, setAddFAQsData] = useState({
		categoryName: "",
		categoryID: "",
		question: "",
		answer: "",
		status: true,
	});
	const [ansImage, setAnsImage] = useState("");
	const [imageError, setImageError] = useState("");

	const onClose = () => {
		setAddFAQModal(false);
		setFromEditFAQ(false);
		setModalLoading(false);
		setAddFAQsData({
			categoryID: "",
			categoryName: "",
			question: "",
			answer: "",
			status: true,
		});
		setAnsImage("");
		setImageError("");
		setEditFAQsData("");
		// setCategoryError("");
	};

	// Fetch Categories Listing for Dropdown in Modal
	const getCategoryListing = (name) => {
		ApiController.fetchCategoryCall(name, (response) => {
			if (response?.success) {
				// sort response array
				const sortArray = response.data.sort(function (a, b) {
					return a.id - b.id || a.name.localeCompare(b.name);
				});
				// create object to render table
				let data = sortArray.map((item) => {
					let obj = {
						id: item.id,
						name: camalize(item.name),
					};
					return obj;
				});
				setCategories(data);
			} else {
				setNetworkError(true);
			}
		});
	};

	const addFAQModalSaveBtnCheck = () => {
		const { categoryID, categoryName, question, answer, status } = addFAQsData;

		if (
			!fromEditFAQ &&
			categoryID &&
			categoryName &&
			question?.trim() &&
			question?.replaceAll("\n", "") &&
			answer?.replaceAll(/<[^>]*>/g, "")
		) {
			return false;
		} else if (
			fromEditFAQ &&
			categoryID &&
			categoryName &&
			question?.trim() &&
			question?.replaceAll("\n", "") &&
			answer?.replaceAll(/<[^>]*>/g, "")
		) {
			return false;
		} else {
			return true;
		}
	};

	const createPayload = (answerObject) => {
		let formData = new FormData();
		formData.append("category", addFAQsData?.categoryID);
		formData.append("question", addFAQsData?.question);
		formData.append("answer", answerObject?.answer);
		formData.append("is_active", addFAQsData?.status);
		if (answerObject?.hasImage && ansImage !== "") {
			formData.append("image", ansImage);
		}
		if (
			answerObject?.hasImage &&
			fromEditFAQ &&
			(editFAQsData?.completeItem?.image_name !== null || ansImage !== "")
		) {
			formData.append("is_image", answerObject?.hasImage);
		}
		return formData;
	};

	const onSavePress = (answerObject) => {
		setModalLoading(true);
		if (fromEditFAQ) {
			ApiController?.updateFAQCall(
				editFAQsData?.id,
				createPayload(answerObject),
				(res) => {
					if (res?.success) {
						onClose();
						setModalLoading(false);
						getFAQsListing();
					} else {
						setModalLoading(false);
					}
				}
			);
		} else {
			ApiController?.addNewFAQCall(createPayload(answerObject), (res) => {
				if (res?.success) {
					onClose();
					setModalLoading(false);
					getFAQsListing();
				} else {
					setModalLoading(false);
				}
			});
		}
	};

	//************************* Add / Edit FAQ End *******************************//

	//************************* Delete FAQ Start *******************************//
	const [deleteFAQModal, setDeleteFAQModal] = useState(false);
	const [deleteFAQError, setDeleteFAQError] = useState("");

	const deleteFAQ = (id) => {
		setModalLoading(true);
		setDeleteFAQError("");
		ApiController.deleteFAQCall(id, (response) => {
			if (response?.success) {
				setDeleteFAQModal(false);
				setModalLoading(false);
				getFAQsListing();
			} else {
				setModalLoading(false);
				setDeleteFAQError("Inactive FAQs can't be deleted.");
			}
		});
	};
	//************************* Delete FAQ End *******************************//

	return (
		<FAQsUI
			// Selestion State
			selectionIds={selectionIds}
			setSelectionIds={setSelectionIds}
			// Table Data
			FAQsColumnData={FAQColumnData}
			FAQsColumnExtensionsData={FAQColumnExtensionsData}
			FAQsRowData={FAQs.length > 0 ? FAQs : []}
			// Table Methods
			dataProviders={dataProviders}
			// SearchBar States
			searchText={searchText}
			// SearchBar Method
			onChangeSearch={onChangeSearch}
			onFAQsSearch={onFAQsSearch}
			onClear={onClear}
			// Loading to show view after API Call
			loading={FAQsListLoading}
			networkError={networkError}
			reCallListing={reCallListing}
			// Add Edit FAQ
			addFAQModal={addFAQModal}
			setAddFAQModal={setAddFAQModal}
			categories={categories}
			addFAQsData={addFAQsData}
			setAddFAQsData={setAddFAQsData}
			setAnsImage={setAnsImage}
			modalLoading={modalLoading}
			editFAQsData={editFAQsData}
			setEditFAQsData={setEditFAQsData}
			addFAQModalSaveBtnCheck={addFAQModalSaveBtnCheck}
			onClose={onClose}
			imageError={imageError}
			setImageError={setImageError}
			fromEditFAQ={fromEditFAQ}
			onSavePress={onSavePress}
			// Delete FAQ Modal
			deleteFAQModal={deleteFAQModal}
			setDeleteFAQModal={setDeleteFAQModal}
			deleteFAQ={deleteFAQ}
			deleteFAQError={deleteFAQError}
			setDeleteFAQError={setDeleteFAQError}
		/>
	);
};

export default FAQs;
