import { Meta, Story } from '@storybook/react'
import { withLinks } from '@storybook/addon-links'
import IAMLayout from './IAMLayout'

const Template: Story = () => {
  return <IAMLayout />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'pages/IAM/Home',
  component: IAMLayout,
  decorators: [withLinks],
} as Meta
