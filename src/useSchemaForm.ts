import { useRef } from 'react';
import { useForm } from 'rc-field-form';
import { FormInstance } from 'rc-field-form';
import { TFieldStatus } from '@/typings/form';
import { filterInvisibleFields } from './util';

export class SchemaFormInstance {
  rcForm: FormInstance;
  fieldsStatus: TFieldStatus;

  constructor(rcForm: FormInstance) {
    this.rcForm = rcForm;
    this.fieldsStatus = {};
  }

  getFieldsValue() {
    const originValues = this.rcForm.getFieldsValue();
    const filteredValues = filterInvisibleFields(
      originValues,
      this.fieldsStatus
    );

    return filteredValues;
  }

  validateFields() {
    this.rcForm.validateFields();
  }
}

const useSchemaForm = (schemaForm?: SchemaFormInstance) => {
  const schemaFormRef = useRef<SchemaFormInstance>();
  const [form] = useForm();

  if (!schemaFormRef.current) {
    if (schemaForm) {
      schemaFormRef.current = schemaForm;
    } else {
      schemaFormRef.current = new SchemaFormInstance(form);
    }
  }

  return [schemaFormRef.current];
};

export default useSchemaForm;
