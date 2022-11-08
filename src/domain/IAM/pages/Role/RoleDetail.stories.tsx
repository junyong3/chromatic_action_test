import { Meta, Story } from '@storybook/react'
import RoleDetail from './RoleDetail'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <RoleDetail />
}
export default {
  title: 'pages/IAM/Role/RoleDetail',
  component: RoleDetail,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.roleDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
