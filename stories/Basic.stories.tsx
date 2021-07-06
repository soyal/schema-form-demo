import React from 'react';
import { Meta, Story } from '@storybook/react';
import SchemaForm, { IProps } from '../src';
import { FormSchema } from '../src/typings/schema';
import Input from 'antd/es/input';
import Radio from 'antd/es/radio';
import Button from 'antd/es/button';
import ArrayOfWrapper from './components/FieldWrapper';

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

const Template: Story<IProps> = () => {
  const schemas: FormSchema = {
    formId: 'f1',
    formLabel: 'myform',
    formItems: [
      {
        field: 'name',
        label: '姓名',
        component: {
          Element: Input,
          props: {
            defaultValue: '',
          },
        },
        updateFormValue: [
          {
            timing: 'onChange',
            updator: (setFieldsValue, currValue, formData) => {
              console.log('updator', formData);
              if (formData['name'] === 'sss') {
                setFieldsValue({
                  os: 'others',
                });
              }
            },
          },
        ],
      },
      {
        field: 'os',
        label: '系统',
        component: {
          Element: Radio.Group,
          props: {
            options: [
              {
                label: '安卓',
                value: 'android',
              },
              {
                label: 'IOS',
                value: 'ios',
              },
              {
                label: '其他',
                value: 'others',
              },
            ],
          },
        },
      },
      {
        label: '嵌套数组表单',
        field: 'songList',
        component: {
          Element: ArrayOfWrapper,
        },
        arrayOf: [
          {
            field: 'a',
            label: 'A',
            component: {
              Element: Input,
              props: {
                placeholder: '请输入A',
              },
            },
          },
          {
            field: 'b',
            label: 'B',
            component: {
              Element: Input,
              props: {
                placeholder: '请输入B',
              },
            },
            updateFormValue: [{
              timing: 'onChange',
              updator: (setFieldsValue, currValue, formData) => {
                debugger
              }
            }]
          },
        ],
      },
    ],
  };

  return (
    <SchemaForm
      onSubmit={(values) => {
        console.log('values', values);
      }}
      schema={schemas}
    >
      <div>
        <Button htmlType="submit">提交</Button>
      </div>
    </SchemaForm>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {} as any;
