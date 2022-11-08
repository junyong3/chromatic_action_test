import { Meta, Story } from '@storybook/react'
import { CouponListPage } from '@domain/Commerce/pages/Coupon'

const Template: Story = () => {
  return <CouponListPage />
}
export default {
  title: 'pages/Commerce/Coupon/List',
  component: CouponListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
