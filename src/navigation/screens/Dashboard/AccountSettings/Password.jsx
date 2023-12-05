import React, { useState } from 'react';

// Local Imports
import Button from '../../../../components/button'
import TextField from '../../../../components/inputField.js'
import PasswordStrengthIndicator from '../../../../components/PasswordStrengthIndicator';
import { gray, secondaryColor, yellow, primaryColor } from '../../../../utils/style/GlobalVariables'

const Password = ({
    state, password, onChangePwd, onSavePress, errors, pwdLoading,
    resetErrors, checkEmpty, pwdChangeSuccess, currentPwdRef, pwdValidation
}) => {

    const [pwdFocus, setPwdFocus] = useState(false);

    return (
        <div id='Password' className='w-[90%] -mt-5 py-5'>
            <div style={{ backgroundColor: primaryColor, boxShadow: state === 2 && "0px 0px 5px -2px #CDA950" }}
                className="w-11/12 rounded-md my-5 p-8 text-sm text-white">
                <div className="flex items-start justify-between w-full gap-5">
                    {/* Left Portion */}
                    <div className="w-1/2">
                        <p className="mb-1" style={{ fontFamily: 'Inter-Medium', fontSize: 13 }}>
                            Password
                        </p>
                        <p style={{ fontFamily: 'Inter-Regular', fontSize: 11, color: gray }}>
                            After a successful password update, you will be redirected to the
                            login page where you can log in with your new password.
                        </p>
                    </div>

                    {/* Right Portion */}
                    <div className="flex flex-col gap-5 w-1/2">

                        <div className="flex flex-col gap-2 w-full">
                            <TextField accountSetting className={`mt-0 ${password.current && '-mr-5'}`} label={'Current Password*'}
                                type="password" name="current" value={password.current} onChange={onChangePwd}
                                error={errors.name === 'currentPassword' && errors}
                                inputRef={currentPwdRef} onFocus={() => { resetErrors(); setPwdFocus(false) }}
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <TextField accountSetting className={`mt-0 ${password.new && '-mr-5'}`}
                                label={'New Password*'} type="password" name="new" value={password.new}
                                error={errors.name === 'password' && errors} onChange={onChangePwd}
                                onFocus={() => { resetErrors(); setPwdFocus(true) }}
                            />
                        </div>

                        {pwdFocus && password.new.length > 0 && (
                            <div className="-mt-5">
                                <PasswordStrengthIndicator validity={pwdValidation} />
                            </div>
                        )}

                        <div className="flex flex-col gap-2 w-full">
                            <TextField accountSetting className={`mt-0 ${password.confirm && '-mr-5'}`}
                                type="password" name="confirm" value={password.confirm} onChange={onChangePwd}
                                error={errors.name === 'notMatched' && errors} label={'Confirm New Password*'}
                                onFocus={() => { resetErrors(); setPwdFocus(false) }}
                            />
                        </div>

                        {/* Update Password Button */}
                        <div className="flex flex-col items-end pt-5 mb-5">
                            <Button
                                type={'submit'}
                                style={{
                                    backgroundColor: pwdLoading ? yellow : checkEmpty() ? secondaryColor : yellow,
                                    textTransform: 'none',
                                    height: "40px",
                                    width: '160px',
                                    fontFamily: 'Inter-Medium',
                                    borderRadius: 8
                                }}
                                variant='contained'
                                fullWidth={true}
                                disabled={checkEmpty()}
                                loading={pwdLoading}
                                onClick={() => onSavePress()}
                            >
                                {!pwdLoading &&
                                    <p style={{
                                        fontFamily: 'Inter-Medium', fontSize: 13,
                                        color: checkEmpty() ? gray : primaryColor,
                                    }}>
                                        Update Password
                                    </p>}
                            </Button>
                            {pwdChangeSuccess && <span
                                className='text-green-700 mt-5 h-8 px-2 py-[6px] rounded-lg'
                                style={{ fontFamily: 'Inter-Medium', fontSize: 13, backgroundColor: 'rgba(73, 204, 144, .1)' }}>
                                Password has been changed successfully
                            </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Password;