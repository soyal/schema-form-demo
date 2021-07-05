import React, { useEffect, useCallback } from 'react';
import { FormProps } from '@/typings/form';
import FormItemWrapper from './FormItemWrapper';
import Form, { FormComponentProps } from 'antd/es/form';

export type IProps<FormDataType = any> = FormProps<FormDataType> & {
  form: FormComponentProps['form'];
  children: JSX.Element;
};

const SchemaForm = <FormDataType extends {} = any>({
  schema,
  formData, // 用于初始化
  onSubmit,
  form,
  children,
}: IProps<FormDataType> & FormComponentProps) => {
  const { formId, formLabel, formItems } = schema;

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          onSubmit(values);
        }
      });
    },
    [form]
  );

  return (
    <Form
      data-msform-id={formId}
      data-msform-label={formLabel}
      onSubmit={handleSubmit}
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

const FormComponent = Form.create<IProps>()(SchemaForm);

export default FormComponent;
