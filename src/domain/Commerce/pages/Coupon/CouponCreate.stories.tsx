import { Meta, Story } from '@storybook/react'
import { CouponCreatePage } from '@domain/Commerce/pages/Coupon'

const Template: Story = () => {
  return <CouponCreatePage />
}
export default {
  title: 'pages/Commerce/Coupon/Create',
  component: CouponCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
