import { FormSchema } from './schema'

export interface FormProps<FormDataType> {
  schema: FormSchema<FormDataType>,
  formData?: FormDataTypem
  onSubmit: (formData: FormDataType) => void
}

export interface FormItemProps<ValueType> {
  value?: ValueType,
  onChange: (nValue: ValueType) => void
}
