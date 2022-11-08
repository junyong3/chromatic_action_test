import { Meta, Story } from '@storybook/react'
import { AreaCreateUpdatePage } from '@domain/MDM/pages/Config/Area/index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
const Template: Story = () => {
  return <AreaCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Area/Create',
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
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Create = Template.bind({})

Create.args = {}
