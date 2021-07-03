export interface FormSchema<FormDataType> {
  formId: string; // 打点字段
  formLabel: string; // 打点字段
  formItems: Array<FormItemSchema<FormDataType>>; // 表单项描述
  dataStore?: DataStore; // 用于在各种行为函数调用时的回传
  className?: string;
  style?: object;
}

type DataStore = any[];

export interface FormItemSchema<FormDataType> {
  field: string; // 字段名
  label: string; // 字段中文解释
  // 调用的组件
  component: {
    // 强制入参参考FormItemProps
    Element: JSX.Element;
    // 除了value onChange之外的传参
    props: { [key: string]: any };
  };
  defaultValue?: any;
  visible?:
    | boolean
    | ((formData: FormDataType, dataStore: DataStore) => boolean);
  disabled?:
    | boolean
    | ((formData: FormDataType, dataStore: DataStore) => boolean);
  // 可直接参考antd3文档
  rules?: Array<{
    validator: (
      rule: { field: string },
      value: any,
      callback: function
    ) => void;
    enum: any[];
    len: number;
    max: number;
    min: number;
    message: string;
    pattern: RegExp;
    required: boolean;
    whitespace: boolean;
  }>;
  // 影响表单值的操作
  updateFormValue?: [
    {
      timing: 'onChange' | 'onBlur' | 'onFocus';
      changeFormValue: (
        setFieldsValue: (fieldsValue: { [field: string]: any }) => void
      ) => void;
    }
  ];
  className?: string;
  style?: object;
}
