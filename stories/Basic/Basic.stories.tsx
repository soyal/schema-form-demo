import React from 'react';
import { Meta } from '@storybook/react';
import SchemaForm, { FormSchema, useSchemaForm } from '../../src';
import Button from 'antd/es/button';
import CustomInput from '../components/CustomInput';
import CustomRadioGroup from '../components/CustomRadioGroup';
import FormItemWrapper from '../components/FormItemWrapper';
import 'antd/dist/antd.css';

// test

const meta: Meta = {
  title: '基础用法/简单例子',
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

const Template = () => {
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
      <h2>循环依赖报警</h2>
      <SchemaForm schema={schema} schemaForm={schemaForm}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            htmlType="submit"
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
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
