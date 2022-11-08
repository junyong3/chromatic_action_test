import { Meta, Story } from '@storybook/react'
import { OrganizationDetailPage } from '@domain/MDM/pages/Config/Organization/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <OrganizationDetailPage />
}
export default {
  title: 'pages/MDM/config/Org/Detail',
  component: OrganizationDetailPage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.orgDetail,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
