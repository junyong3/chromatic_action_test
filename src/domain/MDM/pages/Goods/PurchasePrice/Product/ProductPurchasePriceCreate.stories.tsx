import { Meta, Story } from '@storybook/react'
import { ProductPurchasePriceCreatePage } from '@domain/MDM/pages/Goods/PurchasePrice/Product'

const Template: Story = () => {
  return <ProductPurchasePriceCreatePage />
}
export default {
  title: 'pages/MDM/Goods/ProductPurchasePrice/Create',
  component: ProductPurchasePriceCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
