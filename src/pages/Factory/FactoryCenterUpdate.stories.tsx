import { Meta, Story } from '@storybook/react'
import { MockUrlParamsPath } from '../../../.storybook/StorybookMockPath/MockUrlParamsPath'
import FactoryCenterCreateUpdate from '@pages/Factory/FactoryCneterCreateUpdate'

const Template: Story = () => {
  return <FactoryCenterCreateUpdate />
}
export default {
  title: 'pages/MDM/config/Factory/Update',
  component: FactoryCenterCreateUpdate,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.factoryUpdate,
  },
} as Meta

export const Update = Template.bind({})

Update.args = {}
