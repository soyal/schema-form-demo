/**
 * 处于antd form getFieldDecorator与Element之间的数据拦截层
 * 用于处理联动逻辑
 */
import React, { useState } from 'react';
import { FormWrapperProps } from './index';
import { FormItemProps } from '@/typings/form';
import { ListField } from 'rc-field-form/es/List';

interface FormItemInterceptorProps extends FormWrapperProps<any> {
  onChange?: (value: any) => void;
  value?: any;
  disabled?: boolean;
  listField?: ListField;
}

const FormItemInterceptor = React.memo(
  ({
    formItemSchema,
    value,
    onChange,
    formSchema,
    disabled,
    listField,
    form,
  }: FormItemInterceptorProps) => {
    const { component, updateFormValue, label, field } = formItemSchema;
    const { Element, props } = component;
    const { setFieldsValue } = form;
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
          console.log('onChange', onChange)
          onChange && onChange(nValue);
          if (hooks.onChange.length > 0) {
            hooks.onChange.forEach((fn) => {
              let formData = null;
              console.log('list field', listField);
              // if (prefixPath && prefixPath.length > 0) {
              //   // 如果是嵌套的路径，则formData为整个对象
              //   // 比如该字段为songList[0].name，则得到的formData为songList[0]
              //   formData = form.getFieldValue(prefixPath.join('.'));
              // } else {
              //   formData = form.getFieldsValue() as any;
              // }
              // fn(setFieldsValue, nValue, formData, dataStore);
            });
          }
        }}
        // onBlur联动
        onBlur={
          hooks.onBlur.length > 0
            ? (nValue: any) => {
                hooks.onBlur.forEach((fn) => {
                  const formData = form.getFieldsValue() as any;
                  fn(setFieldsValue, nValue, formData, dataStore);
                });
              }
            : undefined
        }
        // onFocus联动
        onFocus={
          hooks.onFocus.length > 0
            ? (nValue: any) => {
                const formData = form.getFieldsValue() as any;
                hooks.onFocus.forEach((fn) => {
                  fn(setFieldsValue, nValue, formData, dataStore);
                });
              }
            : undefined
        }
        {...props}
      ></ResultElement>
    );
  },
  (prevProps, nextProps) => {
    const checkList = ['value', 'disabled', 'formData', 'formSchema'];

    return checkList.some((key) => {
      const propKey = key as keyof FormItemInterceptorProps;
      return prevProps[propKey] !== nextProps[propKey];
    });
  }
);

export default FormItemInterceptor;
