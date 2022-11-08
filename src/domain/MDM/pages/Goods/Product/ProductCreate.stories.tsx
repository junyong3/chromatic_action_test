import { Meta, Story } from '@storybook/react'
import { ProductCreatePage } from '@domain/MDM/pages/Goods/Product'

const Template: Story = () => {
  return <ProductCreatePage />
}
export default {
  title: 'pages/MDM/Goods/Product/Create',
  component: ProductCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
