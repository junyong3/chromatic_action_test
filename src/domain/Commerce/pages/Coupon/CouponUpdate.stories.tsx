import { Meta, Story } from '@storybook/react'
import { CouponUpdatePage } from '@domain/Commerce/pages/Coupon'

const Template: Story = () => {
  return <CouponUpdatePage />
}
export default {
  title: 'pages/Commerce/Coupon/Update',
  component: CouponUpdatePage,
  argTypes: {},
} as Meta

export const Update = Template.bind({})

Update.args = {}
