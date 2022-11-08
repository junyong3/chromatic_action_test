import { Meta, Story } from '@storybook/react'
import { HealthCertificateListPage } from '@domain/MDM/pages/AddInfo/HealthCertificate/index'

const Template: Story = () => {
  return <HealthCertificateListPage />
}
export default {
  title: 'pages/MDM/AddInfo/HealthCertificate',
  component: HealthCertificateListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
