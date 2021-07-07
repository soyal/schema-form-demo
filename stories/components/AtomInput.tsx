import React from 'react';
import Input from 'antd/es/input';
import { FormItemProps } from '../../src/typings/form';

const AtomInput = ({
  value,
  onChange,
  placeholder,
}: FormItemProps<string> & { placeholder?: string }) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    ></Input>
  );
};

export default AtomInput;
