import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './style.css';
import { secondaryColor, red, white, gray } from '../utils/style/GlobalVariables'
import { Styles } from '../utils/style/GlobalStyles';

const TextField = ({
    className, label, value, type, error, name, height, textArea, disabled,
    addUser, editUser, accountSetting, onFocus, inputRef, ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)

    return <div className={`mt-5 ${className} `}>
        <p style={Styles.smallTextWhite} className={` mb-1 ${error && `${red}`}`}>
            {label}
        </p>
        <div className={`flex flex-row items-center justify-between`}>
            {!textArea && <input
                className={`${!height && 'h-11'} ${height && height} interRegular_13 w-full rounded-lg pl-3
                 ${error && '!border-2 p-0 rounded-lg !border-red-900'}
                 bg-[${secondaryColor}] ${type === 'date' ? 'text-[#85878D]' : `text-white`}`}
                type={showPassword ? 'text' : type}
                ref={inputRef}
                name={name}
                value={value}
                onFocus={onFocus}
                autoComplete="off"
                disabled={disabled}
                {...props}
            />}
            {textArea && <textarea
                className={`${!height && 'h-11'} ${height && height} 
                interRegular_13 w-full rounded-lg p-3 
                ${error && '!border-2 p-0 rounded-lg !border-red-900'}
                bg-[${secondaryColor}] text-white resize-none`}
                type={showPassword ? 'text' : type}
                ref={inputRef}
                name={name}
                value={value}
                onFocus={onFocus}
                autoComplete="off"
                {...props}
            > </textarea>}
            {(type === "password" && value !== '') && (
                <span className={`${accountSetting ? 'relative' : 'absolute'} absolute cursor-pointer 
                    ${addUser ? 'left-[85%]' : editUser ? 'left-[93%]' : accountSetting ? 'left-[-8%]' : 'left-[40%]'}`}>
                    {showPassword ? (
                        <div onClick={() => setShowPassword(false)}>
                            <VisibilityIcon color='grey' fontSize='small' />
                        </div>
                    ) : (
                        <div onClick={() => setShowPassword(true)}>
                            <VisibilityOffIcon color='grey' fontSize='small' />
                        </div>
                    )}
                </span>
            )}
        </div>
        {(error && !error?.msg) ? <span className='errorText_12' >{error}</span> : ''}
        {error?.msg ? <span className='errorText_12'>{error?.msg}</span> : ''}
    </div>
}

export default TextField