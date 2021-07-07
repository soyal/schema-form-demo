import React from 'react';
import { Meta } from '@storybook/react';
import SchemaForm, { IProps } from '../src';
import Button from 'antd/es/button';
import fieldItemSchemas from './FieldItems';
import 'antd/dist/antd.css';

// test

const meta: Meta = {
  title: 'Basic',
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

Default.args = {
  schema: {
    formLabel: '作品上传表单',
    formId: 'uploadSongForm',
    formItems: fieldItemSchemas,
  },
  formData: {},
  onSubmit: (values) => {
    console.log('values:', values);
  },
  children: (
    <div>
      <Button type="primary" htmlType="submit">提交表单</Button>
    </div>
  ),
} as any;
