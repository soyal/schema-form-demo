import React from 'react';
import { FormProps } from '@/typings/form'
import FormInput from './FormItems/Input'
import FormSelect from './FormItems/Select'
import FormCheckbox from './FormItems/Checkbox'

const SchemaForm = <FormDataType extends {}>({ schema }: FormProps<FormDataType>) => {
  return (
    <div>
      <FormInput onChange={value => {
        console.log('input value', value)
      }} />

      <FormSelect onChange={value => {
        console.log("select value", value)
      }}>

      </FormSelect>

      <FormCheckbox onChange={value => {
        console.log('checkbox value', value)
      }}></FormCheckbox>
    </div>
  );
};

export default SchemaForm
