import { FormSchema } from './schema';
import { Meta }  from 'rc-field-form/es/interface'

export interface FormProps<FormDataType> {
  schema: FormSchema<FormDataType>;
  formData?: FormDataTypem;
  onSubmit: (formData: FormDataType) => void;
}

export interface FormItemProps<ValueType = any> {
  onChange: (nValue: ValueType) => void; // required to implement
  formData: any; // 表单上下文 ，如果是嵌套结果，比如 songList[0].albumType，在albumType这个字段的表单项中，获取的是formData是songList[0]
  validateMeta: Meta; // validate信息集合
  required: boolean;
  value: ValueType; // required to implement
  label: string;
  field: string;
  disabled: boolean; // required to implement
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
