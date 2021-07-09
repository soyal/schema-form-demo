import React, { useEffect, useCallback } from 'react';
import { SchemaFormProps } from '@/typings/form';
import FormItemWrapper from './FormItemWrapper';
import Form from 'rc-field-form';
import useSchemaForm from './useSchemaForm';

const SchemaForm = <FormDataType extends {} = any>({
  schema,
  formData, // 用于初始化
  onSubmit,
  children,
  schemaForm: outterSchemaForm,
  component,
}: SchemaFormProps<FormDataType>) => {
  const { formId, formLabel, formItems } = schema;
  const [schemaForm] = useSchemaForm(outterSchemaForm);

  useEffect(() => {
    // 在所有field搜集完成后，强制做一次更新，否则visible、disabled这样的状态处理函数无法获取真实的表单数据
    schemaForm.rcForm.resetFields();
  }, []);

  useEffect(() => {
    if (formData) {
      schemaForm.rcForm.setFieldsValue(formData);
    }
  }, [formData]);

  const handleSubmit = useCallback(() => {
    schemaForm.rcForm
      .validateFields()
      .then(() => {
        console.log("【schema form】submit success")
        onSubmit(schemaForm.getFieldsValue());
      })
      .catch((err) => {
        console.error(err);
      });
  }, [schemaForm]);

  return (
    <Form
      data-msform-id={formId}
      data-msform-label={formLabel}
      onFinish={handleSubmit}
      form={schemaForm.rcForm}
      component={component}
    >
      {formItems.map((formItem) => (
        <FormItemWrapper
          key={formItem.field}
          formItemSchema={formItem}
          formSchema={schema}
          schemaForm={schemaForm}
        />
      ))}

      {children}
    </Form>
  );
};

export default SchemaForm;
