import { Meta, Story } from '@storybook/react'
import { ProductPurchasePriceListPage } from '@domain/MDM/pages/Goods/PurchasePrice/Product'

const Template: Story = () => {
  return <ProductPurchasePriceListPage />
}
export default {
  title: 'pages/MDM/Goods/ProductPurchasePrice/List',
  component: ProductPurchasePriceListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
