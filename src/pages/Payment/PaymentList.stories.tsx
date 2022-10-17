import { Meta, Story } from '@storybook/react'
import PaymentList from '@pages/Payment/PaymentList'

const Template: Story = () => {
  return <PaymentList />
}
export default {
  title: 'pages/Commerce/Payment/PaymentList',
  component: PaymentList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
