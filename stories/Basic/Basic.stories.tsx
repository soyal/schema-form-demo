import React from 'react';
import { Meta } from '@storybook/react';
import SchemaForm, { FormSchema } from '../../src';
import Button from 'antd/es/button';
import CustomInput from '../components/CustomInput';
import CustomRadioGroup from '../components/CustomRadioGroup';
import FormItemWrapper from '../components/FormItemWrapper';
import 'antd/dist/antd.css';

// test

const meta: Meta = {
  title: '基础用法',
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
        field: 'versionDesc',
        component: {
          Element: FormItemWrapper(CustomInput),
        },
      },
    ],
  };

  return (
    <SchemaForm
      schema={schema}
      onSubmit={(values) => {
        console.log('form submit values', values);
      }}
    >
      <div>
        <Button htmlType="submit">提交表单</Button>
      </div>
    </SchemaForm>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
