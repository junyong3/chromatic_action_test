import { Meta, Story } from '@storybook/react'
import { ProductUpdatePage } from '@domain/MDM/pages/Goods/Product'

const Template: Story = () => {
  return <ProductUpdatePage />
}
export default {
  title: 'pages/MDM/Goods/Product/Update',
  component: ProductUpdatePage,
  argTypes: {},
} as Meta

export const Update = Template.bind({})

Update.args = {}
