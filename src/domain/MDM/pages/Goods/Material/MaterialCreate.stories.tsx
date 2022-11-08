import { Meta, Story } from '@storybook/react'
import { MaterialCreatePage } from '@domain/MDM/pages/Goods/Material'

const Template: Story = () => {
  return <MaterialCreatePage />
}
export default {
  title: 'pages/MDM/Goods/Material/Create',
  component: MaterialCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
