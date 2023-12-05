// Library Imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

// Local Imports
import LoginUI from './LoginUI'
import ApiController from '../../../../utils/network/api';
import { validateEmail } from '../../../../utils/validations/localValidations';
import { authUser } from '../../../../redux/reducers/authReducer';



const Login = ({ setLoginView }) => {

  //***** Const & Variables *****//

  const navigate = useNavigate();
  const dispatch = useDispatch()
  let response;

  //***** States *****//

  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    msg: ''
  })
  const [remember, setRemember] = useState(false)


  //***** useEffect *****//
  useEffect(() => {
    // For expiring session when user comes back to login screen
    if (!response) {
      dispatch(authUser(null))
    }
    setCookieData();
    // eslint-disable-next-line
  }, []);

  //***** Methods *****//

  const createPayload = () => {
    let payload = {
      email: state.email.toLocaleLowerCase().trim(),
      password: state.password,
      is_admin: true
    }
    return payload;
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    rememberMeButtonChecked()

    if (await validateEmail(state.email.toLocaleLowerCase().trim(), setErrors)) {

      if (state.password !== '') {
        // API Call
        ApiController.loginCall(createPayload(), (response) => {
          // response success
          if (response?.success) {
            response = response?.data;
            dispatch(authUser(response))
            setLoading(false)
            navigate("/users")
          }
          // response failed 
          else {
            if (response?.data?.includes("email")) {
              setErrors({
                name: 'email',
                msg: response?.data
              })
              setLoading(false)
            } else {
              setErrors({
                name: 'password',
                msg: response?.data
              })
              setLoading(false)
            }
          }
        });
        // if Password field is empty
      } else {
        setErrors({
          name: 'password',
          msg: 'Password is required'
        });
        return setLoading(false);
      }
      // if Email not valid
    } else {
      return setLoading(false);
    }

  }

  // onChange Email & Password 
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    setErrors({ name: '', msg: '' })
  }


  //************************* Remember Me Functions Start *******************************//

  // Remember Me
  const rememberMeButtonChecked = () => {
    if (remember) {
      document.cookie = `myEmail=${state.email};path=http://luxelocker.herokuapp.com/`;
      document.cookie = `myPassword=${state.password};path=http://luxelocker.herokuapp.com/`;
    } else {
      document.cookie = `myEmail=${''};path=http://luxelocker.herokuapp.com/`;
      document.cookie = `myPassword=${''};path=http://luxelocker.herokuapp.com/`;
    }
  };
  // Get Data From Cookies
  const getCookie = (key) => {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  // Set Data From Cookies To States
  const setCookieData = () => {
    let email = getCookie("myEmail");
    let password = getCookie("myPassword");
    setState({
      email: email,
      password: password,
    });
  };

  //************************* Remember Me Functions End *******************************//



  return (
    <LoginUI
      onChange={handleChange}
      onSubmit={handleSubmit}
      setRemember={setRemember}
      state={state}
      errors={errors}
      loading={loading}
      remember={remember}
      // onPress Forgot Password
      setLoginView={setLoginView}
    />
  )
}

export default Login
