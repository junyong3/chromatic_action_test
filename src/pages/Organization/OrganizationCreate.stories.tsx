import { Meta, Story } from '@storybook/react'
import OrganizationCreateUpdate from '@pages/Organization/OrganizationCreateUpdate'

const Template: Story = () => {
  return <OrganizationCreateUpdate />
}
export default {
  title: 'pages/MDM/config/Org/Create',
  component: OrganizationCreateUpdate,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
