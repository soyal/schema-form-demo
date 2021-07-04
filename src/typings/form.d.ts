import { FormSchema } from './schema';

export interface FormProps<FormDataType> {
  schema: FormSchema<FormDataType>;
  formData?: FormDataTypem;
  onSubmit: (formData: FormDataType) => void;
  // onChange: (formData: FormDataType) => void;
}

export interface FormItemProps<ValueType> {
  disabled?: boolean;
  onBlur?: (value: ValueType) => void,
  onFocus?: (value: ValueType) => void,
  value?: ValueType;
  onChange: (nValue: ValueType) => void;
}
