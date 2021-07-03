import React from 'react';
import { FormItemProps } from '@/typings/form'

const Checkbox: React.FC<FormItemProps<string>> = ({ value, onChange }) => {
  return (
    <div>
      <span>phone:</span>
      <p>
        <input type="checkbox" name="phone" id="android" value="android" />
        <label htmlFor="android">android</label>
      </p>

      <p>
        <input type="checkbox" name="phone" id="ios" value="ios" />
        <label htmlFor="ios">android</label>
      </p>

      <p>
        <input type="checkbox" name="phone" id="other" value="other" />
        <label htmlFor="other">other</label>
      </p>
    </div>
  );
};

export default Checkbox;
