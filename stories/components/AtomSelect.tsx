import React from 'react';
import Select from 'antd/es/select';
import { FormItemProps } from '../../src/typings/form';

const { Option } = Select;

const AtomSelect: React.FC<
  FormItemProps & {
    options?: { label: string; value: string }[];
  }
> = ({ label, value, onChange, options = [] }) => {
  return (
    <div>
      {label}:
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <Option value={option.value} key={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AtomSelect;
