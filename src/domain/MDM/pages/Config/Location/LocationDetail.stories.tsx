import { Meta, Story } from '@storybook/react'
import { LocationDetailPage } from '@domain/MDM/pages/Config/Location/index'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'

const Template: Story = () => {
  return <LocationDetailPage />
}
export default {
  title: 'pages/MDM/config/Location/Detail',
  component: LocationDetailPage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.locationDetail,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
