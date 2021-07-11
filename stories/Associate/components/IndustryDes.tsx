import React from 'react';
import Input from 'antd/es/input';
import { FormItemProps } from '../../../src/typings/form';

const IndustryDesc: React.FC<FormItemProps & { placeholder?: string }> = ({
  value,
  onChange,
  formData,
  placeholder,
}) => {
  return (
    <Input.Group compact>
      <Input
        style={{ width: '10%' }}
        disabled
        value={formData['industry']}
      ></Input>
      <Input
        style={{ width: '70%' }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></Input>
    </Input.Group>
  );
};

export default IndustryDesc;
