import React, { useEffect } from 'react';
import { SchemaFormProps } from '@/typings/form';
import FormItemWrapper from './FormItemWrapper';
import Form from 'rc-field-form';
import useSchemaForm from './useSchemaForm';
import { hasDependencyCircle } from './util';
import { log } from './invariant';

const SchemaForm = <FormDataType extends {} = any>({
  schema,
  formData, // 用于初始化
  children,
  schemaForm: outterSchemaForm,
  component,
  disableValidate = false,
}: SchemaFormProps<FormDataType>) => {
  const { formId, formLabel, formItems } = schema;
  const [schemaForm] = useSchemaForm(outterSchemaForm);

  useEffect(() => {
    // 在所有field搜集完成后，强制做一次更新，否则visible、disabled这样的状态处理函数无法获取真实的表单数据(因为各个field在首次render的时候，拿到的formData是空的)
    schemaForm.rcForm.resetFields();

    // 检测是否含有依赖循环
    const paths = hasDependencyCircle(schema.formItems);
    if (paths) {
      log.error(
        `there is a dependency circle: ${paths.join(
          ' -> '
        )} in your schema, it may cause some error`
      );
    }
  }, []);

  useEffect(() => {
    if (formData) {
      schemaForm.rcForm.setFieldsValue(formData);
    }
  }, [formData]);

  return (
    <Form
      data-msform-id={formId}
      data-msform-label={formLabel}
      form={schemaForm.rcForm}
      component={component}
    >
      {formItems.map((formItem) => (
        <FormItemWrapper
          key={formItem.field}
          formItemSchema={formItem}
          formSchema={schema}
          schemaForm={schemaForm}
          disableValidate={disableValidate}
        />
      ))}

      {children}
    </Form>
  );
};

export default SchemaForm;
