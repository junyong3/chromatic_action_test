import { Meta, Story } from '@storybook/react'
import { VenderCreatePage } from '@domain/MDM/pages/Partners/Vender'

const Template: Story = () => {
  return <VenderCreatePage />
}
export default {
  title: 'pages/MDM/Partners/Vender/Create',
  component: VenderCreatePage,
  argTypes: {},
} as Meta

export const Create = Template.bind({})

Create.args = {}
