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
import FAQsTable from "../../../../../components/Tables/Table";
import { InsideSpinner } from "../../../../../components/Spinner/Spinner";
import AddEditFAQ from "./AddEditFAQ";
import DeleteFAQ from "./DeleteFAQ";

const FAQsUI = ({
	selectionIds,
	setSelectionIds,
	FAQsColumnData,
	FAQsColumnExtensionsData,
	FAQsRowData,
	dataProviders,
	searchText,
	onChangeSearch,
	onFAQsSearch,
	onClear,
	loading,
	networkError,
	reCallListing,
	addFAQModal,
	setAddFAQModal,
	categories,
	addFAQsData,
	setAddFAQsData,
	setAnsImage,
	modalLoading,
	editFAQsData,
	setEditFAQsData,
	addFAQModalSaveBtnCheck,
	onClose,
	imageError,
	setImageError,
	fromEditFAQ,
	onSavePress,
	deleteFAQModal,
	setDeleteFAQModal,
	deleteFAQ,
	deleteFAQError,
	setDeleteFAQError,
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
						width: "170px",
						borderRadius: 8,
					}}
					onClick={() => setAddFAQModal(true)}
					component="span"
					variant="contained"
					disabled={loading}
				>
					{"New FAQ"}
				</Button>
				<SearchBar
					disabled={selectionIds.length > 0 ? true : false}
					onSearch={() => onFAQsSearch()}
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
				<FAQsTable
					rows={FAQsRowData}
					columns={FAQsColumnData}
					tableColumnExtensions={FAQsColumnExtensionsData}
					dataProviders={dataProviders}
					selectionIds={selectionIds}
					setSelectionIds={setSelectionIds}
				/>
			)}

			{/* Add Edit FAQ */}
			<AddEditFAQ
				open={addFAQModal}
				close={onClose}
				categories={categories}
				addFAQsData={addFAQsData}
				setAddFAQsData={setAddFAQsData}
				setAnsImage={setAnsImage}
				loading={modalLoading}
				imageError={imageError}
				setImageError={setImageError}
				addFAQModalSaveBtnCheck={addFAQModalSaveBtnCheck}
				fromEditFAQ={fromEditFAQ}
				editFAQsData={editFAQsData}
				setEditFAQsData={setEditFAQsData}
				onSavePress={onSavePress}
			/>

			{/* Delete FAQ */}
			<DeleteFAQ
				open={deleteFAQModal}
				close={() => {
					setDeleteFAQModal(false);
					setDeleteFAQError("");
				}}
				editFAQsData={editFAQsData}
				loading={modalLoading}
				deleteFAQ={deleteFAQ}
				deleteFAQError={deleteFAQError}
			/>
		</div>
	);
};

export default FAQsUI;
