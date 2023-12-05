// Library Imports
import * as yup from 'yup'
import { phone as phonevalidator } from "phone";


//************************* Password Validations *******************************//
export const validatePassword = async (password, setErrors) => {
    let passwordSchema = yup.object().shape({
        password: yup
            .string()
            .min(8, 'The Password is not strong enough')
            .matches(
                /\d/,
                'The Password must contain number',
            )
            .matches(
                /[a-z]/,
                'The Password must contain lowercase letter',
            )
            .matches(
                /[A-Z]/,
                'The Password must contain uppercase letter',
            )
            .matches(
                /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
                'The Password must contain special character',
            )
            .required('Password is required'),
    });

    let valid = await passwordSchema.validate({ password }).catch(error => {
        return error;
    });

    if (valid.password) {
        return true;
    } else {
        setErrors({
            name: 'password',
            msg: valid.message
        });
        return false;
    }

}

//************************* Email Validations *******************************//
export const validateEmail = async (email, setErrors) => {
    let emailSchema = yup.object().shape({
        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),
    });

    let valid = await emailSchema.validate({ email }).catch(error => {
        return error;
    });

    if (valid.email) {
        return true;
    } else {
        setErrors({
            name: 'email',
            msg: valid.message
        });
        return false;
    }

}


//*************************  For Comparing Password and New Password *******************************//

export const compareStrings = (str1, str2, setErrors) => {

    if (str1 !== str2) {
        setErrors({
            name: 'notMatched',
            msg: 'Passwords don’t match.'
        })
        return false;
    } else {
        return true;
    }

}

//*************************  Camelize String *******************************//

export const camalize = (str) => {
    return str?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const toUpperCase = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
}

//*************************  Email End With .com *******************************//

export const emailEndWithCom = (email) => {
    let endWithCom = /^\w+([-+.']\w+)*@[A-Za-z\d]+\.com$/;
    return endWithCom.test(email);
}

//*************************  Validate Phone Number *******************************//

export const validatePhone = (number) => {
    let isContactValid = phonevalidator(number).isValid;
    return isContactValid;
}

//*************************  Validate User Input According To Type *******************************//

export const validateInput = (name, text) => {
    // Only Accept Characters
    let characters = /^[a-zA-Z]*$/;
    // Only Accept Numbers
    let numbers = /^[0-9+]*$/;
    // Only Accept Characters And Numbers
    let alphaNum = /^[A-Za-z0-9_]*$/;

    if (name === "fName" || name === "lName") {
        return characters.test(text);
    } else if (name === "userName" || name === "zipCode") {
        return alphaNum.test(text);
    } else if (name === "contactNumber" || name === "phone") {
        return numbers.test(text);
    } else {
        return true;
    }
}

//*************************  Validate User Input For Password *******************************//

export const validatePasswordInput = (pass, setPwdValidation) => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    const uppercasePassword = uppercaseRegExp.test(pass);
    const lowercasePassword = lowercaseRegExp.test(pass);
    const digitsPassword = digitsRegExp.test(pass);
    const specialCharPassword = specialCharRegExp.test(pass);
    const minLengthPassword = minLengthRegExp.test(pass);

    return setPwdValidation({
        minLength: minLengthPassword,
        number: digitsPassword,
        isLowerCase: lowercasePassword,
        isUpperCase: uppercasePassword,
        isSpecialChar: specialCharPassword,
    })
}