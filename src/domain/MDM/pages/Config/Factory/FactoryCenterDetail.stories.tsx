import { Meta, Story } from '@storybook/react'
import { FactoryDetailPage } from '@domain/MDM/pages/Config/Factory/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <FactoryDetailPage />
}
export default {
  title: 'pages/MDM/config/Factory/Detail',
  component: FactoryDetailPage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.factoryDetail,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
