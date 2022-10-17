import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'
import { Meta, Story } from '@storybook/react'
import CouponDetail from './CouponDetail'

const Template: Story = () => {
  return <CouponDetail />
}
export default {
  title: 'pages/Commerce/Coupon/CouponDetail',
  component: CouponDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.couponDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
