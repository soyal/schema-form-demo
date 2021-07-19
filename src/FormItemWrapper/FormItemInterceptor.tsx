/**
 * 处于antd form getFieldDecorator与Element之间的数据拦截层
 * 用于处理联动逻辑
 */
import React from 'react';
import { FormWrapperProps } from './index';
import { FormItemProps } from '../typings/form';
import { getFormData, getValue } from './util';
// import { log } from '../invariant';
import { Meta } from 'rc-field-form/es/interface';

interface FormItemInterceptorProps extends FormWrapperProps<any> {
  onChange?: (value: any) => void;
  value?: any;
  disabled?: boolean;
  name: string | (string | number)[];
  validateMeta: Meta;
  onBlur?: () => void;
  onFocus?: () => void;
}

const FormItemInterceptor = ({
  formItemSchema,
  value,
  onChange,
  formSchema,
  name,
  schemaForm,
  validateMeta,
  ...others
}: FormItemInterceptorProps) => {
  const {
    component,
    updateFormValue,
    label,
    field,
    visible,
    disabled,
    // dependencies = [],
    rules = [],
  } = formItemSchema;
  const { Element, props } = component;
  const { setFieldsValue, resetFields, getFieldsValue } = schemaForm;
  const { dataStore } = formSchema;
  const formData = getFormData(schemaForm.rcForm, name); // 全局formData或者是nested formData

  let nameStr: string;
  if (name instanceof Array) {
    nameStr = name.join('.');
  } else {
    nameStr = name;
  }

  if (!schemaForm.fieldsStatus[nameStr]) {
    schemaForm.fieldsStatus[nameStr] = {
      visible: true,
      disabled: false,
    };
  }

  // is visible
  let visibleResult = true;
  if (typeof visible === 'boolean') {
    visibleResult = visible;
  } else if (typeof visible === 'function') {
    visibleResult = visible(
      schemaForm.rcForm.getFieldValue(field),
      formData,
      dataStore
    );
  }
  schemaForm.fieldsStatus[nameStr]['visible'] = visibleResult;

  // is disabled
  let disabledResult = false;
  if (typeof disabled === 'boolean') {
    disabledResult = disabled;
  } else if (typeof disabled === 'function') {
    disabledResult = disabled(
      schemaForm.rcForm.getFieldValue(field),
      formData,
      dataStore
    );
  }
  schemaForm.fieldsStatus[nameStr]['disabled'] = disabledResult;

  // if  invisible, do not render
  if (!visibleResult) return null;

  // 提取changeFormValue的类型
  type changerType = Exclude<typeof updateFormValue, undefined>[0]['updator'];

  const hooks = {
    onChange: [] as changerType[],
    onBlur: [] as changerType[],
    onFocus: [] as changerType[],
  };

  updateFormValue?.forEach((updateDesc) => {
    const { timing, updator } = updateDesc;
    if (timing === 'onChange') {
      hooks['onChange'].push(updator);
    } else if (timing === 'onBlur') {
      hooks['onBlur'].push(updator);
    } else if (timing === 'onFocus') {
      hooks['onFocus'].push(updator);
    }
  });

  const ResultElement = Element as React.FC<FormItemProps>;

  const required = rules.some((rule) => {
    if (typeof rule === 'object') {
      return rule.required !== undefined;
    }

    return false;
  });

  return (
    <ResultElement
      disabled={disabledResult}
      value={value}
      label={label}
      field={field}
      required={required}
      validateMeta={validateMeta}
      formData={formData}
      dataStore={dataStore}
      // onChange联动
      onChange={(nValue: any, runTimeParams?: any) => {
        onChange && onChange(nValue);

        if (hooks.onChange.length > 0) {
          hooks.onChange.forEach((fn) => {
            const formData = getFormData(schemaForm.rcForm, name);

            fn(
              {
                setFieldsValue,
                resetFields,
                getFieldsValue,
              },
              getValue(nValue),
              formData,
              dataStore,
              runTimeParams
            );
          });
        }
      }}
      {...props}
      {...others}
    ></ResultElement>
  );
};

export default FormItemInterceptor;
