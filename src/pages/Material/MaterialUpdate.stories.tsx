import { Meta, Story } from '@storybook/react'
import MaterialUpdate from './MaterialUpdate'

const Template: Story = () => {
  return <MaterialUpdate />
}
export default {
  title: 'pages/MDM/Material/ProductUpdate',
  component: MaterialUpdate,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
