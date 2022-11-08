import { Meta, Story } from '@storybook/react'
import { LocationCreateUpdatePage } from '@domain/MDM/pages/Config/Location/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <LocationCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Location/Update',
  component: LocationCreateUpdatePage,
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
