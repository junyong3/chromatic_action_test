import { Meta, Story } from '@storybook/react'
import { WarehouseCreateUpdatePage } from '@domain/MDM/pages/Config/Warehouse/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <WarehouseCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Warehouse/Update',
  component: WarehouseCreateUpdatePage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.warehouseUpdate,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
