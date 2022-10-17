import { Meta, Story } from '@storybook/react'
import MaterialCreate from './MaterialCreate'

const Template: Story = () => {
  return <MaterialCreate />
}
export default {
  title: 'pages/MDM/Material/ProductCreate',
  component: MaterialCreate,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
