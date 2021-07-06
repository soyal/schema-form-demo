import React, { useEffect, useCallback } from 'react';
import { FormProps } from '@/typings/form';
import FormItemWrapper from './FormItemWrapper';
import Form, { useForm } from 'rc-field-form';

export type IProps<FormDataType = any> = FormProps<FormDataType> & {
  children: JSX.Element;
};

const SchemaForm = <FormDataType extends {} = any>({
  schema,
  formData, // 用于初始化
  onSubmit,
  children,
}: IProps<FormDataType>) => {
  const { formId, formLabel, formItems } = schema;
  const [form] = useForm();

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const handleSubmit = useCallback(
    () => {
      form.validateFields().then(
        (values) => {
          console.log('Received values of form: ', values);
          onSubmit(values);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    [form]
  );

  return (
    <Form
      data-msform-id={formId}
      data-msform-label={formLabel}
      onFinish={handleSubmit}
      form={form}
    >
      {formItems.map((formItem) => (
        <FormItemWrapper
          key={formItem.field}
          formItemSchema={formItem}
          formSchema={schema}
          form={form}
        />
      ))}

      {children}
    </Form>
  );
};

export default SchemaForm;
