import React, { useState, useEffect, useCallback } from 'react';
import { FormProps } from '@/typings/form';
import FormItemWrapper from './FormItemWrapper';
import Form, { FormComponentProps } from 'antd/es/form';
import './index.css';

export interface IProps<FormDataType = any> extends FormProps<FormDataType> {
  form: FormComponentProps['form'];
}

const SchemaForm = <FormDataType extends {} = any>({
  schema,
  formData,
  onSubmit,
  form,
}: IProps<FormDataType> & FormComponentProps) => {
  const { formId, formLabel, formItems } = schema;

  const [localFormData, setLocalFormData] = useState<FormDataType>(formData);

  useEffect(() => {
    setLocalFormData(formData);
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
          formData={localFormData}
        />
      ))}
    </Form>
  );
};

const FormComponent = Form.create<IProps>()(SchemaForm);

export default FormComponent;
