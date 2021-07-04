import React from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import { FormComponentProps } from 'antd/es/form';
import FormItemInterceptor from './FormItemInterceptor';

export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
  form: FormComponentProps['form'];
}

const FormItemWrapper = <FormDataType extends { [key: string]: any }>(
  props: FormWrapperProps<FormDataType>
) => {
  const { formItemSchema, formSchema, form } = props;
  const { dataStore } = formSchema;
  const { field, visible, disabled, rules, arrayOf } = formItemSchema;

  // is visible
  let visibleResult = true;
  if (typeof visible === 'boolean') {
    visibleResult = visible;
  } else if (typeof visible === 'function') {
    visibleResult = visible(
      form.getFieldValue(field),
      form.getFieldsValue(),
      dataStore
    );
  }

  // is disabled
  let disabledResult = false;
  if (typeof disabled === 'boolean') {
    disabledResult = disabled;
  } else if (typeof disabled === 'function') {
    disabledResult = disabled(
      form.getFieldValue(field),
      form.getFieldsValue(),
      dataStore
    );
  }

  // if  invisible, do not render
  if (!visibleResult) return null;

  // 开始处理渲染内容
  const { getFieldDecorator } = form;

  return getFieldDecorator(field, {
    rules,
  })(
    <FormItemInterceptor {...props} disabled={disabledResult} />
  ) as JSX.Element;
};

export default FormItemWrapper;
