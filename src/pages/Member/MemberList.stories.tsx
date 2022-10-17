import { Meta, Story } from '@storybook/react'
import MemberList from '@pages/Member/MemberList'

const Template: Story = () => {
  return <MemberList />
}
export default {
  title: 'pages/Commerce/Member/MemberList',
  component: MemberList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
