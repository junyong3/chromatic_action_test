import { Meta, Story } from '@storybook/react'
import ProductList from '@pages/Product/ProductList'

const Template: Story = () => {
  return <ProductList />
}
export default {
  title: 'pages/MDM/Product/ProductList',
  component: ProductList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
