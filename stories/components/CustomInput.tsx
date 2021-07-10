import React from 'react';
import { FormItemProps } from '../../src/typings/form';
import Input from 'antd/es/input';

const CustomInput: React.FC<FormItemProps & { placeholder?: string }> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Input placeholder={placeholder} value={value} onChange={onChange}></Input>
  );
};

export default CustomInput;
