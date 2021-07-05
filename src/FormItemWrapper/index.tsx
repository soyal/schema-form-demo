import React, { useCallback } from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import { FormComponentProps } from 'antd/es/form';
import FormItemInterceptor from './FormItemInterceptor';

export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
  form: FormComponentProps['form'];
  prefixPath?: string[];
}

const FormItemWrapper = <FormDataType extends { [key: string]: any }>(
  props: FormWrapperProps<FormDataType>
) => {
  const { formItemSchema, formSchema, form, prefixPath = [] } = props;
  const { dataStore } = formSchema;
  const { field, visible, disabled, rules, arrayOf = [] } = formItemSchema;

  // to fix antd3's warning, relate to issue: https://github.com/ant-design/ant-design/issues/11205
  const getFieldValueX = (form: FormComponentProps['form'], field: string) => {
    console.log('field path', field);
    return form.getFieldsValue()[field];
  };

  const onArrayItemAdd = useCallback(
    (itemInitialValue: any) => {
      const nFieldValue = (form.getFieldsValue()[field] || []).concat(
        itemInitialValue
      );
      console.log('nFieldValue', nFieldValue);
      form.setFieldsValue({
        [field]: nFieldValue,
      });
    },
    [field, form]
  );

  const onArrayItemDel = useCallback(
    (itemIndex: number) => {
      const nArray = (getFieldValueX(form, field) || []).slice();
      nArray.splice(itemIndex, 1);
      form.setFieldsValue({ [field]: nArray });
    },
    [field, form]
  );

  if (prefixPath.length > 0 && arrayOf.length > 0) {
    throw new Error('暂不支持两层以上的嵌套');
  }

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
    form.getFieldDecorator(field, { initialValue: [] });
    console.log('fieldValue', form.getFieldsValue()[field])
    const fieldValue = form.getFieldsValue()[field] || [];
    return (
      <Element {...props} onAdd={onArrayItemAdd} onDel={onArrayItemDel}>
        {fieldValue.map((fieldValueItem: any, index: number) => {
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

  return getFieldDecorator(prefixPath.concat(field).join('.'), {
    rules,
  })(
    <FormItemInterceptor {...props} disabled={disabledResult} />
  ) as JSX.Element;
};

export default FormItemWrapper;
