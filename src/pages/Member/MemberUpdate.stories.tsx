import { Meta, Story } from '@storybook/react'
import MemberUpdate from './MemberUpdate'
import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'

const Template: Story = () => {
  return <MemberUpdate />
}
export default {
  title: 'pages/Commerce/Member/MemberUpdate',
  component: MemberUpdate,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.memberUpdate,
  },
} as Meta

export const Default = Template.bind({})
Default.args = {}
