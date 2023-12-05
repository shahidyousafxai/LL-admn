import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { primaryColor, yellow } from '../../utils/style/GlobalVariables';

const Switched = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 48,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    marginLeft: 6,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor:
          theme.palette.mode === 'dark' ? `${yellow}` : `${yellow}`,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: yellow,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const MuiSwtich = ({
  label,
  onChange,
  value,
  checked,
  name,
  className,
  sx,
}) => {
  const ownStyle = {
    span: {
      fontSize: '13px !important',
    },
  };
  const mergedStyles = {
    ...sx,
    ...ownStyle,
  };
  return (
    <div>
      <FormControlLabel
        control={<Switched sx={{ m: 1 }} />}
        label={label}
        onChange={onChange}
        checked={checked}
        name={name}
        className={`${className} text-[13px]`}
        value={value}
        sx={mergedStyles}
      />
    </div>
  );
};

export default MuiSwtich;
