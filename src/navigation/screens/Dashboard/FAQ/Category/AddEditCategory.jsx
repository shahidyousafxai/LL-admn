// Library Imports
import React from "react";

// Local Imports
import Button from "../../../../../components/button.js";
import TextField from "../../../../../components/inputField.js";
import CustomModal from "../../../../../components/Modal/Modal.jsx";
import { Styles } from "../../../../../utils/style/GlobalStyles.js";

const AddEditCategory = ({
	open,
	close,
	category,
	setCategory,
	addCategory,
	loading,
	categoryError,
	fromEditCategory,
  editCategoryData
}) => {
	return (
		<CustomModal
			open={open}
			close={close}
			title={fromEditCategory ? "Edit Category" : "New Category"}
			width={390}
		>
			{/* Input */}
			<div className="flex">
				<TextField
					value={category}
					onChange={setCategory}
					label={"Categories"}
					type="text"
					name="category"
					className={"w-full"}
					error={categoryError !== "" && categoryError}
				/>
			</div>
			{/* Buttons */}
			<div className="flex items-center justify-end gap-5 mt-5">
				<div onClick={close} className="text-white text-sm cursor-pointer">
					<p style={Styles.cancelBtn}>Cancel</p>
				</div>
				<Button
					className={`!px-5 text-sm !normal-case`}
					style={
						category.trim() === "" || (fromEditCategory && category.trim() === editCategoryData?.category)
							? Styles.disableBtn
							: Styles.activeBtn
					}
					onClick={addCategory}
					loading={loading}
					disabled={
						category.trim() === "" || loading || (fromEditCategory && category.trim() === editCategoryData?.category)
							? true
							: false
					}
				>
					{!loading && (
						<p
							style={
								category.trim() === "" || (fromEditCategory && category.trim() === editCategoryData?.category)
									? Styles.disableBtnText
									: Styles.activeBtnText
							}
						>
							Save
						</p>
					)}
				</Button>
			</div>
		</CustomModal>
	);
};

export default AddEditCategory;
