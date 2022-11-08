import { Meta, Story } from '@storybook/react'
import { ClientDetailPage } from '@domain/MDM/pages/Partners/Client'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <ClientDetailPage />
}
export default {
  title: 'pages/MDM/Partners/Client/Detail',
  component: ClientDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.clientDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
