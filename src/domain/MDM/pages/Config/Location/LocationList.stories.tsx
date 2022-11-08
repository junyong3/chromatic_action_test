import { Meta, Story } from '@storybook/react'
import { LocationListPage } from '@domain/MDM/pages/Config/Location/index'

const Template: Story = () => {
  return <LocationListPage />
}
export default {
  title: 'pages/MDM/config/Location',
  component: LocationListPage,
  argTypes: {},
} as Meta

export const List = Template.bind({})

List.args = {}
