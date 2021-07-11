import React from 'react';
import { FormItemProps } from '../../src/typings/form';
import Input from 'antd/es/input';

const CustomInput: React.FC<FormItemProps & { placeholder?: string }> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <Input
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></Input>
  );
};

export default CustomInput;
