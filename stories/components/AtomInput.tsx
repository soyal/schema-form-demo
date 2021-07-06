import React from 'react';
import Input from 'antd/es/input';
import { FormItemProps } from '../../src/typings/form';

const AtomInput = ({ value, onChange }: FormItemProps<string>) => {
  return (
    <Input
      value={value}
      onChange={(e) => {
        debugger
        onChange(e.target.value);
      }}
    ></Input>
  );
};

export default AtomInput;
