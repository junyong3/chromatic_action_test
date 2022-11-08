import { Meta, Story } from '@storybook/react'
import { MaterialPurchasePriceDetailPage } from '@domain/MDM/pages/Goods/PurchasePrice/Material'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <MaterialPurchasePriceDetailPage />
}
export default {
  title: 'pages/MDM/Goods/MaterialPurchasePrice/Detail',
  component: MaterialPurchasePriceDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.materialPurchasePriceDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
