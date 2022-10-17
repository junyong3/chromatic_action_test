import { Meta, Story } from '@storybook/react'
import PermissionList from '@pages/Permission/PermissionList'

const Template: Story = () => {
  return <PermissionList />
}
export default {
  title: 'pages/IAM/Permission/PermissionList',
  component: PermissionList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
