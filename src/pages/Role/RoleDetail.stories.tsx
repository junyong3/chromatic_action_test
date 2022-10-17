import { Meta, Story } from '@storybook/react'
import RoleDetail from './RoleDetail'
import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'

const Template: Story = () => {
  return <RoleDetail />
}
export default {
  title: 'pages/IAM/Role/RoleDetail',
  component: RoleDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.roleDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
