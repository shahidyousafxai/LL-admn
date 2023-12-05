// Library Imports
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { phone as phonevalidator } from "phone";

// Local Imports
import DeleteCard from "./DeleteCard";
import Button from "../../../../components/button.js";
import CheckBox from "../../../../components/checkBox.js";
import TextField from "../../../../components/inputField.js";
import DisabledTextField from "../../../../components/disableInputField";
import CustomModal from "../../../../components/Modal/Modal.jsx";
import { editUserNav } from "../../../../components/Tables/dummyData.js";
import {
	secondaryColor,
	white,
} from "../../../../utils/style/GlobalVariables.js";
import { Styles } from "../../../../utils/style/GlobalStyles.js";
import SelectDropdown from "../../../../components/selectDropdown.js";
import AssetsImages from "../../../../assets/index.js";
import StripeServices from "../../../../utils/network/stripeServices.js";
import { InsideSpinner } from "../../../../components/Spinner/Spinner.jsx";
import ApiController from "../../../../utils/network/api.js";

const EditUser = ({
	open,
	close,
	data,
	setEditUserInfo,
	groupInitValue,
	groupStatus,
	setGroupStatus,
	groupsList,
	onChangeGroupList,
	dataLoading,
	recallUserDetails,
	reCallListing,
	setGroupList,
}) => {
	const [state, setState] = useState(1);
	const [saveLoading, setSaveLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	// User Details Input Method
	const onChange = (e) => {
		if (e.target.name === "fName" || e.target.name === "lName") {
			e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
			setEditUserInfo({
				...data,
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "phone") {
			e.target.value = e.target.value.replace(/[^\d+]/g, "");
			setEditUserInfo({
				...data,
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "driverLicense") {
			e.target.value = e.target.value.replace(/[^\da-zA-Z]/g, "");
			setEditUserInfo({
				...data,
				[e.target.name]: e.target.value,
			});
		} else {
			setEditUserInfo({
				...data,
				[e.target.name]: e.target.value,
			});
		}

		setError({
			name: "",
			msg: "",
		});
	};

	// Card States
	const [card, setCard] = useState({
		cardNum: "",
		cardExp: "",
		cardCVC: "",
		cardHolderName: "",
	});
	const [error, setError] = useState({
		name: "",
		msg: "",
	});

	// Card Methods
	const cardOnCancel = () => {
		setSaveLoading(false);
		setError({ name: "", msg: "" });
		setCard({ cardNum: "", cardExp: "", cardCVC: "", cardHolderName: "" });
	};
	const cardOnChange = (e) => {
		if (e.target.name === "cardNum" && e.target.value.length <= 19) {
			//  Adding Space After Every 4 Digits
			e.target.value = e.target.value
				.replace(/[^\d]/g, "")
				.replace(/(.{4})/g, "$1 ")
				.trim();
			setCard({
				...card,
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "cardExp" && e.target.value.length <= 7) {
			// Adding "/" after 2 digits
			e.target.value = e.target.value
				.replace(/[^\d]/g, "")
				.replace(/(.{2})/g, "$1 / ")
				.trim()
				.replace(/\/$/, "")
				.trim();
			setCard({
				...card,
				[e.target.name]: e.target.value,
			});
		} else if (e.target.name === "cardCVC" && e.target.value.length <= 3) {
			// Only accept Numbers
			e.target.value = e.target.value.replace(/[^\d]/g, "");
			setCard({
				...card,
				[e.target.name]: e.target.value,
			});
		} else if (
			e.target.name === "cardHolderName" &&
			e.target.value.length <= 25
		) {
			// Only Accept Characters and Space
			e.target.value = e.target.value.replace(/[^a-z A-Z]/g, "");
			setCard({
				...card,
				[e.target.name]: e.target.value,
			});
		}

		setError({
			name: "",
			msg: "",
		});
	};
	const isCardFieldsEmpty = () => {
		if (card.cardNum === "" || card.cardNum.trim().length === 0) {
			setError({
				name: "cardNum",
				msg: "Card number is required",
			});
			return true;
		} else if (card.cardExp === "" || card.cardExp.trim().length === 0) {
			setError({
				name: "cardExp",
				msg: "Card expiry date is required",
			});
			return true;
		} else if (card.cardCVC === "" || card.cardCVC.trim().length === 0) {
			setError({
				name: "cardCVC",
				msg: "Security code is required",
			});
			return true;
		} else if (
			card.cardHolderName === "" ||
			card.cardHolderName.trim().length === 0
		) {
			setError({
				name: "cardHolderName",
				msg: "Card holder name is required",
			});
			return true;
		} else {
			return false;
		}
	};
	const isUserFieldsEmpty = (permissionGroup) => {
		let isPhoneValid = phonevalidator(data.phone).isValid;
		console.log("🚀 ~ file: EditUser.jsx:178 ~ isPhoneValid:", isPhoneValid);

		if (
			data.fName === "" ||
			data.fName === null ||
			data.fName?.trim().length === 0
		) {
			setError({
				name: "fName",
				msg: "First Name is required",
			});
			return true;
		} else if (
			data.lName === "" ||
			data.lName === null ||
			data.lName?.trim().length === 0
		) {
			setError({
				name: "lName",
				msg: "Last Name is required",
			});
			return true;
		} else if (
			data.phone === "" ||
			data.phone === null ||
			data.phone?.trim().length === 0
		) {
			setError({
				name: "phone",
				msg: "Phone is required",
			});
			return true;
		} else if (!isPhoneValid) {
			setError({
				name: "phone",
				msg: "Please enter a valid phone number",
			});
			return true;
		} else if (
			data.driverLicense === "" ||
			data.driverLicense === null ||
			data.driverLicense === undefined ||
			data.driverLicense?.trim().length === 0
		) {
			setError({
				name: "driverLicense",
				msg: "Driver License Number is required",
			});
			return true;
		} else if (data.driverLicense?.replaceAll("0", "")?.trim()?.length === 0) {
			setError({
				name: "driverLicense",
				msg: "Please enter a valid driver license number",
			});
			return true;
		} else if (
			card.password === "" ||
			data.password === null ||
			card.password?.trim().length === 0
		) {
			setError({
				name: "password",
				msg: "Password is required",
			});
			return true;
		} else if (!permissionGroup || permissionGroup.length === 0) {
			setError({
				name: "userGroup",
				msg: "User must have a Group",
			});
			return true;
		} else {
			return false;
		}
	};
	const addNewCard = (callback) => {
		// Validating fieldds before sending for Payload
		const cardNum = card.cardNum.replace(/ /g, "");
		const cardExpiry = card.cardExp?.split("/");
		const cardInfo = {
			cardNum: cardNum,
			cardExpMonth: cardExpiry[0]?.trim(),
			cardExpYear: cardExpiry[1]?.trim(),
			cardCVC: card.cardCVC,
			cardHolderName: card.cardHolderName.trim(),
		};

		if (!isCardFieldsEmpty()) {
			StripeServices.addCardOnStripe(cardInfo, (response) => {
				const token = response?.data?.id;
				if (response.success) {
					if (data?.stripeCustomerId) {
						const cusData = {
							cardToken: response?.data?.id,
							cusId: data?.stripeCustomerId,
						};
						StripeServices.linkCardToCustomer(cusData, (response) => {
							if (response.success) {
								callback(response?.data);
							} else {
								console.log(
									"🚀 ~ file: EditUser.jsx ~ line 279 ~ response",
									response.data
								);
							}
						});
					} else {
						ApiController.createStripeCustomer(
							{ user_id: data?.id },
							(response) => {
								if (response.success) {
									const cusData = {
										cardToken: token,
										cusId: response?.data?.stripe_customer_id,
									};
									StripeServices.linkCardToCustomer(cusData, (response) => {
										if (response.success) {
											callback(response?.data);
										} else {
											console.log(
												"🚀 ~ file: EditUser.jsx ~ line 279 ~ response",
												response.data
											);
										}
									});
								} else {
									setSaveLoading(false);
								}
							}
						);
					}
				} else {
					setSaveLoading(false);
					setError({
						name: response.data.errorName.includes("number")
							? "cardNum"
							: response.data.errorName.includes("expiry")
							? "cardExp"
							: response.data.errorName.includes("cvc")
							? "cardCVC"
							: "",
						msg: response.data.message,
					});
				}
			});
		} else {
			callback(false);
		}
	};

	const onSavePress = () => {
		setSaveLoading(true);

		if (card.cardNum || card.cardExp || card.cardCVC || card.cardHolderName) {
			addNewCard((response) => {
				if (response) {
					// eslint-disable-next-line
					const userGroup = groupsList?.map((item) => {
						if (item.value) {
							return item.title.toLowerCase() !== undefined &&
								item.title.includes(" ")
								? item.title.toLowerCase().replace(" ", "_")
								: item.title.toLowerCase();
						}
					});
					const permissionGroup = userGroup.filter((element) => {
						return element !== undefined;
					});

					const payload = {
						userID: data?.id,
						data: {
							first_name: data?.fName,
							last_name: data?.lName,
							phone_no: data?.phone,
							...(!data?.password.includes("sha256") && {
								password: data?.password,
							}),
							driver_license_number: data?.driverLicense,
							user_permissions: permissionGroup,
							is_active: groupStatus,
							card_info: {
								card_id: response?.id,
								address_city: response?.address_city,
								address_country: response?.address_country,
								address_line1: response?.address_line1,
								address_line2: response?.address_line2,
								address_state: response?.address_state,
								address_zip: response?.address_zip,
								country: response?.country,
								funding: response?.funding,
								card_number: response?.last4,
								exp_month: response?.exp_month,
								exp_year: response?.exp_year,
								name: response?.name,
								brand: response?.brand,
								fingerprint: response?.fingerprint,
								is_default: data?.cards?.length === 0 ? true : false,
							},
						},
					};
					if (!isUserFieldsEmpty(permissionGroup)) {
						ApiController.editUserCall(payload, (response) => {
							if (response.success) {
								setState(1);
								close();
								setGroupList(groupInitValue);
								cardOnCancel();
								setErrorMsg("");
								setSaveLoading(false);
								reCallListing();
							} else {
								{
									response?.data[0]?.["INVALID PERMISSION COMBINED"] &&
										setErrorMsg(
											response?.data[0]?.["INVALID PERMISSION COMBINED"]
										);
								}
								setSaveLoading(false);
							}
						});
					} else {
						setSaveLoading(false);
					}
				} else {
					setSaveLoading(false);
				}
			});
		} else {
			// eslint-disable-next-line
			const userGroup = groupsList?.map((item) => {
				if (item.value) {
					return item.title.toLowerCase() !== undefined &&
						item.title.includes(" ")
						? item.title.toLowerCase().replace(" ", "_")
						: item.title.toLowerCase();
				}
			});
			const permissionGroup = userGroup.filter((element) => {
				return element !== undefined;
			});

			const payload = {
				userID: data?.id,
				data: {
					first_name: data?.fName,
					last_name: data?.lName,
					phone_no: data?.phone,
					...(!data?.password.includes("sha256") && {
						password: data?.password,
					}),
					driver_license_number: data?.driverLicense,
					user_permissions: permissionGroup,
					is_active: groupStatus,
				},
			};
			if (!isUserFieldsEmpty(permissionGroup)) {
				ApiController.editUserCall(payload, (response) => {
					if (response.success) {
						setState(1);
						close();
						setGroupList(groupInitValue);
						cardOnCancel();
						setErrorMsg("");
						setSaveLoading(false);
						reCallListing();
					} else {
						{
							response?.data[0]?.["INVALID PERMISSION COMBINED"] &&
								setErrorMsg(response?.data[0]?.["INVALID PERMISSION COMBINED"]);
						}
						setSaveLoading(false);
					}
				});
			} else {
				setSaveLoading(false);
			}
		}
	};

	return (
		<CustomModal
			open={open}
			close={() => {
				setState(1);
				cardOnCancel();
				setGroupList(groupInitValue);
				setErrorMsg("");
				close();
			}}
			title="Edit User"
			width={950}>
			<div className="flex gap-3">
				<div className="w-[25%]  h-full">
					<ul className="p-2 flex flex-col  gap-1 text-sm">
						{editUserNav.map((itm) => (
							<li
								key={itm.id}
								className={`
                    cursor-pointer flex items-center 
                    justify-start w-full p-2 !gap-0 rounded-md text-sm
                    ${state === itm.id && "bg-[#CDA950]"} group
                `}
								onClick={() => setState(itm.id)}>
								<div className="flex flex-col gap-0">
									<p
										style={{
											fontSize: 12,
											color: state === itm.id ? "black" : white,
										}}
										className={`m-0`}>
										{itm.title}
									</p>
									{((error.name === "userGroup" &&
										itm.id === 2 &&
										state !== 2) ||
										((error.name === "driverLicense" ||
											error.name === "phone") &&
											itm.id === 1 &&
											state !== 1)) && (
										<p style={Styles.errorText}> {error.msg} </p>
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
				<form className="w-[75%] h-full min-h-full">
					{dataLoading ? (
						<InsideSpinner />
					) : (
						<>
							{/* Tab View */}
							{state === 1 && (
								<GeneralInformation
									data={data}
									error={error}
									onChange={onChange}
								/>
							)}
							{state === 2 && (
								<GroupSettings
									groupStatus={groupStatus}
									setGroupStatus={setGroupStatus}
									data={data}
									groupsList={groupsList}
									onChangeGroupList={onChangeGroupList}
									setError={setError}
								/>
							)}
							{state === 3 && (
								<Payments
									data={data}
									recallUserDetails={recallUserDetails}
									card={card}
									setCard={setCard}
									error={error}
									setError={setError}
									cardOnChange={cardOnChange}
								/>
							)}

							{/* Button row */}
							<div className="flex items-center justify-end gap-5 mt-5">
								<div
									className="cursor-pointer"
									style={Styles.cancelBtn}
									onClick={() => {
										setState(1);
										cardOnCancel();
										setGroupList(groupInitValue);
										setErrorMsg("");
										close();
									}}>
									Cancel
								</div>
								<Button
									className={`!px-8 !normal-case w-24`}
									style={saveLoading ? Styles.disableBtn : Styles.activeBtn}
									disabled={saveLoading}
									onClick={() => onSavePress()}
									loading={saveLoading}>
									{!saveLoading && "Save"}
								</Button>
							</div>

							{/* Error message row */}
							<div className="flex flex-col items-end justify-center">
								{errorMsg !== "" && (
									<div className="mt-3" style={Styles.errorText}>
										{errorMsg} Like <br /> (Owner & Lessee, Additional User &
										Vendor, Admin & Staff).
									</div>
								)}
							</div>
						</>
					)}
				</form>
			</div>
		</CustomModal>
	);
};

const GeneralInformation = ({ data, error, onChange }) => {
	return (
		<div className="-mt-4">
			<div className="flex items-start justify-start gap-5">
				<TextField
					className="w-1/2"
					label={"First Name"}
					error={error.name === "fName" && error}
					type="text"
					name="fName"
					value={data.fName}
					onChange={onChange}
				/>
				<TextField
					className="w-1/2"
					label={"Last Name"}
					error={error.name === "lName" && error}
					type="text"
					name="lName"
					value={data.lName}
					onChange={onChange}
				/>
			</div>

			<div className="flex items-start justify-start gap-5">
				<TextField
					className="w-1/2"
					label={"Phone"}
					error={
						data.phone === ""
							? "Phone number must contain country code including + sign"
							: error.name === "phone" && error
					}
					type="text"
					name="phone"
					value={data.phone}
					onChange={onChange}
				/>

				<TextField
					className="w-1/2"
					label={"Password"}
					error={error.name === "password" && error}
					type="text"
					name="password"
					value={data.password}
					onChange={onChange}
				/>
			</div>

			<div className="flex items-start justify-start gap-5">
				<TextField
					className="w-1/2"
					label={"Driver License Number"}
					error={error.name === "driverLicense" && error}
					type="text"
					name="driverLicense"
					value={data.driverLicense}
					onChange={onChange}
				/>

				<div className="w-1/2">
					<DisabledTextField label={"Email"} value={data.email} />
				</div>
			</div>

			<div className="flex items-start justify-start gap-5">
				<div className="w-1/2">
					<DisabledTextField label={"ID"} value={data.id} />
				</div>

				<div className="w-1/2">
					<DisabledTextField label={"Address"} value={data.address} />
				</div>
			</div>

			{/* Lease Row */}

			{/* <div className="flex justify-center items-center pt-1 gap-5">
        <div className="item w-1/2">
          <p style={{ textAlign: 'left', color: white, fontFamily: 'Inter-Regular', fontSize: 11 }}>
            Lease Agreement
          </p>
          <div className='flex items-center'
            style={{ backgroundColor: secondaryColor, height: 44, marginTop: 5, paddingLeft: 10, borderRadius: 8 }}>
            <InsertDriveFileIcon fontSize='small' color='success' />
            <p style={{ textAlign: 'left', color: white, fontFamily: 'Inter-Regular', paddingLeft: 10, fontSize: 13 }}>
              {data.lease}
            </p>
          </div>
        </div>

        <div className="item w-1/2">
          <p style={{ textAlign: 'left', color: white, fontFamily: 'Inter-Regular', fontSize: 11 }}>
            Insurance Policy
          </p>
          <div className='flex items-center'
            style={{ backgroundColor: secondaryColor, height: 44, marginTop: 5, paddingLeft: 10, borderRadius: 8 }}>
            <InsertDriveFileIcon fontSize='small' color='success' />
            <p style={{ textAlign: 'left', color: white, fontFamily: 'Inter-Regular', paddingLeft: 10, fontSize: 13 }}>
              {data.insurance}
            </p>
          </div>
        </div>
      </div> */}

			<div className="flex items-start justify-start gap-5">
				<div className="w-1/2">
					<DisabledTextField
						label={"Last Login"}
						value={new Date(data.lastLogin).toLocaleString()}
					/>
				</div>

				<div className="w-1/2">
					<DisabledTextField
						label={"Registered on"}
						value={new Date(data.registerOn).toLocaleString()}
					/>
				</div>
			</div>
		</div>
	);
};

const GroupSettings = ({
	groupStatus,
	setGroupStatus,
	groupsList,
	onChangeGroupList,
	setError,
}) => {
	return (
		<div>
			<div style={Styles.headingTextWhite} className="mb-2">
				Group
			</div>
			<div className="flex items-center justify-start flex-wrap gap-4 ">
				{groupsList.map((group, index) => (
					<div
						key={group.id}
						style={group.value ? Styles.borderYellow : Styles.borderTransparent}
						className={`flex flex-row items-center w-52 h-24 p-3 rounded-md`}>
						<CheckBox
							checked={group.value}
							onChange={() => {
								onChangeGroupList(group, index);
								setError({ name: "", msg: "" });
							}}
						/>

						<div className="flex flex-col -ml-3">
							<p style={Styles.normalTextWhite}>{group.title}</p>
							<p style={Styles.normalTextGray}>{group.desp}</p>
						</div>
					</div>
				))}
			</div>
			<br />
			<div style={Styles.normalTextWhite} className="cursor-pointer">
				Status
			</div>
			<div className="flex items-center justify-start ">
				<CheckBox
					color={white}
					checked={groupStatus}
					onChange={() => setGroupStatus(!groupStatus)}
					label="Active"
				/>
			</div>
		</div>
	);
};

const Payments = ({
	data,
	card,
	setCard,
	error,
	setError,
	cardOnChange,
	recallUserDetails,
}) => {
	// Creating Units Array
	const unitsArray = () => {
		const leased = data?.unit?.leased?.map((item) => {
			const obj = {
				title: `${item?.unit_number}, Building-${item?.building_name}, ${item?.facility_name}`,
				type: "leased",
				maintenanceFee: `$ ${item?.maintenance_fee}`,
				rentalFee: `$ ${item?.lease_price}`,
				insuranceFee: "No insurance policy linked yet.",
			};
			return obj;
		});
		const owned = data?.unit?.owned?.map((item) => {
			const obj = {
				title: `${item?.unit_number}, Building-${item?.building_name}, ${item?.facility_name}`,
				type: "owned",
				maintenanceFee: `$ ${item?.maintenance_fee}`,
				rentalFee: `$ ${item?.lease_price}`,
				insuranceFee: "No insurance policy linked yet.",
			};
			return obj;
		});

		return [].concat(leased, owned);
	};
	const unitData = unitsArray();
	const [unit, setUnit] = useState("");

	// Creating Cards Array
	const cardsArray = () => {
		const cards = data?.cards?.map((item) => {
			const obj = {
				cardId: item?.id,
				cardType: item?.brand,
				cardNum: `**** ${item?.card_number}`,
				cardExpiry: `${item?.exp_month}/${item?.exp_year}`,
				isDefault: item?.is_default,
			};
			return obj;
		});
		return cards;
	};
	const cardData = cardsArray();
	const [addCard, setAddCard] = useState(false);
	const [deleteCard, setdeleteCard] = useState(false);
	const [deleteCardData, setDeleteCardData] = useState();
	const [cardError, setCardError] = useState({ name: "", msg: "" });

	// Performing Delete and Make Default operation on Cards
	const cardOperations = (cardID, operation) => {
		const payload = {
			operation: operation,
			userID: data?.id,
			cardID: cardID,
		};
		ApiController.cardOperations(payload, (response) => {
			if (response.success) {
				console.log("🚀 ~ file: EditUser.jsx ~ line 310 ~ response", response);
				recallUserDetails(data?.id);
			} else {
				console.log("🚀 ~ file: EditUser.jsx ~ line 310 ~ response", response);
				setCardError({
					name: "defaultCardCode",
					msg: "Please change default card prior to deleting",
				});
			}
		});
	};

	const cardOnAdd = () => {
		if (cardData?.length >= 2) {
			setCardError({
				name: "cardLimitCode",
				msg: "A Maximum of two cards are allowed to be kept on file. Please delete a card and try again.",
			});
		} else {
			setAddCard(true);
		}
	};
	const cardOnCancel = () => {
		setAddCard(false);
		setError({ name: "", msg: "" });
		setCard({ cardNum: "", cardExp: "", cardCVC: "", cardHolderName: "" });
	};

	return (
		<div>
			<div className="mb-2">
				<p style={Styles.headingTextWhite}>Payment Information</p>
				<p style={Styles.smallTextGray}>
					Select a unit to view payment information
				</p>
			</div>

			{/* Unit Dropdown */}
			<div className="flex items-start justify-start gap-5">
				<SelectDropdown
					width={670}
					type="switchDropdown"
					list={unitData}
					className="mt-1"
					value={unit}
					placeholder={"Select"}
					label={"Unit"}
					onClick={(value) => setUnit(value)}
				/>
			</div>

			{/* Unit Fields */}
			{unit && (
				<>
					{unit?.type === "owned" ? (
						<div className="flex items-start justify-start gap-5">
							{/* <TextField className="w-full" label={'Insurance Fee'}
            type="text" name="rentalFee" value={unit?.insuranceFee} onChange={onChange}
          /> */}
							<DisabledTextField
								label={"Maintenance Fee"}
								value={unit?.maintenanceFee}
							/>
						</div>
					) : (
						<div className="flex items-start justify-start gap-5">
							<div className="w-1/2">
								<DisabledTextField
									label={"Maintenance Fee"}
									value={unit?.maintenanceFee}
								/>
							</div>

							{/* <TextField className="w-1/2" label={'Rental Fee'}
            type="text" name="maintenanceFee" value={unit?.rentalFee} onChange={onChange}
          /> */}
							<div className="w-1/2">
								<DisabledTextField
									label={"Rental Fee"}
									value={unit?.rentalFee}
								/>
							</div>
						</div>
					)}

					<div className="flex items-start justify-start gap-5">
						{/* <TextField className="w-full" label={'Insurance Fee'}
            type="text" name="rentalFee" value={unit?.insuranceFee} onChange={onChange}
          /> */}
						<DisabledTextField
							label={"Insurance Fee"}
							value={unit?.insuranceFee}
						/>
					</div>
				</>
			)}

			<div className="mt-5">
				<div className="flex items-center">
					<p className="mr-5" style={Styles.headingTextWhite}>
						Cards
					</p>
					{/* Card Operation Error Message */}
					{(cardError.name === "defaultCardCode" ||
						cardError.name === "cardLimitCode") && (
						<div className="flex items-center justify-between">
							<p className="mr-3" style={Styles.errorText}>
								{" "}
								{cardError.msg}{" "}
							</p>
							<div
								className="cursor-pointer"
								onClick={() => setCardError({ name: "", msg: "" })}>
								<CloseIcon fontSize="small" color="secondary" />
							</div>
						</div>
					)}
				</div>
				<div className="flex items-start justify-start gap-5 mt-1">
					<div className="item w-full">
						{/* Cards Row */}
						{cardData?.length > 0 &&
							cardData?.map((item, index) => {
								return (
									<div
										key={index}
										className="flex items-center"
										style={{
											backgroundColor: secondaryColor,
											height: 44,
											marginTop: 5,
											paddingLeft: 12,
											borderTopRightRadius: 8,
											borderTopLeftRadius: 8,
										}}>
										<img
											alt="visa"
											className="h-9 w-9"
											src={
												item?.cardType === "Visa"
													? AssetsImages.visa
													: AssetsImages.master
											}
										/>

										<div className="w-[500px] ml-3">
											<p style={Styles.smallTextWhite}>{item?.cardNum}</p>
											<p style={Styles.smallTextGray}>{item?.cardExpiry}</p>
										</div>

										<div className="flex  items-center">
											{item?.isDefault ? (
												<CheckCircleIcon
													fontSize="small"
													className="ml-[60px] mr-1"
													color="success"
												/>
											) : (
												<p
													onClick={() => cardOperations(item.cardId, "default")}
													className="underline ml-3 mr-1 cursor-pointer"
													style={Styles.smallTextGray}>
													Make Default
												</p>
											)}
											{!item?.isDefault ? (
												<div
													onClick={() => {
														setDeleteCardData(item);
														setdeleteCard(true);
													}}
													className="cursor-pointer">
													<DeleteIcon fontSize="small" color="secondary" />
												</div>
											) : null}
										</div>
									</div>
								);
							})}

						{/* Add Card Fields */}
						{addCard && (
							<>
								<div className="flex items-start justify-start gap-5">
									<TextField
										className="w-full"
										label={"Card Number"}
										error={error.name === "cardNum" && error}
										type="text"
										name="cardNum"
										value={card?.cardNum}
										onChange={cardOnChange}
									/>
								</div>

								<div className="flex items-start justify-start gap-5">
									<div className="w-1/2">
										<TextField
											className="w-full"
											label={"Expiration Date"}
											error={error.name === "cardExp" && error}
											type="text"
											name="cardExp"
											value={card?.cardExp}
											onChange={cardOnChange}
										/>
									</div>

									<TextField
										className="w-1/2"
										label={"Security Code"}
										error={error.name === "cardCVC" && error}
										type="text"
										name="cardCVC"
										value={card?.cardCVC}
										onChange={cardOnChange}
									/>
								</div>

								<div className="flex items-start justify-start gap-5">
									<TextField
										className="w-full"
										label={"Card Holder Name"}
										error={error.name === "cardHolderName" && error}
										type="text"
										name="cardHolderName"
										value={card?.cardHolderName}
										onChange={cardOnChange}
									/>
								</div>
							</>
						)}

						{/* Add Card Button */}
						{!addCard ? (
							<div
								onClick={() => cardOnAdd()}
								className="flex w-20 mt-3 cursor-pointer">
								<AddIcon fontSize="small" color="secondary" />
								<p style={Styles.disableBtnText}>Add Card</p>
							</div>
						) : (
							<div
								onClick={() => cardOnCancel()}
								className="flex mt-3 cursor-pointer w-11">
								<p style={Styles.disableBtnText}>Cancel</p>
							</div>
						)}

						{/* Delete Card */}
						<DeleteCard
							open={deleteCard}
							close={() => setdeleteCard(false)}
							data={deleteCardData?.cardNum}
							deleteCard={() => {
								cardOperations(deleteCardData?.cardId, "delete");
								setdeleteCard(false);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditUser;
