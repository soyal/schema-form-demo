import { FormSchema, DataStore } from './schema';
import { Meta } from 'rc-field-form/es/interface';
import { SchemaFormInstance } from '../useSchemaForm';

interface FormProps<FormDataType> {
  schema: FormSchema<FormDataType>;
  formData?: FormDataType;
  disableValidate?: boolean; // 禁用校验
  disabled?: boolean; // 禁用所有表单项
}

export interface FormItemProps<ValueType = any, FormDataType = any> {
  onChange: (nValue: ValueType, dynamicParams?: any) => void; // required to implement
  formData: FormDataType; // 表单上下文 ，如果是嵌套结果，比如 songList[0].albumType，在albumType这个字段的表单项中，获取的是formData是songList[0]
  dataStore?: DataStore;
  validateMeta: Meta; // validate信息集合
  required: boolean;
  value: ValueType; // required to implement
  label: string;
  field: string;
  disabled: boolean; // required to implement
  onBlur?: () => void;
  onFocus?: () => void;
  // onBlur?: (value: ValueType) => void;
  // onFocus?: (value: ValueType) => void;
}

export interface FormArrayOfWrapper {
  value: any[];
  add: (itemInitialValue: any) => void;
  remove: (itemIndex: number) => void;
  children: JSX.Element[];
}

export type TFieldStatus = {
  [key: string]: {
    visible: boolean;
    disabled: boolean;
  };
};

export type SchemaFormProps<FormDataType = any> = FormProps<FormDataType> & {
  children?: JSX.Element;
  schemaForm?: SchemaFormInstance;
  component?: string | false | React.ComponentClass<any, any> | React.FC<any>; // 可以自定义form的外层的标签，默认渲染<form>，可自定义，方便用户将SchemaForm嵌套在其他表单中
};
