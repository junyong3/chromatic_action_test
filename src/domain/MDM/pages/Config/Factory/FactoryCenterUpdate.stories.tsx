import { Meta, Story } from '@storybook/react'
import { FactoryCreateUpdatePage } from '@domain/MDM/pages/Config/Factory/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <FactoryCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Factory/Update',
  component: FactoryCreateUpdatePage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.factoryUpdate,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
