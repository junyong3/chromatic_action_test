import { Meta, Story } from '@storybook/react'
import React from 'react'
import Home from '@pages/Home/Home'

const Template: Story = () => {
  return <Home />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'pages/Home',
  component: Home,
} as Meta
