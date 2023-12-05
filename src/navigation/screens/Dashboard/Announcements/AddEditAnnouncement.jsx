// Library Imports
import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";

// Local Imports
import CheckBox from "../../../../components/checkBox";
import Button from "../../../../components/button.js";
import TextField from "../../../../components/inputField.js";
import { Styles } from "../../../../utils/style/GlobalStyles.js";
import CustomModal from "../../../../components/Modal/Modal.jsx";
import { white } from "../../../../utils/style/GlobalVariables.js";
import SelectDropdown from "../../../../components/selectDropdown.js";
import RichTextInput from "../../../../components/RichTextInput";
import { toUpperCase } from "../../../../utils/validations/localValidations";
import MultiSelectDropdown from "../../../../components/multiSelectDropdown";

const Input = styled("input")({
	display: "none",
});

const AddEditAnnouncement = ({
	open,
	close,
	addAnnouncementData,
	setAddAnnouncementData,
	fromEdit,
	campuses,
	group,
	onChangeMultiSelect,
	onChangeAllMultiselect,
	repeat,
	loading,
	modalSaveBtnCheck,
	onSavePress,
	campusSelectAll,
	setCampusSelectAll,
	groupSelectAll,
	setGroupSelectAll,
}) => {
	const currentDate = new Date().toISOString().split("T")[0];

	return (
		<CustomModal
			open={open}
			close={close}
			title={fromEdit ? "Edit Announcement" : "New Announcement"}
			width={600}>
			<div className="h-[470px] mt-[10px] pb-1 pl-1 pr-2 overflow-y-scroll">
				{/* title Input */}
				<div className="w-full">
					<TextField
						value={toUpperCase(addAnnouncementData?.title)}
						onChange={(e) => {
							setAddAnnouncementData({
								...addAnnouncementData,
								title: e.target.value,
							});
						}}
						label={"Title"}
						type="text"
						name="title"
					/>
				</div>

				{/* body Input */}
				<div>
					<p style={Styles.smallTextWhite} className="mb-1 mt-[20px]">
						Body
					</p>
					<div className="w-full h-40 overflow-y-scroll bg-[#1B1B23] rounded-lg">
						{/* Input Field / Text Editor */}
						<RichTextInput
							value={addAnnouncementData?.body}
							setValue={(value) => {
								setAddAnnouncementData({
									...addAnnouncementData,
									body: value,
								});
							}}
						/>
					</div>
				</div>

				{/* Campus */}
				<div className="w-full mt-[20px]">
					<div style={Styles.smallTextWhite} className="mb-1">
						Campus
					</div>
					<MultiSelectDropdown
						selectAll={campusSelectAll}
						setSelectAll={setCampusSelectAll}
						className={"mt-0"}
						width={533}
						list={campuses}
						value={addAnnouncementData?.campus}
						placeholder={"Select"}
						onClick={(value) => onChangeMultiSelect("campus", value)}
						onClickSelectAll={(select) =>
							onChangeAllMultiselect("campus", select, campuses)
						}
					/>
				</div>

				{/* Group */}
				<div className="w-full mt-[20px]">
					<div style={Styles.smallTextWhite} className="mb-1">
						Group
					</div>
					<MultiSelectDropdown
						selectAll={groupSelectAll}
						setSelectAll={setGroupSelectAll}
						className={"mt-0"}
						width={533}
						list={group}
						value={addAnnouncementData?.group}
						placeholder={"Select"}
						onClick={(value) => onChangeMultiSelect("group", value)}
						onClickSelectAll={(select) =>
							onChangeAllMultiselect("group", select, group)
						}
					/>
				</div>

				{/* Auto Repeat */}
				<div className="w-full mt-[20px]">
					<div style={Styles.smallTextWhite} className="cursor-pointer mb-1">
						Auto Repeat
					</div>
					<SelectDropdown
						className={"mt-0"}
						width={533}
						list={repeat}
						value={toUpperCase(addAnnouncementData?.repeat)}
						placeholder={"Select"}
						onClick={(value) => {
							setAddAnnouncementData({
								...addAnnouncementData,
								repeat: value?.name,
							});
						}}
					/>
				</div>

				{/* Start Date and End Date Row */}
				<div className="flex items-start justify-start gap-5">
					<div className="item w-1/2">
						<TextField
							label={"Start Date"}
							type="date"
							name="startDate"
							min={currentDate}
							value={addAnnouncementData?.startDate}
							onChange={(e) => {
								setAddAnnouncementData({
									...addAnnouncementData,
									startDate: e.target.value,
								});
							}}
						/>
					</div>

					<div className="item w-1/2">
						<TextField
							label={"End Date"}
							type="date"
							name="endDate"
							min={
								addAnnouncementData?.startDate !== ""
									? addAnnouncementData?.startDate
									: currentDate
							}
							value={addAnnouncementData?.endDate}
							onChange={(e) => {
								setAddAnnouncementData({
									...addAnnouncementData,
									endDate: e.target.value,
								});
							}}
						/>
					</div>
				</div>
			</div>

			{/* Buttons */}
			<div className="flex items-center justify-end gap-5 mt-5">
				<div onClick={close} className="text-white text-sm cursor-pointer">
					<p style={Styles.cancelBtn}>Cancel</p>
				</div>
				<Button
					className={`!px-5 text-sm !normal-case`}
					style={
						loading || modalSaveBtnCheck()
							? Styles?.disableBtn
							: Styles.activeBtn
					}
					onClick={() => onSavePress()}
					loading={loading}
					disabled={loading || modalSaveBtnCheck()}>
					{!loading && (
						<p
							style={
								loading || modalSaveBtnCheck()
									? Styles?.disableBtnText
									: Styles.activeBtnText
							}>
							Announce
						</p>
					)}
				</Button>
			</div>
		</CustomModal>
	);
};

export default AddEditAnnouncement;
