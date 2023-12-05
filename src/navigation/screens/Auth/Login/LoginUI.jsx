// Library Imports
import React from 'react';

// Local Imports
import AssetsImages from '../../../../assets';
import {
  primaryColor,
  yellow,
  lightGray,
} from '../../../../utils/style/GlobalVariables';
import TextField from '../../../../components/inputField';
import CheckBox from '../../../../components/checkBox';
import TextButton from '../../../../components/textButton';
import Button from '../../../../components/button';

const LoginUI = ({
  onChange,
  state,
  remember,
  setLoginView,
  setRemember,
  onSubmit,
  errors,
  loading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className='sm:w-5/6 md:w-5/6 lg:w-4/6 flex flex-col'
    >
      <img className='h-11 w-40' alt='LUXE LOCKER' src={AssetsImages.logo} />
      <div className='h-72'>
        <p
          style={{ fontFamily: 'Inter-Regular', fontSize: 15 }}
          className='text-white mt-7'
        >
          Log In
        </p>
        <TextField
          label={'Email'}
          onChange={onChange}
          name='email'
          error={errors.name === 'email' && errors}
          value={state.email}
        />
        <TextField
          label={'Password'}
          type={'password'}
          onChange={onChange}
          error={errors.name === 'password' && errors}
          value={state.password}
          name='password'
        />
        <div className='flex flex-row justify-between ml-1 my-4'>
          <CheckBox
            color={lightGray}
            checked={remember}
            onChange={() => setRemember(!remember)}
            label={'Remember Me'}
          />
          <TextButton
            onClick={() => setLoginView(false)}
            label={'Forgot Your Password?'}
          />
        </div>
        <Button
          type={'submit'}
          style={{
            backgroundColor: yellow,
            textTransform: 'none',
            color: primaryColor,
            height: '40px',
            fontFamily: 'Inter-Medium',
            borderRadius: 8,
          }}
          variant='contained'
          fullWidth={true}
          disabled={false}
          loading={loading}
        >
          {!loading && 'Log In'}
        </Button>
      </div>
    </form>
  );
};

export default LoginUI;
