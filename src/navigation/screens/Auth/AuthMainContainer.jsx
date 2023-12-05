// Library Imports
import React from 'react'

// Local Imports
import Map from './Map/Map'
import LoginForgotMainContainer from './LoginForgotMainContainer'
import { primaryColor } from '../../../utils/style/GlobalVariables'


const MainLoginContainer = () => {
    return (
        <div className='flex'>
            {/* Login Form */}
            <div
                style={{ backgroundColor: primaryColor }}
                className='flex w-1/2 h-screen justify-center items-center'
            >
                <LoginForgotMainContainer />
            </div>

            {/* Map View */}
            <div
                style={{ backgroundColor: primaryColor }}
                className='flex w-1/2 h-screen'
            >
                <Map />
            </div>

        </div>
    )
}

export default MainLoginContainer
