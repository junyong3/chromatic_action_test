import { Meta, Story } from '@storybook/react'
import FactoryCenterCreateUpdate from '@pages/Factory/FactoryCneterCreateUpdate'

const Template: Story = () => {
  return <FactoryCenterCreateUpdate />
}
export default {
  title: 'pages/MDM/config/Factory/Create',
  component: FactoryCenterCreateUpdate,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
