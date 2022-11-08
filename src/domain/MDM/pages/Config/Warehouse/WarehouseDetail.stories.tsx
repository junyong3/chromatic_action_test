import { Meta, Story } from '@storybook/react'
import { WarehouseDetailPage } from '@domain/MDM/pages/Config/Warehouse/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <WarehouseDetailPage />
}
export default {
  title: 'pages/MDM/config/Warehouse/Detail',
  component: WarehouseDetailPage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.warehouseDetail,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
