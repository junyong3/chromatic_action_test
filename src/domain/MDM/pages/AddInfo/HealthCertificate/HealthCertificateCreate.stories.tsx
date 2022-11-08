import { Meta, Story } from '@storybook/react'
import { HealthCertificateCreateUpdatePage } from '@domain/MDM/pages/AddInfo/HealthCertificate/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
const Template: Story = () => {
  return <HealthCertificateCreateUpdatePage />
}
export default {
  title: 'pages/MDM/AddInfo/HealthCertificate/Create',
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
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Create = Template.bind({})

Create.args = {}
