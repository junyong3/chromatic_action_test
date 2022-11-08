import { Meta, Story } from '@storybook/react'
import { MaterialUpdatePage } from '@domain/MDM/pages/Goods/Material'

const Template: Story = () => {
  return <MaterialUpdatePage />
}
export default {
  title: 'pages/MDM/Goods/Material/Update',
  component: MaterialUpdatePage,
  argTypes: {},
} as Meta

export const Update = Template.bind({})

Update.args = {}
