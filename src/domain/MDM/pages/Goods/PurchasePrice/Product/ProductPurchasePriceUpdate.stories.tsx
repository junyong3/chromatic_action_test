import { Meta, Story } from '@storybook/react'
import { ProductPurchasePriceUpdatePage } from '@domain/MDM/pages/Goods/PurchasePrice/Product'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <ProductPurchasePriceUpdatePage />
}
export default {
  title: 'pages/MDM/Goods/ProductPurchasePrice/Update',
  component: ProductPurchasePriceUpdatePage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.productPurchasePriceUpdate,
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
