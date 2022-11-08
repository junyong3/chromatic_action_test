import { Meta, Story } from '@storybook/react'
import { VenderUpdatePage } from '@domain/MDM/pages/Partners/Vender'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <VenderUpdatePage />
}
export default {
  title: 'pages/MDM/Partners/Vender/Update',
  component: VenderUpdatePage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.venderUpdate,
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
