/**
 * 处于antd form getFieldDecorator与Element之间的数据拦截层
 * 用于处理联动逻辑
 */
import React, { useState } from 'react';
import { FormWrapperProps } from './index';
import { FormItemProps } from '@/typings/form';

interface FormItemInterceptorProps extends FormWrapperProps<any> {
  onChange?: (value: any) => void;
  value?: any;
  disabled?: boolean;
  name: string | (string | number)[];
}

const FormItemInterceptor = ({
  formItemSchema,
  value,
  onChange,
  formSchema,
  disabled,
  name,
  form,
}: FormItemInterceptorProps) => {
  const { component, updateFormValue, label, field } = formItemSchema;
  const { Element, props } = component;
  const { setFieldsValue, resetFields } = form;
  const { dataStore } = formSchema;

  // 提取changeFormValue的类型
  type changerType = Exclude<typeof updateFormValue, undefined>[0]['updator'];

  const hooks = {
    onChange: [] as changerType[],
    onBlur: [] as changerType[],
    onFocus: [] as changerType[],
  };

  updateFormValue?.forEach((updateDesc) => {
    const { timing, updator } = updateDesc;
    if (timing === 'onChange') {
      hooks['onChange'].push(updator);
    } else if (timing === 'onBlur') {
      hooks['onBlur'].push(updator);
    } else if (timing === 'onFocus') {
      hooks['onFocus'].push(updator);
    }
  });

  const ResultElement = Element as React.FC<FormItemProps>;

  return (
    <ResultElement
      disabled={disabled}
      value={value}
      label={label}
      field={field}
      // onChange联动
      onChange={(nValue: any) => {
        onChange && onChange(nValue);
        if (hooks.onChange.length > 0) {
          hooks.onChange.forEach((fn) => {
            let formData = null;
            if (typeof name === 'string') {
              formData = form.getFieldsValue();
            } else {
              // 当在嵌套的子表单内时候，formData为子表单的内容
              const parentNamePath = name.slice(0, name.length - 1);
              formData = form.getFieldValue(parentNamePath);
            }

            fn({ setFieldsValue, resetFields }, nValue, formData, dataStore);
          });
        }
      }}
      {...props}
    ></ResultElement>
  );
};

export default FormItemInterceptor;
