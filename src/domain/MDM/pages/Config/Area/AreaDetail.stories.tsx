import { Meta, Story } from '@storybook/react'
import { AreaDetailPage } from '@domain/MDM/pages/Config/Area/index'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'

const Template: Story = () => {
  return <AreaDetailPage />
}
export default {
  title: 'pages/MDM/config/Area/Detail',
  component: AreaDetailPage,
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
