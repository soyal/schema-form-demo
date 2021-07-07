import React from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import { FormArrayOfWrapper } from '@/typings/form';
import FormItemInterceptor from './FormItemInterceptor';
import Form, { FormInstance } from 'rc-field-form';
import { ListField } from 'rc-field-form/es/List';
import { getFormData } from './util';

const { List, Field } = Form;
export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
  listField?: ListField;
  listName?: string; // Form.List组件上注册的name
  form: FormInstance;
}

const FormItemWrapper = <FormDataType extends { [key: string]: any }>(
  props: FormWrapperProps<FormDataType>
) => {
  const { formItemSchema, formSchema, listField, form, listName } = props;
  const { dataStore } = formSchema;
  const {
    field,
    visible,
    disabled,
    rules,
    arrayOf = [],
    initialValue,
  } = formItemSchema;

  const fieldName = listField ? [listField.name, field] : field; // 局部路径名 0.albumType
  const formItemFullName = listName
    ? [listName].concat(fieldName as any[])
    : fieldName; // 完成的路径名，e.g: songList[0].albumType

  const formData = getFormData(form, formItemFullName); // 全局formData或者是nested formData

  // is visible
  let visibleResult = true;
  if (typeof visible === 'boolean') {
    visibleResult = visible;
  } else if (typeof visible === 'function') {
    visibleResult = visible(form.getFieldValue(field), formData, dataStore);
  }

  // is disabled
  let disabledResult = false;
  if (typeof disabled === 'boolean') {
    disabledResult = disabled;
  } else if (typeof disabled === 'function') {
    disabledResult = disabled(form.getFieldValue(field), formData, dataStore);
  }

  // if  invisible, do not render
  if (!visibleResult) return null;

  // handle arrayOf
  if (arrayOf && arrayOf.length > 0) {
    const { component, rules } = formItemSchema;
    const { Element, props } = component;

    const ResultElement = Element as React.FC<FormArrayOfWrapper>;
    return (
      <List name={field} initialValue={[]} rules={rules}>
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
    >
      <FormItemInterceptor
        {...props}
        name={formItemFullName}
        disabled={disabledResult}
        form={form}
      />
    </Field>
  );
};

export default FormItemWrapper;
