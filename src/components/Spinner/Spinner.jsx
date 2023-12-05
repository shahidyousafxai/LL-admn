import React from "react";
import "./Spinner.css";

export const SpinnerHOC =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) =>
    isLoading ? (
      <div className="SpinnerOverlay">
        <div className="SpinnerContainer" />
      </div>
    ) : (
      <WrappedComponent {...otherProps}></WrappedComponent>
    );

export const Spinner = () => {
  return (
    <div className="SpinnerOverlay">
      <div className="SpinnerContainer" />
    </div>
  );
};
export const InsideSpinner = () => {
  return (
    <div style={{ height: window.innerHeight*0.6}} className="SpinnerOverlay2">
      <div className="SpinnerContainer" />
    </div>
  );
};
