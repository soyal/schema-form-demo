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
  title: '联动/修改其他表单项的值',
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
        initialValue: 'ic',
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
        updateFormValue: [
          {
            timing: 'onChange',
            updator: ({ setFieldsValue }, currValue) => {
              if (currValue === 'other') {
                setFieldsValue({
                  desc: '其他行业的默认描述',
                });
              }
            },
          },
        ],
      },
      {
        label: '通用描述',
        field: 'desc',
        dependencies: ['industry'],
        disabled: (value, formData) => {
          return formData['industry'] === 'other';
        },
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
