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
  title: '联动/基础状态联动',
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
        visible: (value, formData) => {
          return formData['industry'] === 'ic';
        },
        label: 'ic oem',
        field: 'oem',
        initialValue: '',
        component: {
          Element: FormItemWrapper(CustomInput),
          props: {
            placeholder: 'oem号码',
          },
        },
      },
      {
        dependencies: ['industry'],
        visible: (value, formData) => {
          return formData['industry'] === 'car';
        },
        label: '汽配model号码',
        field: 'modelNo',
        initialValue: '',
        component: {
          Element: FormItemWrapper(CustomInput),
          props: {
            placeholder: 'model number',
          },
        },
      },
      {
        dependencies: ['industry'],
        disabled: (value, formData) => {
          return formData['industry'] === 'other';
        },
        label: '通用描述',
        field: 'desc',
        initialValue: '',
        component: {
          Element: FormItemWrapper(CustomInput),
          props: {
            placeholder: '通用描述',
          },
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType="submit">提交表单</Button>
      </div>
    </SchemaForm>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
