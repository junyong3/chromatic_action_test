import { Meta, Story } from '@storybook/react'
import { ProductPurchasePriceDetailPage } from '@domain/MDM/pages/Goods/PurchasePrice/Product'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <ProductPurchasePriceDetailPage />
}
export default {
  title: 'pages/MDM/Goods/ProductPurchasePrice/Detail',
  component: ProductPurchasePriceDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.productPurchasePriceDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
