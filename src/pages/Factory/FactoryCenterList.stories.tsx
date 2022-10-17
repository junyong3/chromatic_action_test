import { Meta, Story } from '@storybook/react'
import FactoryCenterList from '@pages/Factory/FactoryCenterList'

const Template: Story = () => {
  return <FactoryCenterList />
}
export default {
  title: 'pages/MDM/config/Factory',
  component: FactoryCenterList,
  argTypes: {},
} as Meta

export const Default = Template.bind({})

Default.args = {}
