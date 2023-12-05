import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "./Typography";
import { gray } from "../utils/style/GlobalVariables";
import Amenities from "../navigation/screens/Dashboard/Campus/Campuses/AddCampus/AddCampusComponents/Amenitites";

const checkbox = ({ label, size, color, checked, fontWeight, onChange, amenities }) => (
  <FormControlLabel
    control={
      <Checkbox
        size={'small'}
        sx={{
          "& .MuiSvgIcon-root": {
            ...(!checked ? {
              width: 16,
              height: 16,
              borderStyle: "solid",
              borderRadius: 1,
              borderWidth: 1,
              borderColor: gray,
            } : {
              width: 18,
              height: 18,
              marginLeft: -0.25,
              marginTop: -0.25,

            })
          },
        }}
        onChange={onChange}
        checked={checked}
        color={"success"}
      />
    }
    label={<>
      {amenities ? (
        <div className="flex flex-row">
          < Typography variant="interRegular_13" className="overflow-clip text-clip max-h-5 w-[14.2rem]" color={color} fontWeight={fontWeight} >
            {label}
          </Typography >
          {label?.length > 34 ? < Typography variant="interRegular_13" className="overflow-clip text-clip max-h-5 w-3" color={color} fontWeight={fontWeight} >
            ...
          </Typography > : null}
        </div>
      ) : (
        < Typography variant="interRegular_13" color={color} fontWeight={fontWeight} >
          {label}
        </Typography >
      )}
    </>}
    size={size}
    color={color}
  />
);

export default checkbox;
