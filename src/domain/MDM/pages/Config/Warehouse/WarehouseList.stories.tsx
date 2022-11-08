import { Meta, Story } from '@storybook/react'
import { WarehouseListPage } from './'

const Template: Story = () => {
  return <WarehouseListPage />
}
export default {
  title: 'pages/MDM/config/Warehouse',
  component: WarehouseListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
