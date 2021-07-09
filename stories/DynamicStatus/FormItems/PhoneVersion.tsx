import React from 'react';
import Input from 'antd/es/input';
import { FormItemProps } from '../../../src';

const PhoneVersion: React.FC<FormItemProps & { placeholder?: string }> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Input value={value} onChange={onChange} placeholder={placeholder}></Input>
  );
};

export default PhoneVersion;
