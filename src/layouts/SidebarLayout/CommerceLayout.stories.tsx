import { Meta, Story } from '@storybook/react'
import { withLinks } from '@storybook/addon-links'
import CommerceLayout from './CommerceLayout'

const Template: Story = () => {
  return <CommerceLayout />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'pages/Commerce/Home',
  component: CommerceLayout,
  decorators: [withLinks],
} as Meta
