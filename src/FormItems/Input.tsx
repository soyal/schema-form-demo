import React from 'react';
import { FormItemProps } from '@/typings/form';

const Input: React.FC<FormItemProps<string>> = ({ value, onChange }) => {
  return (
    <div>
      <span>name:</span>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
