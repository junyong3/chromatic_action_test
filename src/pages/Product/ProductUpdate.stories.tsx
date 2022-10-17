import { Meta, Story } from '@storybook/react'
import ProductUpdate from './ProductUpdate'

const Template: Story = () => {
  return <ProductUpdate />
}
export default {
  title: 'pages/MDM/Product/ProductUpdate',
  component: ProductUpdate,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
