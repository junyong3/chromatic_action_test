import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { Meta, Story } from '@storybook/react'
import { ProductDetailPage } from '@domain/MDM/pages/Goods/Product'

const Template: Story = () => {
  return <ProductDetailPage />
}
export default {
  title: 'pages/MDM/Goods/Product/Detail',
  component: ProductDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.productDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
