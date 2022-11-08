import { Meta, Story } from '@storybook/react'
import RoleCreateUpdate from './RoleCreateUpdate'
import { withLinks } from '@storybook/addon-links'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <RoleCreateUpdate />
}
export default {
  title: 'pages/IAM/Role/RoleUpdate',
  component: RoleCreateUpdate,
  argTypes: {},
  decorators: [withLinks],
  parameters: {
    paramLink: StorybookParamLink.roleUpdate,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
