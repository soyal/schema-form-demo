import { useRef } from 'react';
import { useForm } from 'rc-field-form';
import { FormInstance } from 'rc-field-form';

class SchemaFormInstance {
  rcForm: FormInstance;

  constructor(rcForm: FormInstance) {
    this.rcForm = rcForm;
  }

  getFieldsValue() {}
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
