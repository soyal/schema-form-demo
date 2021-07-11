import { Meta } from '@storybook/react';
import React from 'react';
import SchemaForm, { FormSchema, useSchemaForm } from '../../src';
import Button from 'antd/es/button';
import CustomInput from '../components/CustomInput';
import CustomRadioGroup from '../components/CustomRadioGroup';
import FormItemWrapper from '../components/FormItemWrapper';
import 'antd/dist/antd.css';

// test

const meta: Meta = {
  title: '校验/基础用例',
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

const Template = () => {
  const schema: FormSchema = {
    formId: 'phoneos',
    formLabel: '手机系统记录',
    formItems: [
      {
        label: '操作系统',
        field: 'phoneos',
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
        label: '版本描述(10字内)',
        field: 'versionDesc',
        rules: [
          {
            required: true,
            message: '必须填写版本信息',
          },
          {
            max: 10,
            message: '版本描述不能超过10个字符',
          },
        ],
        component: {
          Element: FormItemWrapper(CustomInput),
        },
      },
    ],
  };
  const [schemaForm] = useSchemaForm();

  return (
    <SchemaForm schema={schema} schemaForm={schemaForm}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            schemaForm.validateFields().then((values) => {
              console.log('values', values);
            });
          }}
        >
          提交表单
        </Button>
      </div>
    </SchemaForm>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Basic = Template.bind({});
export default meta;
