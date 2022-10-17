import { Meta, Story } from '@storybook/react'
import PermissionDetail from '@pages/Permission/PermissionDetail'
import { MockUrlParamsPath } from '../../../.storybook/StorybookMockPath/MockUrlParamsPath'

const Template: Story = () => {
  return <PermissionDetail />
}
export default {
  title: 'pages/IAM/Permission/PermissionDetail',
  component: PermissionDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.permissionDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
