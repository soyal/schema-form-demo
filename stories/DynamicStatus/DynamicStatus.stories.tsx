import React, { useRef } from 'react';
import { Meta } from '@storybook/react';
import SchemaForm, { useSchemaForm, SchemaFormProps } from '../../src';
import Button from 'antd/es/button';
import { FormSchema } from '../../src/typings/schema';
import PhoneOS from './FormItems/PhoneOS';
import PhoneVersion from './FormItems/PhoneVersion';
import FormItemWrapper from '../components/FormItemWrapper';
import 'antd/dist/antd.css';

const meta: Meta = {
  title: '动态状态',
  component: SchemaForm,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template = (args: SchemaFormProps) => {
  const [schemaForm] = useSchemaForm()

  return (
    <div>
      <SchemaForm {...args} schemaForm={schemaForm} />

      <Button
        onClick={() => {
          const values = schemaForm.getFieldsValue();
          console.log('outter get values', values);
        }}
      >
        获取表单值
      </Button>
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const schema: FormSchema = {
  formId: 'dynamicStatus',
  formLabel: '动态状态校验表单',
  formItems: [
    {
      rules: [
        {
          required: true,
          message: '必填项',
        },
      ],
      initialValue: 'ios',
      field: 'phoneos',
      label: '手机操作系统',
      component: {
        Element: FormItemWrapper(PhoneOS),
      },
    },
    {
      dependencies: ['phoneos'],
      visible: (value, formData) => {
        console.log('visible tirgger', formData);
        return formData.phoneos === 'ios';
      },
      field: 'osversion',
      label: '版本号输入',
      component: {
        Element: FormItemWrapper(PhoneVersion),
        props: {
          placeholder: '请输入版本号',
        },
      },
    },
  ],
};

Default.args = {
  schema,
  formData: {},
  onSubmit: (values) => {
    console.log('submit values:', values);
  },
  children: (
    <div
      style={{
        padding: 30,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button type="primary" htmlType="submit">
        提交表单
      </Button>
    </div>
  ),
} as any;
