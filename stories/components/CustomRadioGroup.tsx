import React from 'react';
import Radio from 'antd/es/radio';
import { FormItemProps } from '../../src/typings/form';

const CustomRadioGroup: React.FC<
  FormItemProps & { options: Array<{ label: string; value: any }> }
> = ({ value, onChange, options }) => {
  return (
    <Radio.Group
      options={options}
      value={value}
      onChange={onChange}
    ></Radio.Group>
  );
};

export default CustomRadioGroup;
