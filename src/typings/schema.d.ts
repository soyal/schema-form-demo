import React from 'react';
import { FormItemProps, FormArrayOfWrapper } from './form';
import { Rule, NamePath, RuleType } from 'rc-field-form/es/interface';

interface BaseRule {
  warningOnly?: boolean;
  enum?: StoreValue[];
  len?: number;
  max?: number;
  message?: string | ReactElement;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  transform?: (value: any) => any;
  type?: RuleType;
  whitespace?: boolean;
  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string | string[];
  validator?: (
    rule: Rule,
    value: any,
    operation: { getFieldValue: (fieldName: string) => any }
  ) => Promise<any>;
}

export interface FormSchema<FormDataType = any> {
  formId: string; // 打点字段
  formLabel: string; // 打点字段
  formItems: Array<FormItemSchema<FormDataType>>; // 表单项描述
  dataStore?: DataStore; // 用于在各种行为函数调用时的回传
  className?: string;
  style?: object;
}

type DataStore = any[];

type StatusFunc = (
  value: any,
  formData: FormDataType,
  dataStore?: DataStore
) => boolean;

export interface FormItemSchema<FormDataType = any> {
  field: string; // 字段名
  label: string; // 字段中文解释
  initialValue?: any; // 表单项初始值
  dependencies?: string[]; // field[] 当前字段依赖的其他字段，默认情况下，其他字段的更新不会引发当前字段所对应组件的更新，当设置dependencies后，依赖的字段更新后，该表单项会触发更新
  // 调用的组件
  component: {
    // 强制入参参考FormItemProps
    Element:
      | React.FC<FormItemProps>
      | React.FC<FormArrayOfWrapper>
      | (new (props: FormItemProps) => JSX.Element | JSX.ElementClass)
      | (new (props: FormArrayOfWrapper) => JSX.Element | JSX.ElementClass);
    // 除了value onChange之外的传参
    props?: { [key: string]: any };
  };
  arrayOf?: Array<FormItemSchema<FormDataType>>;
  visible?: boolean | StatusFunc;
  disabled?: boolean | StatusFunc;
  // 可直接参考antd3文档
  rules?: Array<BaseRule>;
  // 影响表单值的操作
  updateFormValue?: [
    {
      timing: 'onChange'; // 暂时只支持onChange
      updator: (
        operations: {
          setFieldsValue: (fieldsValue: { [field: string]: any }) => void;
          resetFields: (fields: NamePath[]) => void;
        },
        currValue: any,
        formData: FormDataType,
        dataStore?: DataStore
      ) => void;
    }
  ];
}
