import { Meta, Story } from '@storybook/react'
import { MaterialPurchasePriceListPage } from '@domain/MDM/pages/Goods/PurchasePrice/Material'

const Template: Story = () => {
  return <MaterialPurchasePriceListPage />
}
export default {
  title: 'pages/MDM/Goods/MaterialPurchasePrice/List',
  component: MaterialPurchasePriceListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
