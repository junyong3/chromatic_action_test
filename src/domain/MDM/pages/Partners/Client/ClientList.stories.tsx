import { Meta, Story } from '@storybook/react'
import { ClientListPage } from '@domain/MDM/pages/Partners/Client'

const Template: Story = () => {
  return <ClientListPage />
}
export default {
  title: 'pages/MDM/Partners/Client/List',
  component: ClientListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
