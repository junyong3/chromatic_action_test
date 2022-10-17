import { Meta, Story } from '@storybook/react'
import PermissionCreateUpdate from './PermissionCreateUpdate'
import { withLinks } from '@storybook/addon-links'

const Template: Story = () => {
  return <PermissionCreateUpdate />
}
export default {
  title: 'pages/IAM/Permission/PermissionCreate',
  component: PermissionCreateUpdate,
  decorators: [withLinks],
} as Meta

export const Default = Template.bind({})

Default.args = {}
