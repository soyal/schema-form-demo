import React from 'react';
import Radio from 'antd/es/radio';
import { FormItemProps } from '../../../src/typings/form';

const PhoneOS: React.FC<FormItemProps> = ({
  value,
  onChange,
}) => {
  return (
    <Radio.Group
      value={value}
      onChange={(nValue) => {
        onChange(nValue);
      }}
    >
      <Radio value="ios">IOS</Radio>
      <Radio value="android">安卓</Radio>
      <Radio value="other">其他</Radio>
    </Radio.Group>
  );
};

export default PhoneOS;
