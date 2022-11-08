import { Meta, Story } from '@storybook/react'
import NoticeCreateUpdate from '@domain/Commerce/pages/Notice/NoticeCreateUpdate'
import { NoticeCreateRunTest } from '@domain/Commerce/pages/Notice/Notice.interaction'
const Template: Story = () => {
  return <NoticeCreateUpdate />
}
export default {
  title: 'pages/Commerce/Notice/NoticeCreateUpdate',
  component: NoticeCreateUpdate,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
NoticeCreateRunTest(Default)
