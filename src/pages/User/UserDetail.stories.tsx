import { Meta, Story } from '@storybook/react'
import UserDetail from './UserDetail'
import { MockUrlParamsPath } from '../../../.storybook/StorybookMockPath/MockUrlParamsPath'

const Template: Story = () => {
  return <UserDetail />
}
export default {
  title: 'pages/IAM/User/UserDetail',
  component: UserDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.userDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
