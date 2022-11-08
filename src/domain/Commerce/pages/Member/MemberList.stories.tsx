import { Meta, Story } from '@storybook/react'
import { MemberListPage } from '.'

const Template: Story = () => {
  return <MemberListPage />
}
export default {
  title: 'pages/Commerce/Member/List',
  component: MemberListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
