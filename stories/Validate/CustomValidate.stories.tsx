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
  title: '校验/自定义校验',
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
        label: '版本描述(异步校验-不超过10个字符)',
        field: 'versionDesc',
        rules: [
          {
            validator: (rule, value, callback) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value.length <= 10) {
                    resolve(true);
                  } else {
                    reject('版本信息不能超过10个字符');
                  }
                }, 2000);
              });
            },
          },
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
export const CustomValidate = Template.bind({});
export default meta;
