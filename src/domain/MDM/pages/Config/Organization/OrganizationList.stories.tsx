import { Meta, Story } from '@storybook/react'
import { OrganizationListPage } from '@domain/MDM/pages/Config/Organization/index'

const Template: Story = () => {
  return <OrganizationListPage />
}
export default {
  title: 'pages/MDM/config/Org',
  component: OrganizationListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
