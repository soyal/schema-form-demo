import React from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import { FormComponentProps } from 'antd/es/form';
import FormItemInterceptor from './FormItemInterceptor';

export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
  formData: FormDataType;
  form: FormComponentProps['form'];
}

const FormItemWrapper = <FormDataType extends {}>(
  props: FormWrapperProps<FormDataType>
) => {
  const { formItemSchema, formData, formSchema, form } = props;
  const { dataStore } = formSchema;
  const {
    field,
    visible,
    disabled,
    rules,
    arrayOf,
    defaultValue,
  } = formItemSchema;

  // is visible
  let visibleResult = true;
  if (typeof visible === 'boolean') {
    visibleResult = visible;
  } else if (typeof visible === 'function') {
    visibleResult = visible(formData, dataStore);
  }

  // is disabled
  let disabledResult = false;
  if (typeof disabled === 'boolean') {
    disabledResult = disabled;
  } else if (typeof disabled === 'function') {
    disabledResult = disabled(formData, dataStore);
  }

  // if  invisible, do not render
  if (!visibleResult) return null;

  // 开始处理渲染内容
  const { getFieldDecorator } = form;

  return getFieldDecorator(field, {
    rules,
  })(<FormItemInterceptor {...props} />) as JSX.Element;
};

export default FormItemWrapper;
