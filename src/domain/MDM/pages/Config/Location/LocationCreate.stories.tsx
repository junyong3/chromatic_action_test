import { Meta, Story } from '@storybook/react'
import { LocationCreateUpdatePage } from '@domain/MDM/pages/Config/Location/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
const Template: Story = () => {
  return <LocationCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Location/Create',
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
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Create = Template.bind({})

Create.args = {}
