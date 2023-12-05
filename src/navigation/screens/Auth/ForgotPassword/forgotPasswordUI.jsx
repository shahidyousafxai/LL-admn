// Library Imports
import React from "react";

// Local Imports
import AssetsImages from "../../../../assets";
import { primaryColor, yellow } from "../../../../utils/style/GlobalVariables";
import TextField from "../../../../components/inputField";
import Button from "../../../../components/button";
import TextButton from "../../../../components/textButton";

const forgotPasswordUI = ({
	onChange,
	onSubmit,
	errors,
	loading,
	success,
	setLoginView,
}) => {
	return (
		<form
			onSubmit={onSubmit}
			className="sm:w-5/6 md:w-5/6 lg:w-4/6 flex flex-col"
		>
			<img className="h-11 w-40" alt="LUXE LOCKER" src={AssetsImages.logo} />
			<div className="h-72">
				<p
					style={{ fontFamily: "Inter-Regular", fontSize: 15 }}
					className="text-white text-base mt-7"
				>
					Forgot Password?
				</p>
				<TextField
					label={"Email"}
					onChange={onChange}
					name="email"
					error={errors.name === "email" && errors}
				/>
				<div className="flex flex-row justify-end ml-1">
					<TextButton
						onClick={() => setLoginView(true)}
						label={"Go back to Login Screen."}
					/>
				</div>
				<Button
					type={"submit"}
					style={{
						backgroundColor: yellow,
						textTransform: "none",
						color: primaryColor,
						height: "40px",
						marginTop: "20px",
						fontFamily: "Inter-Medium",
					}}
					variant="contained"
					fullWidth={true}
					disabled={false}
					loading={loading}
				>
					{!loading && "Send"}
				</Button>
				{success !== "" ? (
					<p
						style={{ fontFamily: "Inter-Regular", fontSize: 12, color: yellow }}
						className="text-base"
					>
						{success}
					</p>
				) : null}
			</div>
		</form>
	);
};

export default forgotPasswordUI;
