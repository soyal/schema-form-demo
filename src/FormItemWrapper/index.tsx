import React, { useCallback } from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import FormItemInterceptor from './FormItemInterceptor';
import Form, { useForm } from 'rc-field-form';

const { List } = Form
export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
}

const FormItemWrapper = <FormDataType extends { [key: string]: any }>(
  props: FormWrapperProps<FormDataType>
) => {
  const { formItemSchema, formSchema } = props;
  const { dataStore } = formSchema;
  const { field, visible, disabled, rules, arrayOf = [] } = formItemSchema;
  const [form] = useForm();

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

  // handle arrayOf
  if (arrayOf && arrayOf.length > 0) {
    const { component } = formItemSchema;
    const { Element, props } = component;

    const fieldValue = form.getFieldValue(field);
    
    

    return (
      <Element {...props} onAdd={onArrayItemAdd} onDel={onArrayItemDel}>
        {/* tslint-disable */}
        {fieldValue.map((_: any, index: number) => {
          return (
            <div key={index}>
              {arrayOf.map((nestedSchemaItem) => (
                <FormItemWrapper
                  key={nestedSchemaItem.field}
                  form={form}
                  formItemSchema={nestedSchemaItem}
                  formSchema={formSchema}
                  prefixPath={[`${field}[${index}]`]}
                />
              ))}
            </div>
          );
        })}
      </Element>
    );
  }

  // 开始处理渲染内容
  const { getFieldDecorator } = form;
  const resultFieldName = prefixPath.concat(field).join('.');

  return getFieldDecorator(resultFieldName, {
    rules,
  })(
    <FormItemInterceptor
      {...props}
      disabled={disabledResult}
      prefixPath={prefixPath}
    />
  ) as JSX.Element;
};

export default FormItemWrapper;
