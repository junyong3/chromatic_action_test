import { Meta, Story } from '@storybook/react'
import PermissionDetail from '@domain/IAM/pages/Permission/PermissionDetail'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <PermissionDetail />
}
export default {
  title: 'pages/IAM/Permission/PermissionDetail',
  component: PermissionDetail,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.permissionDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
