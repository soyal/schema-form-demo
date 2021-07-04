import { FormSchema } from './schema';

export interface FormProps<FormDataType> {
  schema: FormSchema<FormDataType>;
  formData?: FormDataTypem;
  onSubmit: (formData: FormDataType) => void;
  // onChange: (formData: FormDataType) => void;
}

export interface FormItemProps<ValueType> {
  onChange: (nValue: ValueType) => void; // required
  value?: ValueType; // required
  label?: string;
  field?: string;
  disabled?: boolean; // required
  onBlur?: (value: ValueType) => void;
  onFocus?: (value: ValueType) => void;
}
