import React from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import { FormArrayOfWrapper, TFieldStatus } from '@/typings/form';
import FormItemInterceptor from './FormItemInterceptor';
import Form, { FormInstance } from 'rc-field-form';
import { ListField } from 'rc-field-form/es/List';

const { List, Field } = Form;
export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
  listField?: ListField;
  listName?: string; // Form.List组件上注册的name
  form: FormInstance;
  fieldsStatus: TFieldStatus;
}

const FormItemWrapper = <FormDataType extends { [key: string]: any }>(
  props: FormWrapperProps<FormDataType>
) => {
  const {
    formItemSchema,
    formSchema,
    listField,
    form,
    listName,
    fieldsStatus,
  } = props;
  const {
    field,
    rules,
    arrayOf = [],
    initialValue,
    dependencies,
  } = formItemSchema;

  const fieldName = listField ? [listField.name, field] : field; // 局部路径名 ['0', 'albumType']
  const formItemFullName = listName
    ? [listName].concat(fieldName as any[])
    : fieldName; // 完成的路径名，e.g: ['songList', 0, 'albumType']
  const parentFullPath = listField
    ? formItemFullName.slice(0, formItemFullName.length - 1)
    : []; // 上文路径，e.g: ['songList', 0]

  // handle arrayOf
  if (arrayOf && arrayOf.length > 0) {
    const { component } = formItemSchema;
    const { Element, props } = component;

    const ResultElement = Element as React.FC<FormArrayOfWrapper>;
    return (
      <List name={field} initialValue={[]}>
        {(fieldItems, { add, remove }) => {
          const listValue = form.getFieldValue(field) || [];
          return (
            <ResultElement
              {...props}
              add={add}
              remove={remove}
              value={listValue}
            >
              {fieldItems.map((fieldItem) => {
                return (
                  <div key={fieldItem.name}>
                    {arrayOf.map((childrenItemSchema) => (
                      <FormItemWrapper
                        key={childrenItemSchema.field}
                        formItemSchema={childrenItemSchema}
                        formSchema={formSchema}
                        fieldsStatus={fieldsStatus}
                        listField={fieldItem}
                        form={form}
                        listName={field}
                      />
                    ))}
                  </div>
                );
              })}
            </ResultElement>
          );
        }}
      </List>
    );
  }

  // 开始处理渲染内容
  return (
    <Field
      {...listField}
      name={fieldName}
      rules={rules}
      initialValue={initialValue}
      dependencies={dependencies?.map((dep) => parentFullPath.concat(dep))}
    >
      {(control, meta) => (
        <FormItemInterceptor
          {...props}
          {...control}
          validateMeta={meta}
          name={formItemFullName}
          form={form}
          fieldsStatus={fieldsStatus}
        />
      )}
    </Field>
  );
};

export default FormItemWrapper;
