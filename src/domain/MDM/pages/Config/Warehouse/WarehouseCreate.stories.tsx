import { Meta, Story } from '@storybook/react'
import { WarehouseCreateUpdatePage } from './index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
const Template: Story = () => {
  return <WarehouseCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Warehouse/Create',
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
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Create = Template.bind({})

Create.args = {}
