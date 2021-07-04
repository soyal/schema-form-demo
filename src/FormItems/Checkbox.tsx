import React from 'react';
import { FormItemProps } from '@/typings/form';

const Checkbox: React.FC<FormItemProps<string>> = ({ value, onChange }) => {
  const name = 'phone';
  const options = [
    {
      label: '安卓',
      value: 'android',
    },
    {
      label: 'IOS',
      value: 'ios',
    },
    {
      label: '其他',
      value: 'others',
    },
  ];

  return (
    <div>
      <span>phone:</span>
      {options.map((option) => {
        return (
          <p key={option.value}>
            <input
              type="checkbox"
              name={name}
              id={option.value}
              value={option.value}
              checked={value === option.value}
              onChange={e => {
                onChange(e.target.value)
              }}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </p>
        );
      })}
    </div>
  );
};

export default Checkbox;
