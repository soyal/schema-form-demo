import React from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import { FormArrayOfWrapper } from '@/typings/form';
import FormItemInterceptor from './FormItemInterceptor';
import Form from 'rc-field-form';
import { ListField } from 'rc-field-form/es/List';
import { SchemaFormInstance } from '../useSchemaForm';
import ruleWrapper from './ruleWrapper';

const { List, Field } = Form;
export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
  listField?: ListField;
  listName?: string; // Form.List组件上注册的name
  schemaForm: SchemaFormInstance;
  disableValidate: boolean;
}

const FormItemWrapper = (props: FormWrapperProps<any>) => {
  const {
    formItemSchema,
    formSchema,
    listField,
    schemaForm,
    listName,
    disableValidate,
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
          const listValue = schemaForm.rcForm.getFieldValue(field) || [];
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
                        disableValidate={disableValidate}
                        formSchema={formSchema}
                        listField={fieldItem}
                        schemaForm={schemaForm}
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

  const nRules = rules?.map((rule) => ruleWrapper(rule, schemaForm));

  // 开始处理渲染内容
  return (
    <Field
      {...listField}
      name={fieldName}
      rules={nRules}
      validateTrigger={disableValidate ? [] : ['onChange', 'onBlur']}
      initialValue={initialValue}
      dependencies={dependencies?.map((dep) => parentFullPath.concat(dep))}
    >
      {(control, meta) => {
        return (
          <FormItemInterceptor
            {...props}
            {...control}
            validateMeta={meta}
            name={formItemFullName}
            schemaForm={schemaForm}
          />
        );
      }}
    </Field>
  );
};

export default FormItemWrapper;
