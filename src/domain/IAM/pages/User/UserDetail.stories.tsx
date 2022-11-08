import { Meta, Story } from '@storybook/react'
import UserDetail from './UserDetail'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <UserDetail />
}
export default {
  title: 'pages/IAM/User/UserDetail',
  component: UserDetail,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.userDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
