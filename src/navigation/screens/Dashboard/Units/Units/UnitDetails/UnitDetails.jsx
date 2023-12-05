// Library Imports
import React, { useState, useEffect } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";

// Local Imports
import Button from "../../../../../../components/button.js";
import CustomModal from "../../../../../../components/Modal/Modal.jsx";
import {
	secondaryColor,
	white,
} from "../../../../../../utils/style/GlobalVariables.js";
import { Styles } from "../../../../../../utils/style/GlobalStyles.js";
import { InsideSpinner } from "../../../../../../components/Spinner/Spinner.jsx";
import ApiController from "../../../../../../utils/network/api";

const UnitDetails = ({ open, close, onClickEdit, data, loading }) => {
	const [campusLoading, setCampusLoading] = useState(false);
	const [unitLoading, setUnitLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const openCampusGate = () => {
		setCampusLoading(true);
		const payload = {
			unitId: data?.rawData?.id,
			statusCode: "campus-open",
		};
		ApiController.openCampus(payload, (response) => {
			if (response.success) {
				setCampusLoading(false);
				setSuccessMsg("Campus gate opened.");
			} else {
				setErrorMsg(response?.data[0]?.UNIT);
				setCampusLoading(false);
			}
		});
	};
	const openUnitGate = () => {
		setUnitLoading(true);
		const payload = {
			unitId: data?.rawData?.id,
			statusCode: isOpen ? "door-close" : "door-open",
		};
		ApiController.openCloseUnit(payload, (response) => {
			if (response.success) {
				setUnitLoading(false);
				setIsOpen(!isOpen);
				setSuccessMsg(isOpen ? "Unit door closed." : "Unit door opened.");
			} else {
				setIsOpen(isOpen);
				setUnitLoading(false);
				setErrorMsg(response?.data[0]?.UNIT);
			}
		});
	};

	useEffect(() => {
		setTimeout(() => {
			setSuccessMsg("");
			setErrorMsg("");
		}, 2000);
	}, [successMsg, errorMsg]);

	return (
		<CustomModal
			open={open}
			close={() => {
				close();
			}}
			title={`Unit ${data?.unitNumber}`}
			width={620}
		>
			{loading ? (
				<InsideSpinner />
			) : (
				<div className="h-[29.8rem] overflow-y-scroll">
					{/* Details Section */}
					<>
						<div className="pt-2">
							<p style={Styles.headingTextWhite}>Unit Information</p>
						</div>
						{/* Cammpus & Length */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Campus</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>{data?.campus}</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Length</p>
							</div>
							<div className="item w-3/12 pl-6 break-words">
								<p style={Styles.normalLeftTextWhite}>{data?.length}</p>
							</div>
						</div>
						{/* Unit & Width */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Unit</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>{data?.unitNumber}</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Width</p>
							</div>
							<div className="item w-3/12 pl-6 break-words">
								<p style={Styles.normalLeftTextWhite}>{data?.width}</p>
							</div>
						</div>
						{/* Owner & Device-Serial */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Owner</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>{data?.owner}</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Device Serial Number</p>
							</div>
							<div className="item w-3/12 pl-6 break-words">
								<p style={Styles.normalLeftTextWhite}>
									{data?.deviceSerialNumber}
								</p>
							</div>
						</div>
						{/* Access-Digital & Maintenance */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Access Digital Output</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>
									{data?.accessDigitalOutput}
								</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Maintenance Fee</p>
							</div>
							<div className="item w-3/12 pl-6 break-words">
								<p style={Styles.normalLeftTextWhite}>
									${data?.maintenanceFee}
								</p>
							</div>
						</div>
						{/* Access-Port */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Access Port</p>
							</div>
							<div className="item w-3/12 pl-6 break-words">
								<p style={Styles.normalLeftTextWhite}>{data?.accessPort}</p>
							</div>
						</div>
					</>

					<hr style={Styles.hrBreak} />

					{/* Documents Section */}
					<>
						<div className="flex justify-between">
							<p style={Styles.headingTextWhite}>Documents</p>
						</div>
						{/* Map Documents */}
						{data?.insuranceDocument || data?.leaseDocument ? (
							<div className="h-max-24">
								{/* Insurance Doc */}
								{data?.insuranceDocument && (
									<div
										className="flex items-center"
										style={{
											backgroundColor: secondaryColor,
											height: 44,
											marginTop: 5,
											paddingLeft: 12,
											borderTopRightRadius: 8,
											borderTopLeftRadius: 8,
										}}
									>
										<InsertDriveFileIcon fontSize="small" color="success" />
										<p
											className="ml-5 w-[250px]"
											style={Styles.normalTextWhite}
										>
											{data?.insuranceDocument?.name}
										</p>
										<p className="w-52" style={Styles.normalTextGray}>
											{data?.insuranceDocument?.type}
										</p>

										<div
											onClick={() =>
												window.open(data?.insuranceDocument?.viewUrl)
											}
										>
											<VisibilityIcon
												className="mr-3 cursor-pointer"
												fontSize="small"
												color="secondary"
											/>
										</div>
										<div
											onClick={() =>
												window.open(
													data?.insuranceDocument?.downloadUrl,
													"_self"
												)
											}
										>
											<GetAppIcon
												className="mr-3 cursor-pointer"
												fontSize="small"
												color="secondary"
											/>
										</div>
									</div>
								)}
								{/* Lease Agreement Doc */}
								{data?.leaseDocument && (
									<div
										className="flex items-center"
										style={{
											backgroundColor: secondaryColor,
											height: 44,
											marginTop: 5,
											paddingLeft: 12,
											borderTopRightRadius: 8,
											borderTopLeftRadius: 8,
										}}
									>
										<InsertDriveFileIcon fontSize="small" color="success" />
										<p
											className="ml-5 w-[250px]"
											style={Styles.normalTextWhite}
										>
											{data?.leaseDocument?.name}
										</p>
										<p className="w-52" style={Styles.normalTextGray}>
											{data?.leaseDocument?.type}
										</p>

										<div
											onClick={() => window.open(data?.leaseDocument?.viewUrl)}
										>
											<VisibilityIcon
												className="mr-3 cursor-pointer"
												fontSize="small"
												color="secondary"
											/>
										</div>
										<div
											onClick={() =>
												window.open(data?.leaseDocument?.downloadUrl, "_self")
											}
										>
											<GetAppIcon
												className="mr-3 cursor-pointer"
												fontSize="small"
												color="secondary"
											/>
										</div>
									</div>
								)}
							</div>
						) : (
							// Empty Placeholder
							<div className="flex flex-col items-center">
								<DescriptionIcon fontSize="large" color="success" />
								<p
									className="mt-2"
									style={{
										color: white,
										fontFamily: "Inter-Regular",
										fontSize: 13,
									}}
								>
									No documents added yet.
								</p>
							</div>
						)}
					</>

					<hr style={Styles.hrBreak} />

					{/* Management Section */}
					<>
						<div className="pt-2">
							<p style={Styles.headingTextWhite}>Management</p>
						</div>
						{/* Cammpus & Unit Buttons */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Campus Gate</p>
							</div>
							<div className="item w-3/12 pl-6">
								<Button
									className={`!px-5 text-sm !normal-case !h-6 w-24`}
									style={Styles.activeBtn}
									loading={campusLoading}
									onClick={() => openCampusGate()}
								>
									{!campusLoading ? (
										<p style={Styles.activeBtnText}>Open</p>
									) : (
										""
									)}
								</Button>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Unit Access</p>
							</div>
							<div className="item w-3/12 pl-6">
								<Button
									className={`!px-5 text-sm !normal-case !h-6 w-24`}
									style={Styles.activeBtn}
									loading={unitLoading}
									onClick={() => openUnitGate()}
								>
									{!unitLoading ? (
										<p style={Styles.activeBtnText}>
											{isOpen ? "Close" : "Open"}
										</p>
									) : (
										""
									)}
								</Button>
							</div>
						</div>
						{successMsg !== "" ? (
							<div className="item w-full flex flex-row justify-end pt-2 pr-5">
								<p className="!text-green-600" style={Styles.activeBtnText}>
									{successMsg}
								</p>
							</div>
						) : (
							""
						)}
						{errorMsg !== "" ? (
							<div className="item w-full flex flex-row justify-end pt-2 pr-5">
								<p className="!text-red-600" style={Styles.activeBtnText}>
									{errorMsg}
								</p>
							</div>
						) : (
							""
						)}
					</>

					<hr style={Styles.hrBreak} />

					{/* Buy Info Section */}
					<>
						<div className="pt-2">
							<p style={Styles.headingTextWhite}>Buy Information</p>
						</div>
						{/* Available For Sale & Price */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Available for Sale</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>
									{data?.availableForSale ? "Active" : "Inactive"}
								</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Buy Price</p>
							</div>
							<div className="item w-3/12 pl-8 break-words">
								<p style={Styles.normalLeftTextWhite}>${data?.buyPrice}</p>
							</div>
						</div>
					</>

					<hr style={Styles.hrBreak} />

					{/* Lease Info Section */}
					<>
						<div className="pt-2">
							<p style={Styles.headingTextWhite}>Lease Information</p>
						</div>
						{/* Available for Lease & Price */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Available for Lease</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>
									{data?.availableForLease ? "Active" : "Inactive"}
								</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Lease Price</p>
							</div>
							<div className="item w-3/12 pl-8 break-words">
								<p style={Styles.normalLeftTextWhite}>${data?.leasePrice}</p>
							</div>
						</div>
						{/* Insurance Type & Policy Start */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Insurance Type</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>{data?.insuranceType}</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Policy Start Date</p>
							</div>
							<div className="item w-3/12 pl-8 break-words">
								<p style={Styles.normalLeftTextWhite}>
									{data?.policyStartDate}
								</p>
							</div>
						</div>
						{/* Policy Number & Policy End */}
						<div className="flex items-center pt-1">
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Policy Number</p>
							</div>
							<div className="item w-3/12 pl-6">
								<p style={Styles.normalLeftTextWhite}>{data?.policyNumber}</p>
							</div>
							<div className="item w-3/12">
								<p style={Styles.normalTextGray}>Policy End Date</p>
							</div>
							<div className="item w-3/12 pl-8 break-words">
								<p style={Styles.normalLeftTextWhite}>{data?.policyEndDate}</p>
							</div>
						</div>
					</>

					<hr style={Styles.hrBreak} />
				</div>
			)}

			<div className="flex items-center justify-between gap-5">
				<div
					className="flex flex-row cursor-pointer"
					onClick={() => onClickEdit(data)}
				>
					<EditIcon fontSize="small" color="secondary" className="mr-2 " />
					<p style={Styles.disableBtnText}>Edit</p>
				</div>
				<Button
					className={`!px-5 text-sm !normal-case`}
					style={Styles.activeBtn}
					onClick={() => {
						close();
					}}
				>
					{" "}
					<p style={Styles.activeBtnText}>Close</p>
				</Button>
			</div>
		</CustomModal>
	);
};

export default UnitDetails;
