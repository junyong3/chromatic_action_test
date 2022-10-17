import { Meta, Story } from '@storybook/react'
import MemberDetail from '@pages/Member/MemberDetail'
import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'
import { MemberDetailCardAddRunTest } from '@pages/Member/Member.interaction'

const Template: Story = () => {
  return <MemberDetail />
}
export default {
  title: 'pages/Commerce/Member/MemberDetail',
  component: MemberDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.memberDetail,
  },
} as Meta

export const Default = Template.bind({})
Default.args = {}
MemberDetailCardAddRunTest(Default)
