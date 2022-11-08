import { Meta, Story } from '@storybook/react'
import { VenderDetailPage } from '@domain/MDM/pages/Partners/Vender'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <VenderDetailPage />
}
export default {
  title: 'pages/MDM/Partners/Vender/Detail',
  component: VenderDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.venderDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
