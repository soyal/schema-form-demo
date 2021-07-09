import React from 'react';
import Input from 'antd/es/input';
import { FormItemProps } from '../../../src/typings/form';

const PhoneNum: React.FC<FormItemProps & { placeholder?: string }> = ({
  value,
  onChange,
  formData,
  placeholder,
}) => {
  return (
    <div>
      <span>{formData['phoneos']}</span>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></Input>
    </div>
  );
};

export default PhoneNum;
