import { Meta, Story } from '@storybook/react'
import { FactoryListPage } from '@domain/MDM/pages/Config/Factory/index'

const Template: Story = () => {
  return <FactoryListPage />
}
export default {
  title: 'pages/MDM/config/Factory',
  component: FactoryListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
