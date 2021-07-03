import React from 'react';
import { FormItemProps } from '@/typings/form';

const Select: React.FC<FormItemProps<string>> = ({ value, onChange }) => {
  return (
    <div>
      <span>fruit:</span>
      <select
        name="fruit"
        id={value}
        onChange={(e) => {
          debugger;
          console.log(e.target.value);
        }}
      >
        <option value="apple">apple</option>
        <option value="pear">pear</option>
        <option value="banana">banana</option>
        <option value="orange">orange</option>
      </select>
    </div>
  );
};

export default Select;
