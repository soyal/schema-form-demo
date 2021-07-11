import React from 'react';
import { FormItemProps } from '../../src/typings/form';
import Input from 'antd/es/input';

const CustomInput: React.FC<
  FormItemProps & { placeholder?: string; type?: string }
> = ({ value, onChange, placeholder, disabled, type }) => {
  return (
    <Input
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
    ></Input>
  );
};

export default CustomInput;
