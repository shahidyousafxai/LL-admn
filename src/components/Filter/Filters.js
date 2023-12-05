// Library Imports
import Popover from "@material-ui/core/Popover";
import { ClickAwayListener } from "@mui/material";

// Local Imports
import { secondaryColor, white, yellow } from '../../utils/style/GlobalVariables';
import './Filters.css'


export const MyPopper = ({ clickAwayHandler, id, open, anchorEl, handleClose, onClear, children }) => (
    <ClickAwayListener onClickAway={clickAwayHandler}>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            className="mt-2"

        >
            <div
                style={{ backgroundColor: secondaryColor }}
                className={`w-[280px] pt-2 rounded-lg flex flex-col`}>

                <div className="flex flex-row justify-between items-center px-4">
                    <p style={{ textAlign: 'left', color: white, fontFamily: 'Inter-Medium', fontSize: 17 }}>
                        Filter
                    </p>
                    <p onClick={onClear} style={{
                        color: yellow, fontFamily: 'Inter-Regular', fontSize: 11,
                        cursor: 'pointer'
                    }}>
                        Clear All
                    </p>
                </div>

                {children}

            </div>
        </Popover>
    </ClickAwayListener>
)