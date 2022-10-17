import { Meta, Story } from '@storybook/react'
import CouponCreate from './CouponCreate'

const Template: Story = () => {
  return <CouponCreate />
}
export default {
  title: 'pages/Commerce/Coupon/CouponCreate',
  component: CouponCreate,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
