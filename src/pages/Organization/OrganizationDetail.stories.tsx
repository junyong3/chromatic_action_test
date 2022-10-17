import { Meta, Story } from '@storybook/react'
import OrganizationDetail from '@pages/Organization/OrganizationDetail'
import { MockUrlParamsPath } from '../../../.storybook/StorybookMockPath/MockUrlParamsPath'

const Template: Story = () => {
  return <OrganizationDetail />
}
export default {
  title: 'pages/MDM/config/Org/Detail',
  component: OrganizationDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.orgDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
