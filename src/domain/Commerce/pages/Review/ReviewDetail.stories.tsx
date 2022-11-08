import { Meta, Story } from '@storybook/react'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { ContentWrap } from '@layouts/EmptyLayout/EmptyLayout'
import ReviewDetailPage from '@domain/Commerce/pages/Review/ReviewDetailPage'

const Template: Story = () => {
  return <ReviewDetailPage />
}
export default {
  title: 'pages/Commerce/Review/ReviewDetail',
  component: ReviewDetailPage,
  argTypes: {},
  decorators: [
    (Story) => (
      <ContentWrap>
        <Story />
      </ContentWrap>
    ),
  ],
  parameters: {
    paramLink: StorybookParamLink.reviewDetail,
    viewport: {
      defaultViewport: 'detailView',
    },
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
