import { Meta, Story } from '@storybook/react'
import { ReviewListPage } from '.'

const Template: Story = () => {
  return <ReviewListPage />
}
export default {
  title: 'pages/Commerce/Review/ReviewList',
  component: ReviewListPage,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
