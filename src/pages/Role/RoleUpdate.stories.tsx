import { Meta, Story } from '@storybook/react'
import RoleCreateUpdate from './RoleCreateUpdate'
import { withLinks } from '@storybook/addon-links'
import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'

const Template: Story = () => {
  return <RoleCreateUpdate />
}
export default {
  title: 'pages/IAM/Role/RoleUpdate',
  component: RoleCreateUpdate,
  argTypes: {},
  decorators: [withLinks],
  parameters: {
    paramLink: MockUrlParamsPath.roleUpdate,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
