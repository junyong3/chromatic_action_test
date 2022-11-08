import { Meta, Story } from '@storybook/react'
import { ProductSellingPriceListPage } from '@domain/MDM/pages/Goods/SellingPrice/Product'

const Template: Story = () => {
  return <ProductSellingPriceListPage />
}
export default {
  title: 'pages/MDM/Goods/ProductSellingPrice/List',
  component: ProductSellingPriceListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
