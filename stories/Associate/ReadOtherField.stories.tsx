import React from 'react';
import { Meta } from '@storybook/react';
import SchemaForm, { FormSchema, useSchemaForm } from '../../src';
import Button from 'antd/es/button';
import IndustryDesc from './components/IndustryDes';
import CustomRadioGroup from '../components/CustomRadioGroup';
import FormItemWrapper from '../components/FormItemWrapper';
import 'antd/dist/antd.css';

// test
const meta: Meta = {
  title: '联动/读取其他表单项的值',
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
    formId: 'industryInfoForm',
    formLabel: '行业信息表单',
    formItems: [
      {
        label: '行业',
        field: 'industry',
        initialValue: 'other',
        component: {
          Element: FormItemWrapper(CustomRadioGroup),
          props: {
            options: [
              { label: '电子元器件', value: 'ic' },
              { label: '机械', value: 'machine' },
              { label: '汽配', value: 'car' },
              { label: '其他行业', value: 'other' },
            ],
          },
        },
      },
      {
        dependencies: ['industry'],
        label: '行业描述',
        field: 'desc',
        initialValue: '',
        component: {
          Element: FormItemWrapper(IndustryDesc),
          props: {
            placeholder: '行业描述',
          },
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
export const Default = Template.bind({});
