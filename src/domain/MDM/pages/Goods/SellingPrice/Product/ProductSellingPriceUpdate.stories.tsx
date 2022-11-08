import { Meta, Story } from '@storybook/react'
import { ProductSellingPriceUpdatePage } from '@domain/MDM/pages/Goods/SellingPrice/Product'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <ProductSellingPriceUpdatePage />
}
export default {
  title: 'pages/MDM/Goods/ProductSellingPrice/Update',
  component: ProductSellingPriceUpdatePage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.productSellingPriceUpdate,
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
