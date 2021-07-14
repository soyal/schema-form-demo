import { useRef } from 'react';
import { useForm, FormInstance } from 'rc-field-form';
import { NamePath } from 'rc-field-form/es/interface';
import { TFieldStatus } from './typings/form';
import { FormSchema } from './typings/schema';
import { filterInvisibleFields, getFields } from './util';

export class SchemaFormInstance {
  rcForm: FormInstance;
  fieldsStatus: TFieldStatus;
  formSchema: FormSchema | null;
  fieldUpdatorMap: { [key: string]: Set<string> }; // 各个field对其他field设置值的情况

  constructor(rcForm: FormInstance) {
    this.rcForm = rcForm;
    this.fieldsStatus = {};
    this.formSchema = null;
    this.fieldUpdatorMap = {};
  }

  getFieldsValue = (nameList?: NamePath[]) => {
    return nameList === undefined
      ? this.rcForm.getFieldsValue()
      : this.rcForm.getFieldsValue(nameList);
  };

  getVisibleFieldsValue = () => {
    const originValues = this.rcForm.getFieldsValue();
    const filteredValues = filterInvisibleFields(
      originValues,
      this.fieldsStatus
    );

    return filteredValues;
  };

  validateFields = () => {
    const visibleFields = this.getVisibleFields();

    return this.rcForm.validateFields(visibleFields);
  };

  setFormSchema(formSchema: FormSchema) {
    this.formSchema = formSchema;
  }

  setFieldsValue = (values: { [key: string]: any }) => {
    this.rcForm.setFieldsValue(values);
  };

  resetFields = (fields?: NamePath[]) => {
    this.rcForm.resetFields(fields);
  };

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
