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
        dependencies: ['country'],
        visible: (value, formData) => {
          return formData['country'] !== 'other';
        },
        label: '手机号码(美国1-开头，中国86-开头，其他国家不填)',
        field: 'phoneNum',
        rules: [
          {
            required: true,
            message: '必须填写手机号信息',
          },
          {
            validator: (rule, value, { getFieldValue }) => {
              const countryValue = getFieldValue('country');
              let patternNum: string;
              if (countryValue === 'china') {
                patternNum = '86-';
              } else {
                patternNum = '1-';
              }

              const regExp = new RegExp(`^${patternNum}`);
              if (regExp.test(value)) {
                return;
              } else {
                return Promise.reject('跟国家所对应的格式错误');
              }
            },
            validateTrigger: ['onBlur'],
          },
        ],
        component: {
          Element: FormItemWrapper(CustomInput),
        },
      },
      {
        label: '输入密码',
        field: 'password',
        rules: [
          {
            required: true,
            message: '必须填写密码',
          },
        ],
        component: {
          Element: FormItemWrapper(CustomInput),
          props: {
            placeholder: '输入密码',
            type: 'password',
          },
        },
      },
      {
        label: '确认密码密码',
        field: 'passwordConfirm',
        rules: [
          {
            required: true,
            message: '必须确认密码',
          },
          {
            validator: (_, value, { getFieldValue }) => {
              if (value === getFieldValue('password')) {
                return Promise.resolve();
              } else {
                return Promise.reject('两次输入的密码不一致');
              }
            },
          },
        ],
        component: {
          Element: FormItemWrapper(CustomInput),
          props: {
            placeholder: '确认密码',
            type: 'password',
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
            schemaForm.validateFields().then(
              (values) => {
                console.log('values', values);
              },
              (errors) => {
                console.log('校验失败', errors);
              }
            );
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
export default meta;
