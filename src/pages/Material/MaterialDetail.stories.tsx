import { MockUrlParamsPath } from '.storybook/StorybookMockPath/MockUrlParamsPath'
import { Meta, Story } from '@storybook/react'
import MaterialDetail from './MaterialDetail'

const Template: Story = () => {
  return <MaterialDetail />
}
export default {
  title: 'pages/MDM/Material/ProductDetail',
  component: MaterialDetail,
  argTypes: {},
  parameters: {
    paramLink: MockUrlParamsPath.materialDetail,
  },
} as Meta

export const Default = Template.bind({})

Default.args = {}
