import { Meta, Story } from '@storybook/react'
import RoleCreateUpdate from './RoleCreateUpdate'
import { withLinks } from '@storybook/addon-links'

const Template: Story = () => {
  return <RoleCreateUpdate />
}
export default {
  title: 'pages/IAM/Role/RoleCreate',
  component: RoleCreateUpdate,
  decorators: [withLinks],
} as Meta

export const Default = Template.bind({})

Default.args = {}
