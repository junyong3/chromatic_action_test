import { Meta, Story } from '@storybook/react'
import { ProductSellingPriceCreatePage } from '@domain/MDM/pages/Goods/SellingPrice/Product'

const Template: Story = () => {
  return <ProductSellingPriceCreatePage />
}
export default {
  title: 'pages/MDM/Goods/ProductSellingPrice/Create',
  component: ProductSellingPriceCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
