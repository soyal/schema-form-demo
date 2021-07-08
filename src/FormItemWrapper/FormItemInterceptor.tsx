/**
 * 处于antd form getFieldDecorator与Element之间的数据拦截层
 * 用于处理联动逻辑
 */
import React from 'react';
import { FormWrapperProps } from './index';
import { FormItemProps } from '@/typings/form';
import { getFormData } from './util';
import { log } from '../invariant';

interface FormItemInterceptorProps extends FormWrapperProps<any> {
  onChange?: (value: any) => void;
  value?: any;
  disabled?: boolean;
  name: string | (string | number)[];
}

const FormItemInterceptor = ({
  formItemSchema,
  value,
  onChange,
  formSchema,
  name,
  form,
  fieldsStatus,
}: FormItemInterceptorProps) => {
  const {
    component,
    updateFormValue,
    label,
    field,
    visible,
    disabled,
    dependencies = [],
  } = formItemSchema;
  const { Element, props } = component;
  const { setFieldsValue, resetFields } = form;
  const { dataStore } = formSchema;

  const formData = getFormData(form, name); // 全局formData或者是nested formData

  let nameStr: string;
  if (name instanceof Array) {
    nameStr = name.join('.');
  } else {
    nameStr = name;
  }

  if (!fieldsStatus[nameStr]) {
    fieldsStatus[nameStr] = {
      visible: true,
      disabled: false,
    };
  }

  // is visible
  let visibleResult = true;
  if (typeof visible === 'boolean') {
    visibleResult = visible;
  } else if (typeof visible === 'function') {
    visibleResult = visible(form.getFieldValue(field), formData, dataStore);
  }
  fieldsStatus[nameStr]['visible'] = visibleResult;

  // is disabled
  let disabledResult = false;
  if (typeof disabled === 'boolean') {
    disabledResult = disabled;
  } else if (typeof disabled === 'function') {
    disabledResult = disabled(form.getFieldValue(field), formData, dataStore);
  }
  fieldsStatus[nameStr]['disabled'] = disabledResult;

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

  return (
    <ResultElement
      disabled={disabledResult}
      value={value}
      label={label}
      field={field}
      getvalue={(prop: string) => {
        if (!dependencies.includes(prop)) {
          log.error(
            `you haven't declare the field ${prop} as dependencies of ${field}`
          );
          return null;
        }
        return formData[prop];
      }}
      // onChange联动
      onChange={(nValue: any) => {
        onChange && onChange(nValue);

        if (hooks.onChange.length > 0) {
          hooks.onChange.forEach((fn) => {
            const formData = getFormData(form, name);

            fn({ setFieldsValue, resetFields }, nValue, formData, dataStore);
          });
        }
      }}
      {...props}
    ></ResultElement>
  );
};

export default FormItemInterceptor;
