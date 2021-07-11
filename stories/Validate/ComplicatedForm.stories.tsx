import { Meta } from '@storybook/react';
import React from 'react';
import SchemaForm, { FormSchema } from '../../src';
import Button from 'antd/es/button';
import CustomInput from '../components/CustomInput';
import CustomRadioGroup from '../components/CustomRadioGroup';
import FormItemWrapper from '../components/FormItemWrapper';
import 'antd/dist/antd.css';

// test

const meta: Meta = {
  title: '校验/复杂表单场景',
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
    formId: 'personInfoForm',
    formLabel: '个人信息登记',
    formItems: [
      {
        label: '姓名',
        field: 'name',
        initialValue: '',
        component: {
          Element: FormItemWrapper(CustomInput),
          props: {
            placeholder: '请输入姓名',
          },
        },
        rules: [
          {
            required: true,
            message: '必须填写姓名',
          },
        ],
      },
      {
        label: '国家',
        field: 'country',
        initialValue: 'china',
        component: {
          Element: FormItemWrapper(CustomRadioGroup),
          props: {
            options: [
              { label: '中国', value: 'china' },
              { label: '美国', value: 'us' },
              { label: '其他', value: 'other' },
            ],
          },
        },
      },
      {
        label: '手机号码',
        field: 'phoneNum',
        rules: [
          {
            required: true,
            message: '必须填写手机号信息',
          },
          {
            max: 10,
            message: '版本描述不能超过10个字符',
          },
          {
            validator: (rule, value, { getFieldValue }) => {
              return Promise.resolve()
            }
          }
        ],
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType="submit">提交表单</Button>
      </div>
    </SchemaForm>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Basic = Template.bind({});
export default meta;
