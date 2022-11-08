import { Meta, Story } from '@storybook/react'
import { ProductSellingPriceDetailPage } from '@domain/MDM/pages/Goods/SellingPrice/Product'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <ProductSellingPriceDetailPage />
}
export default {
  title: 'pages/MDM/Goods/ProductSellingPrice/Detail',
  component: ProductSellingPriceDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.productSellingPriceDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
