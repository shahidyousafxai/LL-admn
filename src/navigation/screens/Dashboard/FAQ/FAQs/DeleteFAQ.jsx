// Library Imports
import React from "react";

// Local Imports
import Button from "../../../../../components/button.js";
import CustomModal from "../../../../../components/Modal/Modal.jsx";
import { Styles } from "../../../../../utils/style/GlobalStyles.js";

const DeleteFAQ = ({
	open,
	close,
	editFAQsData,
	loading,
	deleteFAQ,
	deleteFAQError,
}) => {
	return (
		<CustomModal open={open} close={close} title="Delete FAQ" width={390}>
			<div className="flex pt-2">
				<p style={Styles.deleteModalText}>
					Are you sure that you want to delete ‘{editFAQsData?.FAQs}’?
				</p>
			</div>
			<div className="flex items-center justify-end gap-5 mt-5">
				<div onClick={close} className="text-white text-sm cursor-pointer">
					<p style={Styles.cancelBtn}>Cancel</p>
				</div>
				<Button
					className={`!px-5 text-sm !normal-case`}
					style={Styles.activeBtn}
					onClick={() => deleteFAQ(editFAQsData?.id)}
					loading={loading}
				>
					{!loading && <p style={Styles.activeBtnText}>Delete</p>}
				</Button>
			</div>
			{deleteFAQError !== "" ? (
				<div className="flex justify-end pt-3" style={Styles.errorText}> {deleteFAQError} </div>
			) : null}
		</CustomModal>
	);
};

export default DeleteFAQ;
