import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChangePassword from '@src/app/ChangePassword'

const Template: Story = () => {
  return <ChangePassword />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'pages/ChangePassword',
  component: ChangePassword,
} as Meta
