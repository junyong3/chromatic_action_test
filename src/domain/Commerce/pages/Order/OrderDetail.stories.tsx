import { Meta, Story } from '@storybook/react'
import OrderDetail from '@domain/Commerce/pages/Order/OrderDetail'
import { useParams } from 'react-router-dom'
import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'

const Template: Story = () => {
  const params = useParams()
  console.log(params, '$$$$')
  return <OrderDetail />
}
export default {
  title: 'pages/Commerce/Order/OrderDetail',
  component: OrderDetail,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.orderDetail,
  },
} as Meta

export const Default = Template.bind({})
Default.args = {}
