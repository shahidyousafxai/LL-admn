// Local Imports
import Button from "../../../../components/button";
import TextField from "../../../../components/inputField.js";
import { Styles } from "../../../../utils/style/GlobalStyles";
import {
	gray,
	yellow,
	primaryColor,
	secondaryColor,
	red,
} from "../../../../utils/style/GlobalVariables";

const PersonalInformation = ({
	state,
	firstNameRef,
	userInfo,
	onChangeUserInfo,
	errors,
	resetErrors,
	checkEmpty,
	userLoading,
	onSavePress,
	isSuperAdmin,
	isValueChanged,
	error,
}) => {
	return (
		<div id="Personal_Information" className="w-[90%] mt-5 py-5">
			<div
				style={{
					backgroundColor: primaryColor,
					boxShadow: state === 1 && "0px 0px 5px -2px #CDA950",
				}}
				className="w-11/12 rounded-md p-8 text-sm text-white"
			>
				<p
					className="mb-5"
					style={{ fontFamily: "Inter-Medium", fontSize: 13 }}
				>
					Personal Information
				</p>
				<div className="">
					{/* First Name /  Last Name */}
					<div className="flex items-start justify-between w-full gap-5">
						<div className="w-1/2">
							<p
								className="mb-1"
								style={{ fontFamily: "Inter-Medium", fontSize: 13 }}
							>
								Name
							</p>
							<p
								style={{
									fontFamily: "Inter-Regular",
									fontSize: 11,
									color: gray,
								}}
							>
								This will be displayed on your profile
							</p>
						</div>
						<div className="flex w-1/2 items-start gap-5">
							<div className="flex flex-col w-1/2 gap-2">
								<TextField
									className="mt-0"
									inputRef={firstNameRef}
									label={"First Name"}
									type="text"
									name="fName"
									value={userInfo.fName}
									onChange={onChangeUserInfo}
									error={errors.name === "fName" && errors}
									onFocus={resetErrors}
									disabled={!isSuperAdmin}
								/>
							</div>
							<div className="flex flex-col w-1/2 gap-2">
								<TextField
									className="mt-0"
									label={"Last Name"}
									type="text"
									name="lName"
									value={userInfo.lName}
									onChange={onChangeUserInfo}
									error={errors.name === "lName" && errors}
									onFocus={resetErrors}
									disabled={!isSuperAdmin}
								/>
							</div>
						</div>
					</div>

					<hr style={Styles.hrBreak} />

					{/* Phone */}
					<div className="flex items-start justify-between w-full gap-5">
						<div className="w-1/2">
							<p
								className="mb-1"
								style={{ fontFamily: "Inter-Medium", fontSize: 13 }}
							>
								Phone
							</p>
						</div>
						<div className="flex flex-col gap-2 w-1/2">
							<TextField
								className="mt-0"
								label={"Phone"}
								type="text"
								name="phone"
								value={userInfo.phone}
								onChange={onChangeUserInfo}
								error={errors.name === "phone" && errors}
								onFocus={resetErrors}
							/>
						</div>
					</div>

					<hr style={Styles.hrBreak} />

					{/* Mailing Address */}
					<div className="flex items-start justify-between w-full gap-5">
						<div className="w-1/2">
							<p
								className="mb-1"
								style={{ fontFamily: "Inter-Medium", fontSize: 13 }}
							>
								Mailing Address
							</p>
						</div>
						<div className="w-1/2 flex flex-col gap-10">
							<div className="flex w-full  items-start gap-5 h-full">
								<div className="flex flex-col w-1/2  gap-2">
									<TextField
										className="mt-0"
										label={"Street Address"}
										type="text"
										name="stAddress"
										value={userInfo.stAddress}
										onChange={onChangeUserInfo}
										error={errors.name === "stAddress" && errors}
										onFocus={resetErrors}
									/>
								</div>
								<div className="flex flex-col w-1/2  gap-2">
									<TextField
										className="mt-0"
										label={"City"}
										type="text"
										name="city"
										value={userInfo.city}
										onChange={onChangeUserInfo}
										error={errors.name === "city" && errors}
										onFocus={resetErrors}
									/>
								</div>
							</div>
							<div className="flex w-full items-start gap-5 h-full">
								<div className="flex flex-col w-1/2  gap-2">
									<TextField
										className="mt-0"
										label={"ZIP Code"}
										type="text"
										name="zipCode"
										value={userInfo.zipCode}
										onChange={onChangeUserInfo}
										error={errors.name === "zipCode" && errors}
										onFocus={resetErrors}
									/>
								</div>
								<div className="flex flex-col  w-1/2 gap-2">
									<TextField
										className="mt-0"
										label={"State"}
										type="text"
										name="state"
										value={userInfo.state}
										onChange={onChangeUserInfo}
										error={errors.name === "state" && errors}
										onFocus={resetErrors}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-end justify-end pt-5 my-5">
						<Button
							type={"submit"}
							style={{
								backgroundColor: userLoading
									? yellow
									: checkEmpty() || !isValueChanged()
									? secondaryColor
									: yellow,
								textTransform: "none",
								height: "40px",
								width: "160px",
								fontFamily: "Inter-Medium",
								borderRadius: 8,
							}}
							variant="contained"
							fullWidth={true}
							disabled={checkEmpty() || !isValueChanged()}
							loading={userLoading}
							onClick={() => onSavePress()}
						>
							{!userLoading && (
								<p
									style={{
										fontFamily: "Inter-Medium",
										fontSize: 13,
										color:
											checkEmpty() || !isValueChanged() ? gray : primaryColor,
									}}
								>
									Save
								</p>
							)}
						</Button>
						{error ? (
							<span style={{ color: red }} className="text-xs pt-3">
								{error}
							</span>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PersonalInformation;
