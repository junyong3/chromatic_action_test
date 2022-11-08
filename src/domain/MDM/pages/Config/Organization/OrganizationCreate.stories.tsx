import { Meta, Story } from '@storybook/react'
import { OrganizationCreateUpdatePage } from '@domain/MDM/pages/Config/Organization/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'

const Template: Story = () => {
  return <OrganizationCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Org/Create',
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
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Create = Template.bind({})

Create.args = {}
