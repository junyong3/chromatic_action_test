import { Meta, Story } from '@storybook/react'
import OrganizationList from '@pages/Organization/OrganizationList'

const Template: Story = () => {
  return <OrganizationList />
}
export default {
  title: 'pages/MDM/config/Org',
  component: OrganizationList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
