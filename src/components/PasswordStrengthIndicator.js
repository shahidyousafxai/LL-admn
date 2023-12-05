import React from "react";
import Typography from "./Typography.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const PasswordStrengthIndicator = ({
  validity: { minLength, number, isLowerCase, isUpperCase, isSpecialChar }
}) => {
  return (
    <div className="mt-5">

      <PasswordStrengthIndicatorItem
        isValid={minLength}
        text="At least 8 characters"
      />

      <PasswordStrengthIndicatorItem
        isValid={number}
        text="Contain At least 1 digit"
      />

      <PasswordStrengthIndicatorItem
        isValid={isSpecialChar}
        text="Contain At least 1 special character"
      />

      <PasswordStrengthIndicatorItem
        isValid={isLowerCase}
        text="Contain At least 1 lowercase character"
      />

      <PasswordStrengthIndicatorItem
        isValid={isUpperCase}
        text="Contain At least 1 uppercase character"
      />

    </div>
  );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
  const highlightForCircleIcon =
    isValid && isValid !== "" ? "green" : "secondary";
  const highlightForWarningIcon =
    isValid === false && isValid !== "" ? "danger" : "secondary";
  return (
    <div className="flex flex-row mx-3 mt-1">
      {isValid ? (
        <CheckCircleIcon
          sx={{ fontSize: 15, marginRight: 0.5 }}
          color={highlightForCircleIcon}
        />
      ) : (
        <WarningRoundedIcon
          sx={{ fontSize: 15, marginRight: 0.5 }}
          color={highlightForWarningIcon}
        />
      )}
      <Typography marginTop={0.3} fontSize={11} color="white">{text}</Typography>
    </div>
  );
};

export default PasswordStrengthIndicator;
