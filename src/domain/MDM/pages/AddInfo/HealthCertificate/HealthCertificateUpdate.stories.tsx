import { Meta, Story } from '@storybook/react'
import { HealthCertificateCreateUpdatePage } from '@domain/MDM/pages/AddInfo/HealthCertificate/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <HealthCertificateCreateUpdatePage />
}
export default {
  title: 'pages/MDM/AddInfo/HealthCertificate/Update',
  component: HealthCertificateCreateUpdatePage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.areaUpdate,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
