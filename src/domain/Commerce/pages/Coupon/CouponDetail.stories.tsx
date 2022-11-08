import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { Meta, Story } from '@storybook/react'
import { CouponDetailPage } from '@domain/Commerce/pages/Coupon'

const Template: Story = () => {
  return <CouponDetailPage />
}
export default {
  title: 'pages/Commerce/Coupon/Detail',
  component: CouponDetailPage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.couponDetail,
  },
} as Meta

export const Detail = Template.bind({})

Detail.args = {}
