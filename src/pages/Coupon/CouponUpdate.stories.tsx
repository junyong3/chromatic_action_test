import { Meta, Story } from '@storybook/react'
import CouponUpdate from './CouponUpdate'

const Template: Story = () => {
  return <CouponUpdate />
}
export default {
  title: 'pages/Commerce/Coupon/CouponUpdate',
  component: CouponUpdate,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
