import { Meta, Story } from '@storybook/react'
import { MemberDetailCardAddRunTest } from '@domain/Commerce/pages/Member/Member.interaction'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import MemberDetailPage from './MemberDetailPage'

const Template: Story = () => {
  return <MemberDetailPage />
}
export default {
  title: 'pages/Commerce/Member/Detail',
  component: MemberDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.memberDetail,
  },
} as Meta

export const Detail = Template.bind({})
Detail.args = {}
MemberDetailCardAddRunTest(Detail)
