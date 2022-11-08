import { Meta, Story } from '@storybook/react'
import { OrganizationCreateUpdatePage } from '@domain/MDM/pages/Config/Organization/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  return <OrganizationCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Org/Update',
  component: OrganizationCreateUpdatePage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.orgUpdate,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
