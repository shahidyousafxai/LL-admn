import React from 'react';
import './Radio.css';

const Radio = ({ label, checked, onChange, name, value }) => (
  <label id='radio'>
    <input
      type='radio'
      name={name}
      onChange={onChange}
      checked={checked}
      value={value}
    />
    <span style={{ color: 'white', fontFamily: 'Inter-Regular', fontSize: 11 }}>
      {label}
    </span>
  </label>
);

export default Radio;
