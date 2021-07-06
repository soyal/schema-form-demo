import React, { useCallback } from 'react';
import { FormItemSchema, FormSchema } from '@/typings/schema';
import FormItemInterceptor from './FormItemInterceptor';
import { WrappedFormMethods } from 'rc-form';

export interface FormWrapperProps<FormDataType> {
  formItemSchema: FormItemSchema<FormDataType>;
  formSchema: FormSchema<FormDataType>;
  form: WrappedFormMethods;
  prefixPath?: string[];
}

const FormItemWrapper = <FormDataType extends { [key: string]: any }>(
  props: FormWrapperProps<FormDataType>
) => {
  const { formItemSchema, formSchema, form, prefixPath = [] } = props;
  const { dataStore } = formSchema;
  const { field, visible, disabled, rules, arrayOf = [] } = formItemSchema;

  // to fix antd3's warning, relate to issue: https://github.com/ant-design/ant-design/issues/11205
  const getFieldValueX = (form: WrappedFormMethods, field: string) => {
    return form.getFieldsValue()[field];
  };

  const onArrayItemAdd = useCallback(
    (itemInitialValue: any) => {
      const originFiledValue = getFieldValueX(form, field) || [];

      // 只有通过这种方式才能注册songList[0] = {} 这种嵌套变量
      form.getFieldDecorator(`${field}[${originFiledValue.length}]`, {
        initialValue: itemInitialValue,
      });

      // 只是为了触发更新
      form.setFieldsValue({});
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

    const fieldValue = form.getFieldsValue()[field] || [];
    // const fieldValue = [{}, {}, {}];
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
