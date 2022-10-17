import { Meta, Story } from '@storybook/react'
import RoleList from '@pages/Role/RoleList'

const Template: Story = () => {
  return <RoleList />
}
export default {
  title: 'pages/IAM/Role/RoleList',
  component: RoleList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
