import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BottomUpdateView from '@components/BottomUpdateView/BottomUpdateView'

export default {
  title: 'components/YGUI/BottomUpdateView',
  component: BottomUpdateView,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BottomUpdateView>

const Template: ComponentStory<typeof BottomUpdateView> = (args) => {
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        padding: '16px',
      }}
    >
      <BottomUpdateView {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  userId: 'jypark3@yookgak.com',
  updateTime: '2022-11-03 13:23:33',
}
