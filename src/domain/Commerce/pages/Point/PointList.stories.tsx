import { Meta, Story } from '@storybook/react'
import PointList from '@domain/Commerce/pages/Point/PointList'

const Template: Story = () => {
  return <PointList />
}
export default {
  title: 'pages/Commerce/Point/PointList',
  component: PointList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
