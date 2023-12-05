// Library Imports
import React, { useState } from 'react'

// Local Imports
import Login from './Login/Login'
import ForgotPassword from './ForgotPassword/forgotPassword'


const LoginForgotMainContainer = () => {

    const [loginView, setLoginView] = useState(true);

    return (
        <div className='flex w-screen h-screen justify-center items-center'>

            {/* Login Form */}
            {loginView ? (
                <Login setLoginView={setLoginView} />
            ) : (<ForgotPassword setLoginView={setLoginView} />)}

        </div>
    )
}

export default LoginForgotMainContainer
