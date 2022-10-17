import { Meta, Story } from '@storybook/react'
import PermissionCreateUpdate from './PermissionCreateUpdate'
import { MockUrlParamsPath } from '../../../.storybook/StorybookMockPath/MockUrlParamsPath'
import { withLinks } from '@storybook/addon-links'

const Template: Story = () => {
  return <PermissionCreateUpdate />
}
export default {
  title: 'pages/IAM/Permission/PermissionUpdate',
  component: PermissionCreateUpdate,
  argTypes: {},
  decorators: [withLinks],
  parameters: {
    paramLink: MockUrlParamsPath.permissionUpdate,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
