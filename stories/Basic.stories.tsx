import React from 'react';
import { Meta, Story } from '@storybook/react';
import SchemaForm, { IProps } from '../src';

const foo = typeof SchemaForm

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

const Template: Story = () => {
  return (
    <SchemaForm onSubmit={() => {
      
    }}></SchemaForm>
  )
}

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {

} as any;
