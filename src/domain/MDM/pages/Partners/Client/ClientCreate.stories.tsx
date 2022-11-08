import { Meta, Story } from '@storybook/react'
import { ClientCreatePage } from '@domain/MDM/pages/Partners/Client'

const Template: Story = () => {
  return <ClientCreatePage />
}
export default {
  title: 'pages/MDM/Partners/Client/Create',
  component: ClientCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
