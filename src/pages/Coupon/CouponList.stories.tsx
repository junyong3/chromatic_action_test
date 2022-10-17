import { Meta, Story } from '@storybook/react'
import CouponList from '@pages/Coupon/CouponList'

const Template: Story = () => {
  return <CouponList />
}
export default {
  title: 'pages/Commerce/Coupon/CouponList',
  component: CouponList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
