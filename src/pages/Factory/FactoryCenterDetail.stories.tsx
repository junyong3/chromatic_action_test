import { Meta, Story } from '@storybook/react'
import { MockUrlParamsPath } from '../../../.storybook/StorybookMockPath/MockUrlParamsPath'
import FactoryCenterDetail from '@pages/Factory/FactoryCenterDetail'

const Template: Story = () => {
  return <FactoryCenterDetail />
}
export default {
  title: 'pages/MDM/config/Factory/Detail',
  component: FactoryCenterDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.factoryDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
