import { Meta, Story } from '@storybook/react'
import UserList from '@domain/IAM/pages/User/UserList'

const Template: Story = () => {
  return <UserList />
}
export default {
  title: 'pages/IAM/User/UserList',
  component: UserList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
