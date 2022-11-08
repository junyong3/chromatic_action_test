import { Meta, Story } from '@storybook/react'
import { VenderListPage } from '@domain/MDM/pages/Partners/Vender'

const Template: Story = () => {
  return <VenderListPage />
}
export default {
  title: 'pages/MDM/Partners/Vender/List',
  component: VenderListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
