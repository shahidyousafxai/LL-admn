import React from "react";
import { primaryColor, yellow } from "../utils/style/GlobalVariables";
import Button from "./button";

const ServerError = ({reCallListing}) => (
  <div className='mt-[10%] ml-[7.5%]'>
    <p className='flex flex-row text-white text-4xl'>Server Error</p>
    <p className='flex flex-row text-white text-xl my-5'>
      We're sorry! The server has encountered an internal error and was
      unable to complete your request. Please try again.
    </p>
    <Button
      height={38}
      style={{
        backgroundColor: yellow,
        color: primaryColor,
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        textTransform: 'none',
        width: '140px',
        borderRadius: 8
      }}
      onClick={() => reCallListing()}
      component="span"
      variant="contained"
    >
      <p style={{ fontFamily: 'Inter-Medium', fontSize: 13 }}>Try Again</p>
    </Button>
  </div>
);

export default ServerError;