import { Meta, Story } from '@storybook/react'
import OrganizationCreateUpdate from '@pages/Organization/OrganizationCreateUpdate'
import { MockUrlParamsPath } from '../../../.storybook/StorybookMockPath/MockUrlParamsPath'

const Template: Story = () => {
  return <OrganizationCreateUpdate />
}
export default {
  title: 'pages/MDM/config/Org/Update',
  component: OrganizationCreateUpdate,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.orgUpdate,
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
