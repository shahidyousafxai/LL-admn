// Library Imports
import React from "react";

// Local Imports
import Button from "../../../../components/button.js";
import CustomModal from "../../../../components/Modal/Modal.jsx";
import { Styles } from "../../../../utils/style/GlobalStyles.js";

const DeleteAnnouncement = ({
	open,
	close,
	editAnnouncementData,
	loading,
	deleteAnnouncement,
	deleteAnnouncementError,
}) => {
	return (
		<CustomModal open={open} close={close} title="Delete Announcement" width={390}>
			<div className="flex pt-2 overflow-x-scroll">
				<p style={Styles.deleteModalText}>
					Are you sure that you want to delete ‘{editAnnouncementData?.announcement}’?
				</p>
			</div>
			<div className="flex items-center justify-end gap-5 mt-5">
				<div onClick={close} className="text-white text-sm cursor-pointer">
					<p style={Styles.cancelBtn}>Cancel</p>
				</div>
				<Button
					className={`!px-5 text-sm !normal-case`}
					style={Styles.activeBtn}
					onClick={() => deleteAnnouncement(editAnnouncementData?.id)}
					loading={loading}
				>
					{!loading && <p style={Styles.activeBtnText}>Delete</p>}
				</Button>
			</div>
			{deleteAnnouncementError !== "" ? (
				<div className="flex justify-end pt-3" style={Styles.errorText}> {deleteAnnouncementError} </div>
			) : null}
		</CustomModal>
	);
};

export default DeleteAnnouncement;
