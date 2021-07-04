import { FormSchema } from './schema';

export interface FormProps<FormDataType> {
  schema: FormSchema<FormDataType>;
  formData?: FormDataTypem;
  onSubmit: (formData: FormDataType) => void;
}

export interface FormItemProps<ValueType> {
  onChange: (nValue: ValueType) => void; // required to implement
  value?: ValueType; // required to implement
  label?: string;
  field?: string;
  disabled?: boolean; // required to implement
  onBlur?: (value: ValueType) => void;
  onFocus?: (value: ValueType) => void;
}
