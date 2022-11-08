import { Meta, Story } from '@storybook/react'
import { ClientUpdatePage } from '@domain/MDM/pages/Partners/Client'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <ClientUpdatePage />
}
export default {
  title: 'pages/MDM/Partners/Client/Update',
  component: ClientUpdatePage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.clientUpdate,
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
