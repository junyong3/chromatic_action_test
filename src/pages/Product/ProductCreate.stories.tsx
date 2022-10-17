import { Meta, Story } from '@storybook/react'
import ProductCreate from './ProductCreate'

const Template: Story = () => {
  return <ProductCreate />
}
export default {
  title: 'pages/MDM/Product/ProductCreate',
  component: ProductCreate,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
