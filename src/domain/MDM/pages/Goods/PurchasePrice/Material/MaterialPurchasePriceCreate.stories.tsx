import { Meta, Story } from '@storybook/react'
import { MaterialPurchasePriceCreatePage } from '@domain/MDM/pages/Goods/PurchasePrice/Material'

const Template: Story = () => {
  return <MaterialPurchasePriceCreatePage />
}
export default {
  title: 'pages/MDM/Goods/MaterialPurchasePrice/Create',
  component: MaterialPurchasePriceCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
