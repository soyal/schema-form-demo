import React from 'react';
import { FormArrayOfWrapper } from '../../src/typings/form';

const FieldWrapper: React.FC<FormArrayOfWrapper> = (props) => {
  const { children, add, remove } = props;
  return (
    <div>
      <div>{children}</div>
      <div>
        <span
          onClick={() => {
            add({});
          }}
        >
          添加子项
        </span>

        <span
          style={{
            color: 'red',
          }}
          onClick={() => {
            remove(children.length - 1);
          }}
        >
          删除最后一项
        </span>
      </div>
    </div>
  );
};

export default FieldWrapper;
