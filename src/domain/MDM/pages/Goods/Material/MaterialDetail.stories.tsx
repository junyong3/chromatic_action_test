import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { Meta, Story } from '@storybook/react'
import { MaterialDetailPage } from '@domain/MDM/pages/Goods/Material'

const Template: Story = () => {
  return <MaterialDetailPage />
}
export default {
  title: 'pages/MDM/Goods/Material/Detail',
  component: MaterialDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.materialDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
