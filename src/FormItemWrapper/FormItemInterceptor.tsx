/**
 * 处于antd form getFieldDecorator与Element之间的数据拦截层
 * 用于处理联动逻辑
 */
import React from 'react';
import { FormWrapperProps } from './index';

interface FormItemInterceptorProps<FormDataType>
  extends FormWrapperProps<FormDataType> {
  onChange?: (value: any) => void;
  value?: any;
}

const FormItemInterceptor = <FormDataType extends {}>({
  form,
  formItemSchema,
  formData,
  value,
  onChange,
  formSchema,
}: FormItemInterceptorProps<FormDataType>) => {
  const { component, updateFormValue } = formItemSchema;
  const { Element, props } = component;
  const { setFieldsValue } = form;
  const { dataStore } = formSchema;

  // 提取changeFormValue的类型
  type changerType = Exclude<
    typeof updateFormValue,
    undefined
  >[0]['changeFormValue'];

  const hooks = {
    onChange: [] as changerType[],
    onBlur: [] as changerType[],
    onFocus: [] as changerType[],
  };

  updateFormValue?.forEach((updator) => {
    const { timing, changeFormValue } = updator;
    if (timing === 'onChange') {
      hooks['onChange'].push(changeFormValue);
    } else if (timing === 'onBlur') {
      hooks['onBlur'].push(changeFormValue);
    } else if (timing === 'onFocus') {
      hooks['onFocus'].push(changeFormValue);
    }
  });

  return (
    <Element
      value={value}
      // onChange联动
      onChange={(nValue: any) => {
        onChange && onChange(nValue);
        if (hooks.onChange.length > 0) {
          hooks.onChange.forEach((fn) => {
            fn(setFieldsValue, nValue, formData, dataStore);
          });
        }
      }}
      // onBlur联动
      onBlur={hooks.onBlur.length > 0 ? (nValue: any) => {
        hooks.onBlur.forEach((fn) => {
          fn(setFieldsValue, nValue, formData, dataStore);
        });
      } : undefined}
      // onFocus联动
      onFocus={hooks.onFocus.length > 0 ? (nValue: any) => {
        hooks.onFocus.forEach((fn) => {
          fn(setFieldsValue, nValue, formData, dataStore);
        });
      } : undefined}
      {...props}
    ></Element>
  );
};

export default FormItemInterceptor;
