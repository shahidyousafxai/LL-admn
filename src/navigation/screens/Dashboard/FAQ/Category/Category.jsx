// Library Imports
import React, { useState, useEffect } from "react";
import {
	CategoryColumnData,
	CategoryColumnExtensionsData,
} from "../../../../../components/Tables/dummyData";
import { Action } from "../../../../../components/Tables/utils";
import ApiController from "../../../../../utils/network/api";
import { camalize } from "../../../../../utils/validations/localValidations";

// Local Imports
import CategoryUI from "./CategoryUI";

const Category = () => {
	useEffect(() => {
		getCategoryListing();
	}, []);

	//************************* Category Main Screen Start *******************************//

	//***** States *****//
	const [ColumnSetting1] = useState(["action"]);
	const [selectionIds, setSelectionIds] = useState([]);
	const [Categories, setCategories] = useState([]);

	const [categoryListLoading, setCategoryListLoading] = useState(false);
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
	const onActionClick = (type, category) => {
		setEditCategoryData(category);
		if (type === "edit") {
			setCategory(category?.category);
			setFromEditCategory(true);
			setAddCategoryModal(true);
		} else {
			setDeleteCategoryModal(true);
		}
	};

	const getCategoryListing = (name) => {
		setCategoryListLoading(true);

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
						category: camalize(item.name),
					};
					return obj;
				});
				setCategories(data);
				setCategoryListLoading(false);
			} else {
				setCategoryListLoading(false);
				setNetworkError(true);
			}
		});
	};
	// Again Call For Listing
	const reCallListing = () => {
		setNetworkError(false);
		getCategoryListing();
	};
	//************************* Category Main Screen End *******************************//

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
			getCategoryListing();
		}
	};
	const onCategorySearch = () => {
		if (searchText) {
			getCategoryListing(searchText);
		}
	};
	// onSearch Clear
	const onClear = () => {
		setSearchText("");
		getCategoryListing();
	};
	//************************* Search Bar End *******************************//

	//************************* Add / Edit Category Start *******************************//
	const [addCategoryModal, setAddCategoryModal] = useState(false);
	const [fromEditCategory, setFromEditCategory] = useState(false);
	const [editCategoryData, setEditCategoryData] = useState(false);
	const [modalLoading, setModalLoading] = useState(false);
	const [category, setCategory] = useState("");
	const [categoryError, setCategoryError] = useState("");

	const addCategory = () => {
		setModalLoading(true);
		const payload = {
			name: category.trim().toLowerCase(),
		};
		if (!fromEditCategory) {
			ApiController.addNewCategoryCall(payload, (response) => {
				onGetResponse(response);
			});
		} else {
			ApiController.updateCategoryCall(
				editCategoryData?.id,
				payload,
				(response) => {
					onGetResponse(response);
				}
			);
		}
	};

	const onGetResponse = (response) => {
		if (response?.success) {
			onClose();
			getCategoryListing();
		} else {
			setModalLoading(false);
			setCategoryError(response?.data?.[0]?.name);
		}
	};

	const onChangeCategory = (e) => {
		setCategoryError("");
		e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, "");
		setCategory(e.target.value);
	};

	const onClose = () => {
		setAddCategoryModal(false);
		setFromEditCategory(false);
		setModalLoading(false);
		setCategory("");
		setCategoryError("");
	};

	//************************* Add / Edit Category End *******************************//

	//************************* Delete Category End *******************************//
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

	const deleteCategory = (id) => {
		setModalLoading(true);

		ApiController.deleteCategoryCall(id, (response) => {
			if (response?.success) {
				setDeleteCategoryModal(false);
				setModalLoading(false);
				getCategoryListing();
			} else {
				setModalLoading(false);
			}
		})
	}

	//************************* Delete Category End *******************************//

	return (
		<CategoryUI
			// Selestion State
			selectionIds={selectionIds}
			setSelectionIds={setSelectionIds}
			// Table Data
			categoryColumnData={CategoryColumnData}
			categoryColumnExtensionsData={CategoryColumnExtensionsData}
			categoryRowData={Categories.length > 0 ? Categories : []}
			// Table Methods
			dataProviders={dataProviders}
			// SearchBar States
			searchText={searchText}
			// SearchBar Method
			onChangeSearch={onChangeSearch}
			onCategorySearch={onCategorySearch}
			onClear={onClear}
			// Loading to show view after API Call
			loading={categoryListLoading}
			networkError={networkError}
			reCallListing={reCallListing}
			// Add Edit Category
			addCategoryModal={addCategoryModal}
			setAddCategoryModal={setAddCategoryModal}
			fromEditCategory={fromEditCategory}
			onClose={onClose}
			category={category}
			setCategory={onChangeCategory}
			editCategoryData={editCategoryData}
			addCategory={addCategory}
			modalLoading={modalLoading}
			categoryError={categoryError}
			// Delete Category
			deleteCategoryModal={deleteCategoryModal}
			setDeleteCategoryModal={setDeleteCategoryModal}
			deleteCategory={deleteCategory}
		/>
	);
};

export default Category;
