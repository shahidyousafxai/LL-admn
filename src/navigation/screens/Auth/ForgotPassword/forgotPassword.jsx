// Library Imports
import React, { useState } from "react";
import ApiController from "../../../../utils/network/api";

// Local Imports
import { validateEmail } from "../../../../utils/validations/localValidations";
import ForgotPasswordUI from "./forgotPasswordUI";

const ForgotPassword = ({ setLoginView }) => {
	// States
	const [state, setState] = useState({
		email: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [errors, setErrors] = useState({
		name: "",
		msg: "",
	});

	// on Submit Press
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (
			await validateEmail(state.email.toLocaleLowerCase().trim(), setErrors)
		) {
			ApiController.forgotPasswordCall(
				{ email: state.email.toLocaleLowerCase().trim() },
				(res) => {
					console.log("🚀 ~ file: forgotPassword.jsx:32 ~ res:", res);
					if (res?.success) {
						setSuccess("Email with temporary password send succesfully.");
						setLoading(false);
						setTimeout(() => {
							setLoginView(true);
						}, 2000);
					} else {
						setErrors({ name: "email", msg: res?.data });
						setLoading(false);
					}
				}
			);
		} else {
			setLoading(false);
		}
	};

	// OnChange Email
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
		setErrors({ name: "", msg: "" });
	};

	return (
		<ForgotPasswordUI
			onChange={handleChange}
			onSubmit={handleSubmit}
			errors={errors}
			loading={loading}
			success={success}
			setLoginView={setLoginView}
		/>
	);
};

export default ForgotPassword;
