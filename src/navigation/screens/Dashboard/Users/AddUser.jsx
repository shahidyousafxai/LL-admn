// Library Imports
import React from "react";

// Local Imports
import Button from "../../../../components/button.js";
import TextField from "../../../../components/inputField.js";
import CustomModal from "../../../../components/Modal/Modal.jsx";
import PasswordStrengthIndicator from "../../../../components/PasswordStrengthIndicator.js";
import { Styles } from "../../../../utils/style/GlobalStyles.js";

const AddUser = ({
	open,
	close,
	newUser,
	onChange,
	onSave,
	loading,
	error,
	pwdValidation,
	resetErrors,
}) => {
	const [pwdFocus, setPwdFocus] = React.useState(false);
	const [readOnly, setReadOnly] = React.useState(true);

	return (
		<CustomModal open={open} close={close} title="New User">
			<form>
				{/* First Name */}
				<TextField
					value={newUser.fName}
					onChange={onChange}
					label={"First Name"}
					type="text"
					name="fName"
					onFocus={() => setPwdFocus(false)}
				/>

				{/* Last Name */}
				<TextField
					value={newUser.lName}
					onChange={onChange}
					label={"Last Name"}
					type="text"
					name="lName"
					onFocus={() => setPwdFocus(false)}
				/>

				{/* Email */}
				<TextField
					error={error.name === "email" && error}
					value={newUser.email}
					onChange={onChange}
					label={"Email"}
					type="email"
					name="email"
					onFocus={() => {
						setReadOnly(false);
						setPwdFocus(false);
						resetErrors();
					}}
					readOnly={readOnly}
					onBlur={() => setReadOnly(true)}
				/>

				{/* Password */}
				<TextField
					addUser
					error={error.name === "password" && error}
					value={newUser.password}
					onChange={onChange}
					label={"Password"}
					type="password"
					name="password"
					onFocus={() => {
						setPwdFocus(true);
						resetErrors();
					}}
				/>

				{pwdFocus && newUser.password.length > 0 && (
					<PasswordStrengthIndicator
						className="mt-5"
						validity={pwdValidation}
					/>
				)}

				{/* Confirm Password */}
				<TextField
					addUser
					error={error.name === "notMatched" && error}
					value={newUser.confirmPassword}
					onChange={onChange}
					label={"Confirm Password"}
					type="password"
					name="confirmPassword"
					onFocus={() => {
						setPwdFocus(false);
						resetErrors();
					}}
				/>

				{/* Buttons */}
				<div className="flex items-center justify-end gap-5 mt-5">
					<p onClick={close} style={Styles.cancelBtn}>
						Cancel
					</p>
					<Button
						className={`!px-5 !text-white text-sm !normal-case`}
						style={
							newUser.fName === "" ||
							newUser.lName === "" ||
							newUser.email === "" ||
							newUser.password === "" ||
							newUser.confirmPassword === "" ||
							loading
								? Styles.disableBtn
								: Styles.activeBtn
						}
						onClick={onSave}
						loading={loading}
						disabled={
							newUser.fName === "" ||
							newUser.lName === "" ||
							newUser.email === "" ||
							newUser.password === "" ||
							newUser.confirmPassword === "" ||
							loading
								? true
								: loading
								? true
								: false
						}
					>
						{!loading && (
							<p
								style={
									newUser.fName === "" ||
									newUser.lName === "" ||
									newUser.email === "" ||
									newUser.password === "" ||
									newUser.confirmPassword === "" ||
									loading
										? Styles.disableBtnText
										: Styles.activeBtnText
								}
							>
								Save
							</p>
						)}
					</Button>
				</div>
			</form>
		</CustomModal>
	);
};

export default AddUser;
