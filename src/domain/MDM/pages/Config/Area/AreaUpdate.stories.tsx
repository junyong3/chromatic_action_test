import { Meta, Story } from '@storybook/react'
import { AreaCreateUpdatePage } from '@domain/MDM/pages/Config/Area/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <AreaCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Area/Update',
  component: AreaCreateUpdatePage,
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
