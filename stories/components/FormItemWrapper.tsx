import React from 'react';
import { FormItemProps } from '../../src/typings/form';

export default function FormItemWrapper(WrappedComponent) {
  const FormItem: React.FC<FormItemProps> = (props) => {
    const { required, label, validateMeta } = props;

    return (
      <div
        style={{
          display: 'flex',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            minWidth: 200,
            textAlign: 'right',
          }}
        >
          {required ? (
            <span
              style={{
                color: 'red',
                marginRight: 4,
              }}
            >
              *
            </span>
          ) : null}
          {label}:
        </div>

        <div
          style={{
            flexGrow: 1,
            marginLeft: 15,
          }}
        >
          <WrappedComponent {...props} />

          {validateMeta.validating ? (
            <p
              style={{
                color: 'orange',
              }}
            >
              校验中...
            </p>
          ) : null}

          {validateMeta.errors.map((errStr, index) => (
            <div
              key={index}
              style={{
                color: 'red',
              }}
            >
              {errStr}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return FormItem;
}
