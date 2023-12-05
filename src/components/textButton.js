import React from "react";
import { yellow } from "../utils/style/GlobalVariables";
import Typography from "./Typography";
import Button from "./button";

const textButton = ({
  label,
  onClick
}) => (
  <div className="flex flex-row justify-center items-center">
    <Button
      variant="text"
      onClick={onClick}
      style={{
        textTransform: 'none',
        color: yellow,
        fontFamily: 'Inter-Medium'
      }}
    >
      <Typography style={{ fontFamily: 'Inter-Regular' }} fontSize={13} color={yellow}>
        {label}
      </Typography>
    </Button>
  </div >
);

export default textButton;