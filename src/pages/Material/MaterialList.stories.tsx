import { Meta, Story } from '@storybook/react'
import MaterialList from '@pages/Material/MaterialList'

const Template: Story = () => {
  return <MaterialList />
}
export default {
  title: 'pages/MDM/Material/MaterialList',
  component: MaterialList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
