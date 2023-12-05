import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { phone as phonevalidator } from "phone";

import Button from "../../../../../../components/button";
import {
	gray,
	lightGray,
	primaryColor,
	secondaryColor,
	yellow,
} from "../../../../../../utils/style/GlobalVariables";
import { Styles } from "../../../../../../utils/style/GlobalStyles";

import Details from "./EditCampusComponents/Details";
import SystemSettings from "./EditCampusComponents/SystemSettings";
import Amenities from "./EditCampusComponents/Amenitites";

// Stepper Headings
const steps = ["Details", "System Settings", "Amenities"];

const EditCampusUI = ({
	close,
	newCampus,
	setnewCampus,
	onChange,
	onSave,
	loading,
	error,
}) => {
	// Too nav Back
	useEffect(() => {
		if (error.name === "name" && error?.msg) {
			setActiveStep(1);
		}
	}, [error]);

	// To Check Active Step Number
	const [activeStep, setActiveStep] = useState(0);
	const [phoneError, setPhoneError] = useState("");

	const totalSteps = () => {
		return steps.length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const handleNext = () => {
		let isPhoneValid = phonevalidator(newCampus?.phone).isValid;
		setPhoneError("")
			if (!isPhoneValid) {
				setPhoneError("Please Enter Valid Phone Number")
				return
			}
		if (activeStep === 1) {
			console.log(
				"🚀 ~ file: EditCampusUI.jsx ~ line 93 ~ activeStep",
				activeStep
			);
		}
		if (isLastStep()) {
			return onSave();
		}

		const newActiveStep = !isLastStep() && activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	const getStepsUi = () => {
		if (activeStep === 0) {
			return (
				<div className="mt-5 mx-6">
					<Details
						error={error}
						newCampus={newCampus}
						setnewCampus={setnewCampus}
						onChange={onChange}
						phoneError={phoneError}
					/>
				</div>
			);
		} else if (activeStep === 1) {
			return (
				<div className="mt-5 mx-6 flex justify-center items-center py-5">
					<SystemSettings />
				</div>
			);
		} else if (activeStep === 2) {
			return (
				<div className="mt-5 mx-6">
					<Amenities newCampus={newCampus} setnewCampus={setnewCampus} />
				</div>
			);
		}

		return;
	};

	// disabble Save Button
	const disableSaveBtn = () => {
		// if (
		// 	activeStep === 0 &&
		// 	(newCampus.zone === "" ||
		// 		newCampus?.name === "" ||
		// 		newCampus?.street === "" ||
		// 		newCampus?.postalCode === "" ||
		// 		newCampus?.postalCode?.replaceAll("0", "")?.replaceAll(".", "") === "" ||
		// 		newCampus?.numOfUnits === "" ||
		// 		newCampus?.numOfUnits?.replaceAll("0", "")?.replaceAll(".", "") === "" ||
		// 		newCampus?.longitude === "" ||
		// 		newCampus?.longitude?.replaceAll("0", "")?.replaceAll(".", "") === "" ||
		// 		newCampus?.latitude === "" ||
		// 		newCampus?.latitude?.replaceAll("0", "")?.replaceAll(".", "") === "" ||
		// 		newCampus?.maintenanceFee === "" ||
		// 		newCampus?.maintenanceFee
		// 			?.replaceAll("$ ", "")
		// 			?.replaceAll("0", "")
		// 			?.replaceAll(".", "") === "")
		// ) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	};

	return (
		<Box className="w-full">
			{/* Top Step Heading Row */}
			<div
				style={{ backgroundColor: secondaryColor }}
				className="pt-2 px-7 h-10"
			>
				<Stepper
					activeStep={activeStep}
					sx={{
						"& .MuiStepIcon-text": {
							display: "none",
						},
						"& .css-mzev79-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
							width: 18,
							height: 18,
							borderWidth: 1,
							borderRadius: 8,
							borderColor: yellow,
							backgroundColor: secondaryColor,
						},
						"& .css-umtzad.Mui-active": {
							width: 18,
							height: 18,
							borderWidth: 1,
							borderRadius: 8,
							borderColor: yellow,
							backgroundColor: secondaryColor,
						},
						"& .css-mzev79-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
							color: yellow,
							border: "none",
						},
						"& .css-umtzad.Mui-completed": {
							color: yellow,
							border: "none",
						},
						"& .css-mzev79-MuiSvgIcon-root-MuiStepIcon-root": {
							width: 18,
							height: 18,
							borderWidth: 1,
							borderRadius: 8,
							borderColor: lightGray,
							backgroundColor: secondaryColor,
						},
						"& .css-umtzad-MuiSvgIcon-root-MuiStepIcon-root": {
							width: 18,
							height: 18,
							borderWidth: 1,
							borderRadius: 8,
							borderColor: lightGray,
							backgroundColor: secondaryColor,
						},
						"& .MuiStepConnector-line": {
							borderStyle: "dashed",
							borderTopWidth: 2,
						},
					}}
				>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepButton color="inherit" onClick={handleStep(index)}>
								<p style={Styles.smallTextWhite}>{label}</p>
							</StepButton>
						</Step>
					))}
				</Stepper>
			</div>

			{/* Body */}
			<div>
				<React.Fragment>
					{/* Body View */}
					<div className="container-fluid">{getStepsUi(<></>)}</div>

					{/* Buttons Row Bottom */}
					<Box className="p-5 flex flex-row justify-between">
						{/* Previous Button */}
						<div>
							{activeStep > 0 && (
								<Button
									style={{
										borderColor: yellow,
										color: yellow,
										fontFamily: "Inter-Medium",
										fontSize: 13,
										textTransform: "none",
										width: "100px",
										borderRadius: 8,
									}}
									component="span"
									variant="outlined"
									disabled={loading}
									onClick={handleBack}
								>
									Previous
								</Button>
							)}
						</div>

						{/* Cancel & Next Button */}
						<div className="flex items-center">
							<p
								onClick={() => {
									!loading && close();
								}}
								style={Styles.cancelBtn}
							>
								Cancel
							</p>
							<Button
								style={{
									backgroundColor: disableSaveBtn()
										? secondaryColor
										: loading
										? secondaryColor
										: yellow,
									color: disableSaveBtn()
										? gray
										: loading
										? gray
										: primaryColor,
									fontFamily: "Inter-Medium",
									fontSize: 13,
									textTransform: "none",
									width: "100px",
									borderRadius: 8,
									marginLeft: 15,
									padding: loading && 18,
								}}
								onClick={handleNext}
								component="span"
								variant="contained"
								loading={loading}
								disabled={disableSaveBtn() || loading}
							>
								{!loading && <>{isLastStep() ? "Save" : "Continue"}</>}
							</Button>
						</div>
					</Box>
				</React.Fragment>
			</div>
		</Box>
	);
};

export default EditCampusUI;
