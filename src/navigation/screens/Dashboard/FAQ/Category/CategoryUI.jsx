// Library Imports
import React from "react";
import { Add } from "@mui/icons-material";

// Local Imports
import Button from "../../../../../components/button";
import { SearchBar } from "../../../../../components/SearchBar/SearchBar";
import {
	primaryColor,
	yellow,
} from "../../../../../utils/style/GlobalVariables";
import ServerError from "../../../../../components/serverError";
import CategoryTable from "../../../../../components/Tables/Table";
import { InsideSpinner } from "../../../../../components/Spinner/Spinner";
import DeleteCategory from "./DeleteCategory";
import AddEditCategory from "./AddEditCategory";

const CategoryUI = ({
	selectionIds,
	setSelectionIds,
	categoryColumnData,
	categoryColumnExtensionsData,
	categoryRowData,
	dataProviders,
	searchText,
	onChangeSearch,
	onCategorySearch,
	onClear,
	loading,
	networkError,
	reCallListing,
	addCategoryModal,
	setAddCategoryModal,
	fromEditCategory,
	onClose,
	category,
	setCategory,
	editCategoryData,
	addCategory,
	modalLoading,
	categoryError,
	deleteCategoryModal,
	setDeleteCategoryModal,
	deleteCategory
}) => {
	return (
		<div className="main-container px-6 pt-3">
			{/* Search Bar Row */}
			<div className="flex flex-row justify-between align-items-center py-3 gap-5">
				<Button
					startIcon={<Add fontSize="small" />}
					height={38}
					style={{
						backgroundColor: yellow,
						color: primaryColor,
						fontFamily: "Inter-Medium",
						fontSize: 13,
						textTransform: "none",
						width: "200px",
						borderRadius: 8,
					}}
					onClick={() => setAddCategoryModal(true)}
					component="span"
					variant="contained"
					disabled={loading}
				>
					{"New Category"}
				</Button>
				<SearchBar
					disabled={selectionIds.length > 0 ? true : false}
					onSearch={() => onCategorySearch()}
					onClear={() => onClear()}
					onChange={onChangeSearch}
					value={searchText}
				/>
			</div>

			{/* Campus Table */}
			{loading ? (
				<InsideSpinner />
			) : networkError ? (
				<ServerError reCallListing={reCallListing} />
			) : (
				<CategoryTable
					rows={categoryRowData}
					columns={categoryColumnData}
					tableColumnExtensions={categoryColumnExtensionsData}
					dataProviders={dataProviders}
					selectionIds={selectionIds}
					setSelectionIds={setSelectionIds}
				/>
			)}

			{/* Add Category */}
			<AddEditCategory
				open={addCategoryModal}
				close={onClose}
				category={category}
				setCategory={setCategory}
				addCategory={addCategory}
				loading={modalLoading}
				categoryError={categoryError}
				fromEditCategory={fromEditCategory}
				editCategoryData={editCategoryData}
			/>

			{/* Delete Category */}
			<DeleteCategory
				open={deleteCategoryModal}
				close={() => setDeleteCategoryModal(false)}
				editCategoryData={editCategoryData}
				loading={modalLoading}
				deleteCategory={deleteCategory}
			/>
		</div>
	);
};

export default CategoryUI;
