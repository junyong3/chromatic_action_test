import { Meta, Story } from '@storybook/react'
import { ProductListPage } from '@domain/MDM/pages/Goods/Product'

const Template: Story = () => {
  return <ProductListPage />
}
export default {
  title: 'pages/MDM/Goods/Product/List',
  component: ProductListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
