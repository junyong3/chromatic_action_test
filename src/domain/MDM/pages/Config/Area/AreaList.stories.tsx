import { Meta, Story } from '@storybook/react'
import { AreaListPage } from '@domain/MDM/pages/Config/Area/index'

const Template: Story = () => {
  return <AreaListPage />
}
export default {
  title: 'pages/MDM/config/Area',
  component: AreaListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
