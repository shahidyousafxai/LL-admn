// Library Imports
import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";

// Local Imports
import CheckBox from "../../../../../components/checkBox";
import Button from "../../../../../components/button.js";
import TextField from "../../../../../components/inputField.js";
import { Styles } from "../../../../../utils/style/GlobalStyles.js";
import CustomModal from "../../../../../components/Modal/Modal.jsx";
import { white } from "../../../../../utils/style/GlobalVariables.js";
import SelectDropdown from "../../../../../components/selectDropdown.js";
import RichTextInput from "../../../../../components/RichTextInput";

const Input = styled("input")({
	display: "none",
});

const AddEditFAQ = ({
	open,
	close,
	categories,
	addFAQsData,
	setAddFAQsData,
	setAnsImage,
	loading,
	imageError,
	setImageError,
	addFAQModalSaveBtnCheck,
	fromEditFAQ,
	editFAQsData,
	setEditFAQsData,
	onSavePress,
}) => {
	// To Hide Image Size Error Msg
	React.useEffect(() => {
		// if (imageError !== "") {
		setTimeout(() => {
			setImageError("");
		}, 3000);
		// }
	}, [imageError !== ""]);
	// To Conert image in base64
	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	// To Remove Img tag from HTML
	const removeHTMLTag = (answer) => {
		var html = document.createElement("div");
		html.innerHTML = answer;
		const findTags = html.getElementsByTagName("p");
		const tagsArr = [...findTags];
		const index = tagsArr
			?.map((item, index) => {
				if (item?.innerHTML?.includes("img")) return index;
				else return;
			})
			.filter((item) => item !== undefined);
		html.removeChild(findTags[index[0]]);
		return html.innerHTML;
	};
	// To Capture User Selected Image Response
	const handleImgChange = async (event) => {
		if (event.target.files[0].size > 2e6) {
			setImageError("The image must not be greater than 2MB.");
		} else {
			const img = await toBase64(event.target.files[0]);
			let answer = addFAQsData?.answer;
			if (answer?.includes("<img")) {
				answer = removeHTMLTag(answer);
				answer += `<img src=${img} />`;
			} else {
				answer += `<img src=${img} />`;
			}
			// Setting States
			setAddFAQsData({
				...addFAQsData,
				answer: answer,
			});
			setAnsImage(event.target.files[0]);
		}
	};
	// To Run OnChange Handler Again To Select Same Image
	const onInputClick = (event) => {
		event.target.value = "";
		setImageError("");
	};

	// Sent answer to parent
	const sentAnswer = () => {
		if (addFAQsData?.answer?.includes("<img") && !addFAQsData?.answer?.includes("https://drive.google.com")) {
			const obj = {
				hasImage: true,
				answer: removeHTMLTag(addFAQsData?.answer),
			};
			return obj;
		} else {
			setAnsImage("");
			const obj = {
				hasImage: false,
				answer: addFAQsData?.answer,
			};
			return obj;
		}
	};

	return (
		<CustomModal
			open={open}
			close={close}
			title={fromEditFAQ ? "Edit FAQ" : "New FAQ"}
			width={600}
		>
			{/* Categories */}
			<div className="w-full mt-[20px]">
				<div style={Styles.smallTextWhite} className="cursor-pointer mb-1">
					Categories
				</div>
				<SelectDropdown
					className={"mt-0"}
					width={545}
					list={categories}
					value={addFAQsData?.categoryName}
					placeholder={"Select"}
					onClick={(value) => {
						setAddFAQsData({
							...addFAQsData,
							categoryID: value?.id,
							categoryName: value?.name,
						});
						// setIsEmptyToInit();
					}}
				/>
			</div>

			{/* Question Input */}
			<div className="w-full mt-[20px]">
				<TextField
					height={"h-24"}
					value={addFAQsData?.question}
					onChange={(e) => {
						setAddFAQsData({
							...addFAQsData,
							question: e.target.value,
						});
					}}
					label={"Question"}
					type="text"
					textArea
					name="question"
				/>
			</div>

			{/* Answer Input */}
			<div className="w-full mt-[20px] h-40 bg-[#1B1B23] rounded-lg overflow-y-scroll">
				{/* Image Button */}
				<label htmlFor="icon-button-file">
					<ImageIcon
						htmlFor="icon-button-file"
						className={`${
							imageError === "" ? "mt-[1.1rem]" : "mt-[1.1rem]"
						} fixed z-10 ml-[8.3rem]`}
						fontSize="small"
						color="secondary"
					/>
					<div className="fixed z-10 mt-[1.1rem] ml-[8.3rem] !w-5 !h-5 overflow-hidden cursor-pointer">
						<Input
							accept=".png, .jpg"
							id="icon-button-file"
							type="file"
							onChange={handleImgChange}
							onClick={onInputClick}
						/>
					</div>
				</label>

				{/* Error Message */}
				<div className="fixed z-10 mt-[1rem] ml-52" style={Styles.errorText}>
					{imageError}
				</div>

				{/* Input Field / Text Editor */}
				<div className="relative z-0">
					<RichTextInput
						value={addFAQsData?.answer}
						setValue={(value) => {
							if (
								editFAQsData?.completeItem?.image_name !== null &&
								!value?.includes("<img") && editFAQsData
							) {
								let data = editFAQsData?.completeItem;
								data.image_removed = true;
								setEditFAQsData({
									...editFAQsData,
									completeItem: data,
								});
							} else if (editFAQsData) {
								let data = editFAQsData?.completeItem;
								data.image_removed = false;
								setEditFAQsData({
									...editFAQsData,
									completeItem: data,
								});
							}
							setAddFAQsData({
								...addFAQsData,
								answer: value,
							});
						}}
					/>
				</div>
			</div>

			{/* Status */}
			<div className="w-1/2 pl-1 mt-[20px]">
				<div style={Styles.smallTextWhite} className="w-1/2 -mb-1">
					Status
				</div>
				<div className="flex items-center justify-start ">
					<CheckBox
						color={white}
						checked={addFAQsData?.status}
						onChange={() => {
							setAddFAQsData({
								...addFAQsData,
								status: !addFAQsData?.status,
							});
							// setIsEmptyToInit();
						}}
						label="Active"
					/>
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
						loading || addFAQModalSaveBtnCheck()
							? Styles?.disableBtn
							: Styles.activeBtn
					}
					onClick={() => onSavePress(sentAnswer())}
					loading={loading}
					disabled={loading || addFAQModalSaveBtnCheck()}
				>
					{!loading && (
						<p
							style={
								loading || addFAQModalSaveBtnCheck()
									? Styles?.disableBtnText
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

export default AddEditFAQ;
