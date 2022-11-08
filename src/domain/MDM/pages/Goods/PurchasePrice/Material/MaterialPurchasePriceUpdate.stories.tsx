import { Meta, Story } from '@storybook/react'
import { MaterialPurchasePriceUpdatePage } from '@domain/MDM/pages/Goods/PurchasePrice/Material'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <MaterialPurchasePriceUpdatePage />
}
export default {
  title: 'pages/MDM/Goods/MaterialPurchasePrice/Update',
  component: MaterialPurchasePriceUpdatePage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.materialPurchasePriceUpdate,
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
