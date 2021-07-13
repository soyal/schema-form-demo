# Schema Form

## Quick Start

```
import React from 'react'
import SchemaForm, { FormSchema, useSchemaForm } from '@music/musician-schema-form'

const schema: FormSchema = {
  formId: 'phoneos',
  formLabel: '手机系统记录',
  formItems: [
    {
      label: '操作系统',
      field: 'phoneos',
      dependencies: ['versionDesc'],
      initialValue: 'other',
      component: {
        Element: FormItemWrapper(CustomRadioGroup),
        props: {
          options: [
            { label: 'ios', value: 'ios' },
            { label: '安卓', value: 'android' },
            { label: '其他', value: 'other' },
          ],
        },
      },
    },
    {
      label: '版本描述',
      dependencies: ['phoneos'],
      field: 'versionDesc',
      component: {
        Element: FormItemWrapper(CustomInput),
      },
    },
  ],
};

const [schemaForm] = useSchemaForm();

return (
  <div>
    <SchemaForm schema={schema} schemaForm={schemaForm}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            schemaForm.validateFields().then((values) => {
              console.log('values', values);
            });
          }}
        >
          提交表单
        </button>
      </div>
    </SchemaForm>
  </div>
);
```

## Props
### Form入参
* schema: FormSchema;  // 详细定义参考src/typing/schema.d.ts
* formData?: FormDataTypem;
* onSubmit: (formData: FormDataType) => void;
* disableValidate?: boolean; // 禁用校验
* disabled?: boolean; // 禁用所有表单项
* children: JSX.Element;
* schemaForm?: SchemaFormInstance; // 见下方SchemaFormInstance
* component?: string | false | React.ComponentClass<any, any> | React.FC<any>; // 可以自定义form的外层的标签，默认渲染<form>，可自定义，方便用户将SchemaForm嵌套在其他表单中

### SchemaFormInstance
* getFieldsValue: () => { [key: string]: any } , 获取所有表单项的值，包括visible:false的表单项
* getVisibleFieldsValue: () => { [key: string]: any },  获取visible:true的表单项的值
* validateFields: () => Promise, 验证visible: true的所有表单项



## 更多demo

### step1
```
yarn
```

### step2
```
yarn storybook
```