import { useRef } from 'react';
import { useForm } from 'rc-field-form';
import { FormInstance } from 'rc-field-form';
import { TFieldStatus } from './typings/form';
import { filterInvisibleFields, getFields } from './util';

export class SchemaFormInstance {
  rcForm: FormInstance;
  fieldsStatus: TFieldStatus;

  constructor(rcForm: FormInstance) {
    this.rcForm = rcForm;
    this.fieldsStatus = {};
  }

  getFieldsValue() {
    return this.rcForm.getFieldsValue();
  }

  getVisibleFieldsValue() {
    const originValues = this.rcForm.getFieldsValue();
    const filteredValues = filterInvisibleFields(
      originValues,
      this.fieldsStatus
    );

    return filteredValues;
  }

  /**
   * 提取visible的所有字段
   */
  private getVisibleFields(): Array<string[]> {
    const rcFieldsValue = this.rcForm.getFieldsValue();
    const originFields = getFields(rcFieldsValue);

    const visibledFields = originFields.filter((originField) => {
      const key = originField.join('.');
      return this.fieldsStatus[key].visible;
    });

    return visibledFields;
  }

  validateFields() {
    const visibleFields = this.getVisibleFields();

    return this.rcForm.validateFields(visibleFields);
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
