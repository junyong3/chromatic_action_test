import { Meta, Story } from '@storybook/react'
import NoticeList from '@domain/Commerce/pages/Notice/NoticeList'

const Template: Story = () => {
  return <NoticeList />
}
export default {
  title: 'pages/Commerce/Notice/NoticeList',
  component: NoticeList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
