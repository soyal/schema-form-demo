import React, { useEffect, useCallback, useRef } from 'react';
import { FormProps } from '@/typings/form';
import FormItemWrapper from './FormItemWrapper';
import Form, { FormInstance, useForm } from 'rc-field-form';
import { TFieldStatus } from '@/typings/form';
import { filterInvisibleFields } from './util';

export type IProps<FormDataType = any> = FormProps<FormDataType> & {
  children: JSX.Element;
  form?: FormInstance
  component?: string | false | React.ComponentClass<any, any> | React.FC<any>; // 可以自定义form的外层的标签，默认渲染<form>，可自定义，方便用户将SchemaForm嵌套在其他表单中
};

const SchemaForm = <FormDataType extends {} = any>({
  schema,
  formData, // 用于初始化
  onSubmit,
  children,
  form,
  component
}: IProps<FormDataType>) => {
  const { formId, formLabel, formItems } = schema;
  const [rcForm] = useForm(form);
  const refConstant = useRef<{
    fieldsStatus: TFieldStatus;
  }>({
    fieldsStatus: {},
  }); // 用于搜集各个组件的信息，如visible, disabled，用于后续的处理

  useEffect(() => {
    // 在所有field搜集完成后，强制做一次更新，否则visible、disabled这样的状态处理函数无法获取真实的表单数据
    rcForm.resetFields();
  }, []);

  useEffect(() => {
    if (formData) {
      rcForm.setFieldsValue(formData);
    }
  }, [formData]);

  const handleSubmit = useCallback(() => {
    rcForm.validateFields().then(
      (values) => {
        const { fieldsStatus } = refConstant.current;
        onSubmit(filterInvisibleFields(values, fieldsStatus));
      },
      (err) => {
        console.error(err);
      }
    );
  }, [rcForm]);

  return (
    <Form
      data-msform-id={formId}
      data-msform-label={formLabel}
      onFinish={handleSubmit}
      form={rcForm}
      component={component}
    >
      {formItems.map((formItem) => (
        <FormItemWrapper
          key={formItem.field}
          formItemSchema={formItem}
          formSchema={schema}
          fieldsStatus={refConstant.current.fieldsStatus}
          form={rcForm}
        />
      ))}

      {children}
    </Form>
  );
};

export default SchemaForm;
