// Library Imports
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Local Imports
import { settingsList } from "../../../../components/Tables/dummyData";
import {
	gray,
	secondaryColor,
	primaryColor,
	white,
} from "../../../../utils/style/GlobalVariables";
import {
	compareStrings,
	validateInput,
	validatePassword,
	validatePasswordInput,
	validatePhone,
} from "../../../../utils/validations/localValidations";
import ApiController from "../../../../utils/network/api";
import PersonalInformation from "./PersonalInfo";
import Password from "./Password";
import { authUser } from "../../../../redux/reducers/authReducer";

const AccountSettings = () => {
	//***** States *****//
	const dispatch = useDispatch();

	const initValue = {
		state: 1,
		password: {
			current: "",
			new: "",
			confirm: "",
		},
		userInfo: {
			fName: "",
			lName: "",
			phone: "",
			stAddress: "",
			city: "",
			zipCode: "",
			state: "",
		},
		userErrors: {
			name: "",
			msg: "",
		},
		errors: {
			name: "",
			msg: "",
		},
		pwdValidation: {
			minLength: null,
			number: null,
			isLowerCase: null,
			isUpperCase: null,
			isSpecialChar: null,
		},
	};
	const [state, setState] = useState(initValue.state);
	const firstNameRef = useRef(null);
	const currentPwdRef = useRef(null);

	useEffect(() => {
		if (state === 1) {
			firstNameRef.current.focus();
			scrollTo("Personal_Information");
		} else {
			currentPwdRef.current.focus();
			scrollTo("Password");
		}
	}, [state]);

	//***** Methods *****//
	//   scroll onClick of side options
	const scrollTo = (id) => {
		let element = document.getElementById(`${id}`);
		element.scrollIntoView({ behavior: "smooth" });
	};

	//************************* Personal Information Start *******************************//

	//***** States *****//

	const user = useSelector((state) => state?.authUser?.authUser);

	const [userInfo, setUserInfo] = useState(initValue.userInfo);
	const [userErrors, setUserErrors] = useState(initValue.userErrors);
	const [userLoading, setUserLoading] = useState(false);
	const [error, setError] = useState("");

	// Setting Values to input fields
	useEffect(() => {
		setUserInfo({
			fName: user?.first_name ? user?.first_name : "",
			lName: user?.last_name ? user?.last_name : "",
			phone: user?.phone_no ? user?.phone_no : "",
			stAddress: user?.mailing_address?.street_address
				? user?.mailing_address?.street_address
				: "",
			city: user?.mailing_address?.city?.name
				? user?.mailing_address?.city?.name
				: "",
			zipCode: user?.mailing_address?.zipcode
				? user?.mailing_address?.zipcode
				: "",
			state: user?.mailing_address?.state?.name
				? user?.mailing_address?.state?.name
				: "",
		});
	}, [user]);

	// checking Fields are empty or not
	useEffect(() => {
		checkUserEmpty();
		// eslint-disable-next-line
	}, [userInfo]);

	//***** Methods *****//

	const onChangeUserInfo = (e) => {
		// Validate User Input
		if (validateInput(e.target.name, e.target.value)) {
			// Setting User Input Into States
			setUserInfo({
				...userInfo,
				[e.target.name]: e.target.value,
			});
		}
	};

	const checkUserEmpty = () => {
		return userInfo.fName === "" ||
			userInfo.lName === "" ||
			userInfo.phone === "" ||
			userInfo.stAddress === "" ||
			userInfo.city === "" ||
			userInfo.zipCode === "" ||
			userInfo.state === "" ||
			userLoading
			? true
			: false;
	};

	const userResetErrors = () => {
		setUserErrors(initValue.userErrors);
	};

	const onUserSavePress = () => {
		setUserLoading(true);

		if (validatePhone(userInfo.phone)) {
			ApiController.updatePersonalInfo(userInfoPayload(), (response) => {
				if (response.success) {
					// For Updating authUser data in redux
					let data = {
						all_user_permissions: user?.all_user_permissions,
						email: user?.email,
						first_name: response?.data?.name?.first_name,
						last_name: response?.data?.name?.last_name,
						mailing_address: response?.data?.mailing_address,
						phone_no: response?.data?.phone_no,
						token: user?.token,
					};
					dispatch(authUser(data));
					setUserLoading(false);
				} else {
					setError(response?.data);
					setUserLoading(false);
				}
			});
		} else {
			setUserErrors({
				name: "phone",
				msg: "Please enter a valid contact number.",
			});
			setUserLoading(false);
		}
	};

	const userInfoPayload = () => {
		let payload = {
			first_name: userInfo.fName,
			last_name: userInfo.lName,
			phone_no: userInfo.phone,
			street: userInfo.stAddress,
			postal_code: userInfo.zipCode,
			city: 913,
		};
		return payload;
	};

	const isValueChanged = () => {
		if (
			user?.first_name !== userInfo?.fName ||
			user?.last_name !== userInfo?.lName ||
			user?.phone_no !== userInfo?.phone ||
			user?.mailing_address?.street_address !== userInfo?.stAddress.trim() ||
			user?.mailing_address?.zipcode !== userInfo?.zipCode
		) {
			return true;
		} else {
			return false;
		}
	};

	//************************* Personal Information Start *******************************//

	//************************* Password Start *******************************//

	//***** States *****//
	const [pwdLoading, setPwdLoading] = useState(false);
	const [pwdChangeSuccess, setPwdChangeSuccess] = useState(false);
	const [password, setPassword] = useState(initValue.password);
	const [errors, setErrors] = useState(initValue.errors);
	const [pwdValidation, setPwdValidation] = useState(initValue.pwdValidation);

	// checking Fields are empty or not
	useEffect(() => {
		checkEmpty();
		// eslint-disable-next-line
	}, [password]);
	// change password success alert
	useEffect(() => {
		setTimeout(() => setPwdChangeSuccess(false), 2000);
	}, [pwdLoading]);

	//***** Methods *****//

	const checkEmpty = () => {
		return password.current === "" ||
			password.new === "" ||
			password.confirm === "" ||
			pwdLoading
			? true
			: false;
	};

	const onChangePwd = (e) => {
		if (e.target.name !== "new") {
			setPassword({
				...password,
				[e.target.name]: e.target.value,
			});
		}
		if (e.target.name === "new") {
			setPassword({
				...password,
				[e.target.name]: e.target.value,
			});
			validatePasswordInput(e.target.value, setPwdValidation);
		}
	};
	const resetErrors = () => {
		setErrors(initValue.errors);
	};

	const createPayload = () => {
		let payload = {
			current_password: password.current,
			new_password: password.new,
		};
		return payload;
	};

	const onSavePress = async () => {
		setPwdLoading(true);

		if (!(await validatePassword(password.new, setErrors))) {
			return setPwdLoading(false);
		} else if (!compareStrings(password.new, password.confirm, setErrors)) {
			return setPwdLoading(false);
		} else {
			ApiController.changePassewordCall(createPayload(), (response) => {
				// response success
				if (response?.success) {
					setPassword(initValue.password);
					setPwdValidation("");
					setPwdLoading(false);
					setPwdChangeSuccess(true);
				}
				// response failed
				else {
					if (response?.data[0]?.current_password) {
						setErrors({
							name: "currentPassword",
							msg: response?.data[0]?.current_password,
						});
						setPwdLoading(false);
					}
				}
			});
		}
	};

	//************************* Password End *******************************//

	return (
		<div className="flex">
			<div
				style={{ backgroundColor: primaryColor }}
				className=" w-[17%] p-4 fixed "
			>
				<p
					style={{ fontFamily: "Inter-Medium", fontSize: 15, color: white }}
					className="my-2"
				>
					Account Settings
				</p>
				<ul className="p-2 flex flex-col  gap-5 text-sm">
					{settingsList.map((itm) => (
						<li
							key={itm.id}
							onClick={() => {
								setState(itm.id);
								scrollTo(itm.idName);
							}}
							className={`
                                cursor-pointer flex items-center 
                                justify-start w-full p-2 gap-3 rounded-xl text-sm
                                ${state === itm.id && "bg-[#CDA950]"} group
                            `}
						>
							<div className="w-10">
								{state === itm.id ? <>{itm.iconActive}</> : <>{itm.icon}</>}
							</div>
							<div className="flex flex-col gap-1">
								<p
									style={{
										fontFamily: "Inter-Medium",
										fontSize: 13,
										color: state === itm.id ? "black" : white,
									}}
									className={`m-0`}
								>
									{itm.title}
								</p>
								<p
									className={` m-0 text-xs group-hover:text-black `}
									style={{
										fontFamily: "Inter-Regular",
										fontSize: 11,
										color: state === itm.id ? "black" : gray,
									}}
								>
									{itm.desp}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div
				style={{ backgroundColor: secondaryColor, marginLeft: "22%" }}
				className={"w-[82%] pl-10"}
			>
				<PersonalInformation
					state={state}
					firstNameRef={firstNameRef}
					userInfo={userInfo}
					checkEmpty={checkUserEmpty}
					onChangeUserInfo={onChangeUserInfo}
					errors={userErrors}
					resetErrors={userResetErrors}
					userLoading={userLoading}
					onSavePress={onUserSavePress}
					isValueChanged={isValueChanged}
					isSuperAdmin={
						user?.all_user_permissions?.includes("superadmin") ? true : false
					}
					error={error}
				/>
				<Password
					state={state}
					password={password}
					onChangePwd={onChangePwd}
					currentPwdRef={currentPwdRef}
					onSavePress={onSavePress}
					errors={errors}
					pwdLoading={pwdLoading}
					pwdValidation={pwdValidation}
					resetErrors={resetErrors}
					checkEmpty={checkEmpty}
					pwdChangeSuccess={pwdChangeSuccess}
				/>
			</div>
		</div>
	);
};

export default AccountSettings;
