import { Meta, Story } from '@storybook/react'
import { HealthCertificateDetailPage } from '@domain/MDM/pages/AddInfo/HealthCertificate/index'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'

const Template: Story = () => {
  return <HealthCertificateDetailPage />
}
export default {
  title: 'pages/MDM/AddInfo/HealthCertificate/Detail',
  component: HealthCertificateDetailPage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.locationDetail,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
