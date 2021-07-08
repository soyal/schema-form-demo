import React from 'react';
import { Meta } from '@storybook/react';
import SchemaForm, { IProps } from '../../src';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import { FormSchema } from '../../src/typings/schema';
import PhoneOS from './FormItems/PhoneOS';
import FormItemWrapper from '../components/FormItemWrapper';
import 'antd/dist/antd.css';

// test

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

const Template = (args: IProps) => {
  return <SchemaForm {...args} />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const schema: FormSchema = {
  formId: 'dynamicStatus',
  formLabel: '动态状态校验表单',
  formItems: [
    {
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
        return formData.phoneos !== 'other'
      },
      field: 'osversion',
      label: '版本号输入',
      component: {
        Element: FormItemWrapper(Input),
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
    console.log('values:', values);
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
