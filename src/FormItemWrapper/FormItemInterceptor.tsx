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
  disabled?: boolean;
}

class FormItemInterceptor<FormDataType> extends React.Component<
  FormItemInterceptorProps<FormDataType>
> {
  shouldComponentUpdate(nextProps: FormItemInterceptorProps<FormDataType>) {
    const checkList = ['value', 'disabled', 'formData', 'formSchema'];

    return checkList.some((key) => {
      const propKey = key as keyof FormItemInterceptorProps<FormDataType>;
      return this.props[propKey] !== nextProps[propKey];
    });
  }

  render() {
    const {
      form,
      formItemSchema,
      value,
      onChange,
      formSchema,
      disabled,
    } = this.props;

    const { component, updateFormValue, label, field } = formItemSchema;
    const { Element, props } = component;
    const { setFieldsValue } = form;
    const { dataStore } = formSchema;

    // 提取changeFormValue的类型
    type changerType = Exclude<
      typeof updateFormValue,
      undefined
    >[0]['updator'];

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
    console.log('render', field);
    return (
      <Element
        disabled={disabled}
        value={value}
        label={label}
        field={field}
        // onChange联动
        onChange={(nValue: any) => {
          onChange && onChange(nValue);
          if (hooks.onChange.length > 0) {
            hooks.onChange.forEach((fn) => {
              const formData = form.getFieldsValue() as any;
              fn(setFieldsValue, nValue, formData, dataStore);
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
      ></Element>
    );
  }
}

export default FormItemInterceptor;
