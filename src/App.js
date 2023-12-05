// Library Imports
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import { BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


// Local Imports
import {
    primaryColor, disabledButton, disabledButtonText,
    danger, gray, yellow, white, green, lightGray,
} from './utils/style/GlobalVariables'
import { RootRoutes } from './navigation/routes/rootRoutes'
import './App.css'
import './assets/fonts.css'
import ApiServices from './utils/network/apiServices'
import ApiController from './utils/network/api'
import { states } from './redux/reducers/statesReducer'

// Global
const theme = createTheme({
    palette: {
        primary: { main: primaryColor },
        secondary: { main: gray },
        success: { main: yellow },
        green: { main: green },
        grey: { main: lightGray },
        danger: { main: danger },
        info: { main: white },
        action: {
            disabledBackground: disabledButton,
            disabled: disabledButtonText,
        },
    },
    typography: {
        fontFamily: ["Inter-Regular", "Inter-Medium"].join(","),
        interRegular_13: {
            fontFamily: 'Inter-Regular',
            fontSize: "13px"
        },
    }
})

function App() {

    const dispatch = useDispatch()

    // Getting Auth User From Redux Store
    const authUser = useSelector((state) => state?.authUser?.authUser)
    // Setting Token For Authorize Network Call
    ApiServices.getAuthorization(authUser?.token)

    // Getting States And Cities From Redux Store
    const statesArray = useSelector((state) => state?.states?.states)
    // Calling API If Redux Has Null Value
    if (statesArray === null) {
        ApiController.fetchStatesCall((response) => {
            if (response.success) {
                dispatch(states(response.data))
            }
        })
    }


    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <RootRoutes user={authUser} />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
