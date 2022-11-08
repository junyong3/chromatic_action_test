import { Meta, Story } from '@storybook/react'
import PermissionCreateUpdate from './PermissionCreateUpdate'
import { withLinks } from '@storybook/addon-links'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <PermissionCreateUpdate />
}
export default {
  title: 'pages/IAM/Permission/PermissionUpdate',
  component: PermissionCreateUpdate,
  argTypes: {},
  decorators: [withLinks],
  parameters: {
    paramLink: StorybookParamLink.permissionUpdate,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
