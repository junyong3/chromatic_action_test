import { Meta, Story } from '@storybook/react'
import { withLinks } from '@storybook/addon-links'
import MDMLayout from './MDMLayout'

const Template: Story = () => {
  return <MDMLayout />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'pages/MDM/Home',
  component: MDMLayout,
  decorators: [withLinks],
} as Meta
