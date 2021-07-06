import React from 'react';
import { FormArrayOfWrapper } from '../../src/typings/form';

const FieldWrapper = (props: FormArrayOfWrapper) => {
  const { children, onAdd, onDel } = props;
  return (
    <div>
      <div>{children}</div>
      <div>
        <span
          onClick={() => {
            onAdd({});
          }}
        >
          添加子项
        </span>

        <span
          style={{
            color: 'red',
          }}
          onClick={() => {
            onDel(children.length - 1);
          }}
        >
          删除最后一项
        </span>
      </div>
    </div>
  );
};

export default FieldWrapper;
