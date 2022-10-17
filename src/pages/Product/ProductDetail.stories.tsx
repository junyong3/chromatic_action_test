import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'
import { Meta, Story } from '@storybook/react'
import ProductDetail from './ProductDetail'

const Template: Story = () => {
  return <ProductDetail />
}
export default {
  title: 'pages/MDM/Product/ProductDetail',
  component: ProductDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.productDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
