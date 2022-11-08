import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { Meta, Story } from '@storybook/react'
import NoticeDetail from './NoticeDetail'

const Template: Story = () => {
  return <NoticeDetail />
}
export default {
  title: 'pages/Commerce/Notice/NoticeDetail',
  component: NoticeDetail,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.noticeDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
