import React from 'react';
import { FormItemProps } from '../../src/typings/form';
import Input from 'antd/es/input';

const CustomInput: React.FC<
  FormItemProps & { placeholder?: string; type?: string }
> = ({ value, onChange, placeholder, disabled, type, onBlur, onFocus }) => {
  return (
    <Input
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      type={type}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
    ></Input>
  );
};

export default CustomInput;
