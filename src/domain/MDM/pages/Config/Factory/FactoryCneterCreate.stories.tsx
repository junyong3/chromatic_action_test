import { Meta, Story } from '@storybook/react'
import { FactoryCreateUpdatePage } from './index'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'

const Template: Story = () => {
  return <FactoryCreateUpdatePage />
}
export default {
  title: 'pages/MDM/config/Factory/Create',
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
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Create = Template.bind({})

Create.args = {}
