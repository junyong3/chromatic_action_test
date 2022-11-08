import { Meta, Story } from '@storybook/react'
import { MaterialListPage } from '@domain/MDM/pages/Goods/Material'

const Template: Story = () => {
  return <MaterialListPage />
}
export default {
  title: 'pages/MDM/Goods/Material/List',
  component: MaterialListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
