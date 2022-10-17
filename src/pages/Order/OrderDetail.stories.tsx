import { Meta, Story } from '@storybook/react'
import OrderDetail from '@pages/Order/OrderDetail'
import { useParams } from 'react-router-dom'
import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'

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
    paramLink: MockUrlParamsPath.orderDetail,
  },
} as Meta

export const Default = Template.bind({})
// Default.parameters = {
//   paramLink: {
//     path: '/restaurant/:id',
//     route: '/restaurant/12',
//   },
// }

Default.args = {}
